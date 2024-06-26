import { Request, Response } from "express";
import Order from "../../database/models/Order";
import Cart from "../../database/models/Cart";
import Cart_Products from "../../database/models/Cart_Products";
import Product from "../../database/models/Product";
import db from "../../database/db";

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.findAll();

    return res.json(orders).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getSingleOrder(req: Request, res: Response) {
  try {
    const order = await Order.findOne({ where: { id: req.query.id } });
    return res.json(order).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getUserOrder(req: Request, res: Response) {
  try {
    const order = await Order.findOne({ where: { customerId: req.query.id } });
    return res.json(order).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    // get user id from auth middleware - req.userId
    const customerId = "5c090437-5f28-4615-9a6c-fcc76dceb2c2";

    const cart = await Cart.findOne({
      where: { customerId },
      include: [Product],
    });
    if (!cart) {
      throw new Error("Cart not found");
    }

    let totalAmount = 0;
    const products = cart.products;
    for (const product of products) {
      const cartProduct = await Cart_Products.findOne({
        where: {
          cartId: cart.id,
          productId: product.id,
        },
      });
      if (cartProduct) {
        totalAmount += product.price * cartProduct.quantity;
      }
    }

    const order = await Order.create({
      customerId,
      amount: totalAmount,
      status: "received",
    });

    // clear the user's cart
    await Cart_Products.destroy({ where: { cartId: cart.id } });

    // beta
    const payload = {
      event: "CREATE_ORDER",
      data: { userId: "TODO", order },
    };

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getCart(req: Request, res: Response) {
  const customerId = "5c090437-5f28-4615-9a6c-fcc76dceb2c2";

  const cart = await Cart.findOne({
    where: { customerId },
    include: {
      // here we use the Cart_Products join table
      model: Product,
      through: {
        attributes: ["quantity"], // include quantity from join table
      },
    },
  });
  if (!cart) {
    throw new Error("Cart not found");
  }

  return res.status(200).json(cart);
}

export async function addToCart(req: Request, res: Response) {
  const customerId = "5c090437-5f28-4615-9a6c-fcc76dceb2c2";
  const { productId, quantity } = req.body;
  const transaction = await db.transaction();
  try {
    const [cart] = await Cart.findOrCreate({
      where: { customerId },
      defaults: { customerId },
      transaction,
    });

    let cartProduct = await Cart_Products.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
      include: [Product],
      transaction,
    });

    if (cartProduct) {
      // update the quantity if the product is already in the cart
      cartProduct.quantity += quantity;
      await cartProduct.save({ transaction });
    } else {
      cartProduct = await Cart_Products.create(
        {
          cartId: cart.id,
          productId,
          quantity,
        },
        { transaction }
      );
    }

    // beta
    const payload = {
      event: "ADD_TO_CART",
      data: { userId: customerId, product: cartProduct.product },
    };

    transaction.commit();
    return res.status(200).json(cartProduct);
  } catch (error) {
    transaction.rollback();
    return res.status(500).json({ error: error.message });
  }
}

export async function removeFromCart(req: Request, res: Response) {
  const customerId = "5c090437-5f28-4615-9a6c-fcc76dceb2c2";
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ where: { customerId } });
    if (!cart) {
      throw new Error("Cart not found");
    }

    let cartProduct = await Cart_Products.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!cartProduct) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    if (cartProduct.quantity > quantity) {
      cartProduct.quantity -= quantity;
      await cartProduct.save();
    } else {
      await cartProduct.destroy();
    }

    // beta
    const payload = {
      event: "REMOVE_FROM_CART",
      data: { userId: customerId, product: cartProduct.product },
    };

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
