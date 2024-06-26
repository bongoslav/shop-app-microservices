import Cart_Products from "../database/models/Cart_Products";
import Product from "../database/models/Product";

export default class ShoppingService {
  async handleProductDeleted(productId: string) {
    const cartProducts = await Cart_Products.findAll({ where: { productId } });
    if (!cartProducts) {
      throw new Error("Cart with such product does not exist");
    }

    const products = await Product.findAll({ where: { id: productId } });
    if (products) {
      for (const product of products) {
        await product.destroy();
      }
    }
  }

  async handleProductUpdate(productData: Product) {
    const product = await Product.findByPk(productData.id);
    if (product) {
      await product.update(productData);
    } else {
      throw new Error("Product not found");
    }
  }

  async handleProductCreate(productData: Product) {
    const product = await Product.create({ ...productData });
    return product;
  }
}
