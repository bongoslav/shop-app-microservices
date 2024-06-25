import Cart from "../database/models/Cart";
import Cart_Products from "../database/models/Cart_Products";
import Order from "../database/models/Order";
import Order_Products from "../database/models/Order_Products";
import Product from "../database/models/Product";
import Wishlist from "../database/models/Wishlist";
import Wishlist_Products from "../database/models/Wishlist_Products";

export default class CustomerService {
  async handleWishlistEvent(
    userId: string,
    productData: Product,
    event: string,
    quantity?: number
  ) {
    const wishlist = await Wishlist.findOne({
      where: { customerId: userId },
    });
    if (!wishlist) {
      throw new Error("Customer's Wishlist does not exist");
    }

    if (event === "ADD_TO_WISHLIST") {
      const [product] = await Product.findOrCreate({
        where: { id: productData.id },
        defaults: {
          id: productData.id,
          name: productData.name,
          price: productData.price,
        },
      });

      // check if item already exists
      const existingItem = await Wishlist_Products.findOne({
        where: {
          wishlistId: wishlist.id,
          productId: product.id,
        },
      });

      if (!existingItem) {
        await Wishlist_Products.create({
          wishlistId: wishlist.id,
          productId: product.id,
          quantity: quantity,
        });
      } else {
        await existingItem.update({
          quantity: existingItem.quantity + quantity,
        });
        await existingItem.save();
      }
    } else if (event === "REMOVE_FROM_WISHLIST") {
      const product = await Product.findOne({ where: { id: productData.id } });

      const existingItem = await Wishlist_Products.findOne({
        where: {
          wishlistId: wishlist.id,
          productId: product.id,
        },
      });
      if (!existingItem) {
        throw new Error("Product does not exist for wishlist");
      }

      await existingItem.update({
        quantity: existingItem.quantity - 1,
      });
      await existingItem.save();
      if (existingItem.quantity < 1) {
        await existingItem.destroy();
      }
    }
  }

  async handleCartEvent(
    userId: string,
    productData: Product,
    event: string,
    quantity?: number
  ) {
    const cart = await Cart.findOne({
      where: { customerId: userId },
    });
    if (!cart) {
      throw new Error("Customer's Cart does not exist");
    }

    if (event === "ADD_TO_CART") {
      const [product] = await Product.findOrCreate({
        where: { id: productData.id },
        defaults: {
          id: productData.id,
          name: productData.name,
          price: productData.price,
        },
      });

      const existingItem = await Cart_Products.findOne({
        where: {
          cartId: cart.id,
          productId: product.id,
        },
      });

      if (!existingItem) {
        await Cart_Products.create({
          cartId: cart.id,
          productId: product.id,
          quantity: quantity,
        });
      } else {
        await existingItem.update({
          quantity: existingItem.quantity + quantity,
        });
        await existingItem.save();
      }
    } else if (event === "REMOVE_FROM_CART") {
      const product = await Product.findOne({ where: { id: productData.id } });

      const existingItem = await Cart_Products.findOne({
        where: {
          cartId: cart.id,
          productId: product.id,
        },
      });
      if (!existingItem) {
        throw new Error("Product does not exist for cart");
      }

      await existingItem.update({
        quantity: existingItem.quantity - 1,
      });
      await existingItem.save();
      if (existingItem.quantity < 1) {
        await existingItem.destroy();
      }
    }
  }

  async handleOrderEvent(userId: string, orderData: Order) {
    const cart = await Cart.findOne({
      where: { customerId: userId },
      include: [{ model: Product }],
    });
    if (!cart) {
      throw new Error("Customer's Cart does not exist");
    }

    const orderDetails = {
      ...orderData,
      date: new Date(),
      customerId: userId,
    };
    const order = await Order.create(orderDetails);

    const productAssociations = cart.products.map((product) => ({
      orderId: order.id,
      productId: product.id,
    }));
    await Order_Products.bulkCreate(productAssociations);

    cart.products = [];
    await cart.save();
  }
}
