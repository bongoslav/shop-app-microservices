import CustomerService from "../services/customerService";

type ProductPayload = {
  event: string;
  data: {
    userId: string;
    product: any;
    quantity: number;
  };
  correlationId: string;
};

const service = new CustomerService();

export async function SubscribeEvents(payload) {
  console.log("Triggering Customer Events");

  // payload can come from product & from shopping
  const { event, data } = payload;
  const { userId, product, quantity, order } = data;

  switch (event) {
    case "ADD_TO_WISHLIST":
      await service.handleWishlistEvent(userId, product, event, quantity);
      break;
    case "REMOVE_FROM_WISHLIST":
      await service.handleWishlistEvent(userId, product, event);
      break;
    case "ADD_TO_CART":
      await service.handleCartEvent(userId, product, event, quantity);
      break;
    case "REMOVE_FROM_CART":
      await service.handleCartEvent(userId, product, event);
      break;
    case "CREATE_ORDER":
      await service.handleOrderEvent(userId, order);
      break;
    default:
      break;
  }
}
