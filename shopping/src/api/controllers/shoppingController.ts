import { Request, Response } from "express";
import Order from "../../database/models/Order";
import Cart from "../../database/models/Cart";
import Cart_Products from "../../database/models/Cart_Products";
import Product from "../../database/models/Product";

export async function getAllOrders(req: Request, res: Response) {
  try {
    let orders: Order[];
    if (req.query.uid) {
      orders = await Order.findAll({ where: { id: req.query.uid } });
    } else {
      orders = await Order.findAll();
    }
    return res.json(orders).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    // get user id from auth middleware - req.userId
    const customerId = "5c090437-5f28-4615-9a6c-fcc76dceb2c2";

    const cart = await Cart.findOne({ where: { customerId } });
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

    if (cartProduct) {
      // update the quantity if the product is already in the cart
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      cartProduct = await Cart_Products.create({
        cartId: cart.id,
        productId,
        quantity,
      });
    }

    return res.status(200).json(cartProduct);
  } catch (error) {
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
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
