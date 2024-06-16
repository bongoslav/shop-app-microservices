import { Request, Response } from "express";
import Customer from "../../database/models/Customer";
import argon2 from "argon2";
import { CreateCustomerData } from "../../utils/types";
import Cart from "../../database/models/Cart";
import Wishlist from "../../database/models/Wishlist";
import db from "../../database/db";

const updatableFields = ["email", "password", "phone"];

export async function getAllCustomers(req: Request, res: Response) {
  try {
    const customers = await Customer.findAll();
    return res.json(customers).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getCustomerById(req: Request, res: Response) {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      return res.json(customer).status(200);
    } else {
      return res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createCustomer(
  req: Request<{}, {}, CreateCustomerData>,
  res: Response
) {
  try {
    const isExistingEmail = await emailExists(req.body.email);

    if (isExistingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const transaction = await db.transaction();
    let newCustomer: Customer;
    try {
      const hashedPassword = await argon2.hash(req.body.password);

      newCustomer = await Customer.create(
        {
          email: req.body.email,
          phone: req.body.phone,
          hashedPassword,
        },
        { transaction }
      );

      await Cart.create(
        { customerId: newCustomer.id, unit: 0 },
        { transaction }
      );
      await Wishlist.create({ customerId: newCustomer.id }, { transaction });
      transaction.commit();

      return res.status(201).json(newCustomer);
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Error creating customer: ${error.message}`);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function emailExists(email: string) {
  return await Customer.findOne({ where: { email } });
}

export async function updateCustomer(req: Request, res: Response) {
  try {
    const updates = req.body;
    for (const field of Object.keys(updates)) {
      if (!updatableFields.includes(field)) {
        return res.status(400).json({ error: "Invalid data" });
      }
    }

    if (updates.password) {
      updates.hashedPassword = await argon2.hash(updates.password);
      delete updates.password;
    }

    const [affectedRows, updatedCustomers] = await Customer.update(updates, {
      where: { id: req.params.id },
      returning: true,
    });
    if (affectedRows > 0) {
      return res.json(updatedCustomers[0]).status(200);
    } else {
      return res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    await customer.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
