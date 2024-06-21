import { Request, Response } from "express";
import Product from "../../database/models/Product";
import { CreateProductData } from "../../utils/types";
import { publishMessage } from "../../utils/broker";

export async function getProducts(req: Request, res: Response) {
  try {
    let products: Product[];
    if (req.query.uid) {
      products = await Product.findAll({ where: { id: req.query.uid } });
    } else {
      products = await Product.findAll();
    }
    return res.json(products).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getSingleProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.uid);
    return res.json(product).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const productData = req.body as CreateProductData;
    const product = await Product.create(productData);
    return res.json(product).status(201);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getProductsByType(req: Request, res: Response) {
  try {
    const type = req.params.type;
    const product = await Product.findAll({ where: { type } });
    return res.json(product).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function addToWishlist(req: Request, res: Response) {
  try {
    // TODO userId after auth
    const quantity = req.body.quantity;
    const product = await Product.findByPk(req.body.productId);

    if (product) {
      const payload = {
        event: "ADD_TO_WISHLIST",
        data: { userId: "TODO", product, quantity },
      };

      await publishMessage(
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(payload)
      );

      return res.status(200).json({ product: payload.data.product });
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function removeFromWishlist(req: Request, res: Response) {
  try {
    // TODO userId after auth
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (product) {
      const payload = {
        event: "REMOVE_FROM_WISHLIST",
        data: { userId: "TODO", product },
      };
      await publishMessage(
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(payload)
      );
      return res.status(200).json({ product: payload.data.product });
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function addToCart(req: Request, res: Response) {
  try {
    // TODO userId after auth
    const quantity = req.body.quantity;
    const product = await Product.findByPk(req.body.productId);
    if (product) {
      const payload = {
        event: "ADD_TO_CART",
        data: { userId: "TODO", product, quantity },
      };
      await publishMessage(
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(payload)
      );
      await publishMessage(
        process.env.SHOPPING_BINDING_KEY,
        JSON.stringify(payload)
      );
      return res
        .status(200)
        .json({ product: payload.data.product, unit: payload.data.quantity });
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function removeFromCart(req: Request, res: Response) {
  try {
    // TODO userId after auth
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (product) {
      const payload = {
        event: "REMOVE_FROM_CART",
        data: { userId: "TODO", product },
      };
      await publishMessage(
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(payload)
      );
      await publishMessage(
        process.env.SHOPPING_BINDING_KEY,
        JSON.stringify(payload)
      );
      return res.status(200).json({ product: payload.data.product });
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
