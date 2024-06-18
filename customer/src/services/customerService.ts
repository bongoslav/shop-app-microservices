export class CustomerService {
  async SubscribeEvents(payload) {
    console.log("Triggering Customer Events");

    const { event, data } = payload;

    const { userId, product, order, qty } = data;

    switch (event) {
      case "ADD_TO_WISHLIST":
      case "REMOVE_FROM_WISHLIST":
        // this.AddToWishlist(userId, product);
        console.log("EVENT ADD/REMOVE FROM WISHLIST");
        break;
      case "ADD_TO_CART":
        console.log("EVENT ADD/REMOVE FROM CART");
        // this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        console.log("EVENT ADD/REMOVE FROM CART");
        // this.ManageCart(userId, product, qty, true);
        break;
      case "CREATE_ORDER":
        console.log("EVENT CREATE_ORDER");
        // this.ManageOrder(userId, order);
        break;
      case "TEST":
        console.log("Working Subscriber");
        break;
      default:
        break;
    }
  }
}
