import { Request, Response } from "express";
import { CustomerService } from "../../services/customerService";

export class CustomerController {
  static async getAllCustomers(req: Request, res: Response) {
		console.log("GET ALL CUSTOMERS");
		
    try {
      const customers = await CustomerService.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCustomerById(req: Request, res: Response) {
    try {
      const customer = await CustomerService.getCustomerById(
        parseInt(req.params.id)
      );
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCustomer(req: Request, res: Response) {
    try {
      const newCustomer = await CustomerService.createCustomer(req.body);
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCustomer(req: Request, res: Response) {
    try {
      const [affectedRows, updatedCustomers] =
        await CustomerService.updateCustomer(parseInt(req.params.id), req.body);
      if (affectedRows > 0) {
        res.json(updatedCustomers[0]);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCustomer(req: Request, res: Response) {
    try {
      const deletedRows = await CustomerService.deleteCustomer(
        parseInt(req.params.id)
      );
      if (deletedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
