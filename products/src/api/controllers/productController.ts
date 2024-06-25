import { Request, Response } from "express";
import Product from "../../database/models/Product";
import { CreateProductData } from "../../utils/types";
import { publishMessage } from "../../utils/broker";
import Category from "../../database/models/Category";
import fs from "fs";
import path from "path";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await Product.findAll();
    return res.json(products).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getSingleProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.id);
    return res.json(product).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    // TODO: validation
    const productData = req.body as CreateProductData;
    const product = await Product.create(productData);
    return res.json(product).status(201);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    // TODO: validation
    const updatableProperties = [
      "name",
      "description",
      "price",
      "stock",
      "photos",
      "supplier",
    ];
    const product = await Product.findByPk(req.params.id);

    for (const property of updatableProperties) {
      await product.update(property, req.body.property);
    }

    await product.save();
    await product.reload();
    return res.json(product).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    return res.status(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function addPhotoToProduct(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ error: "No photo uploaded." });
  }

  try {
    const product = await Product.findByPk(req.params.id);

    let productPhotos = product.photos;
    if (productPhotos) {
      productPhotos = [...productPhotos, req.file.path];
    } else {
      productPhotos = [req.file.path];
    }

    product.photos = productPhotos;
    await product.save();
    await product.reload();
    return res.json(product).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function removePhotoFromProduct(req: Request, res: Response) {
  try {
    const uploadDir = process.env.UPLOAD_DIR;
    const photoName = req.params.photoName;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const filePath = path.join(uploadDir, photoName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Photo not found." });
    }

    let photos = product.photos;
    photos = photos.filter((fP) => fP !== filePath);

    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    await product.update({ photos });
    await product.save();

    return res.status(200).json({ message: "Photo deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await Category.findAll();
    return res.json(categories).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    // TODO: validation
    const category = await Category.create({ name: req.body.name });
    return res.json(category).status(201);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getProductsByCategory(req: Request, res: Response) {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.findAll({ where: { categoryId } });
    return res.json(products).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function addToWishlist(req: Request, res: Response) {
  try {
    const quantity = req.body.quantity;
    const product = await Product.findByPk(req.body.productId);

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Insufficient stock of product" });
    }

    if (product) {
      const payload = {
        event: "ADD_TO_WISHLIST",
        data: {
          userId: "6f0a6422-1059-4dc4-b56c-eec59a52c189", // TODO: change after auth update
          product,
          quantity,
        },
      };

      // what if unsuccessful response
      await publishMessage(
        process.env.CUSTOMER_BINDING_KEY,
        JSON.stringify(payload)
      );

      return res
        .status(200)
        .json({ message: "Product added to user's wishlist successfully" });
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function removeFromWishlist(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (product) {
      const payload = {
        event: "REMOVE_FROM_WISHLIST",
        data: { userId: "6f0a6422-1059-4dc4-b56c-eec59a52c189", product },
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

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Insufficient stock of product" });
    }

    if (product) {
      const payload = {
        event: "ADD_TO_CART",
        data: {
          userId: "6f0a6422-1059-4dc4-b56c-eec59a52c189",
          product,
          quantity,
        },
      };

      await publishMessage(
        process.env.CUSTOMER_BINDING_KEY,
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
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (product) {
      const payload = {
        event: "REMOVE_FROM_CART",
        data: { userId: "6f0a6422-1059-4dc4-b56c-eec59a52c189", product },
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
