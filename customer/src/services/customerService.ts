import Wishlist from "../database/models/Wishlist";
import WishlistProduct from "../database/models/WishlistProduct";

export default class CustomerService {
  async handleWishlistEvent(
    userId: string,
    productId: string,
    event: string,
    quantity?: number
  ) {
    const wishlist = await Wishlist.findOne({
      where: { customerId: userId },
    });
    if (!wishlist) {
      throw new Error("Customer's Wishlist does not exist");
    }
    if (event === "WISHLIST_ADD") {
      // check if item already exists
      const existingItem = await WishlistProduct.findOne({
        where: {
          wishlistId: wishlist.id,
          productId,
        },
      });
      if (!existingItem) {
        await WishlistProduct.create({
          wishlistId: wishlist.id,
          productId,
          quantity: quantity,
        });
      } else {
        await existingItem.update({
          quantity: existingItem.quantity + quantity,
        });
        await existingItem.save();
      }
    } else if (event === "WISHLIST_REMOVE") {
      const existingItem = await WishlistProduct.findOne({
        where: {
          wishlistId: wishlist.id,
          productId,
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
  // async handleCartEvent(
  //   userId: string,
  //   productData: Product,
  //   event: string,
  //   quantity?: number
  // ) {
  //   const cart = await Cart.findOne({
  //     where: { customerId: userId },
  //   });
  //   if (!cart) {
  //     throw new Error("Customer's Cart does not exist");
  //   }
  //   if (event === "ADD_TO_CART") {
  //     const [product] = await Product.findOrCreate({
  //       where: { id: productData.id },
  //       defaults: {
  //         id: productData.id,
  //         name: productData.name,
  //         price: productData.price,
  //       },
  //     });
  //     const existingItem = await Cart_Products.findOne({
  //       where: {
  //         cartId: cart.id,
  //         productId: product.id,
  //       },
  //     });
  //     if (!existingItem) {
  //       await Cart_Products.create({
  //         cartId: cart.id,
  //         productId: product.id,
  //         quantity: quantity,
  //       });
  //     } else {
  //       await existingItem.update({
  //         quantity: existingItem.quantity + quantity,
  //       });
  //       await existingItem.save();
  //     }
  //   } else if (event === "REMOVE_FROM_CART") {
  //     const product = await Product.findOne({ where: { id: productData.id } });
  //     const existingItem = await Cart_Products.findOne({
  //       where: {
  //         cartId: cart.id,
  //         productId: product.id,
  //       },
  //     });
  //     if (!existingItem) {
  //       throw new Error("Product does not exist for cart");
  //     }
  //     await existingItem.update({
  //       quantity: existingItem.quantity - 1,
  //     });
  //     await existingItem.save();
  //     if (existingItem.quantity < 1) {
  //       await existingItem.destroy();
  //     }
  //   }
  // }
  // async handleOrderEvent(userId: string, orderData: Order) {
  //   const cart = await Cart.findOne({
  //     where: { customerId: userId },
  //     include: [{ model: Product }],
  //   });
  //   if (!cart) {
  //     throw new Error("Customer's Cart does not exist");
  //   }
  //   const orderDetails = {
  //     ...orderData,
  //     date: new Date(),
  //     customerId: userId,
  //   };
  //   const order = await Order.create(orderDetails);
  //   const productAssociations = cart.products.map((product) => ({
  //     orderId: order.id,
  //     productId: product.id,
  //   }));
  //   await Order_Products.bulkCreate(productAssociations);
  //   cart.products = [];
  //   await cart.save();
  // }
  // );

  async handleProductDeleted(productId: string, userId: string) {
    const wishlist = await Wishlist.findOne({ where: { customerId: userId } });
    if (!wishlist) {
      throw new Error("Wishlist does not exist");
    }

    const product = wishlist.products.find((p) => p.id === productId);
    if (product) {
      await product.destroy();
    }
    return wishlist;
  }
}
