import ShoppingService from "../services/shoppingService";

export async function SubscribeEvents(payload) {
  const { event, data } = payload;
  const { userId, product } = data;

  const service = new ShoppingService();

  // TODO: do i need the whole product in this service ??
  switch (event) {
    case "PRODUCT_CREATED":
      await service.handleProductCreate(product);
      break;
    case "PRODUCT_UPDATED":
      await service.handleProductUpdate(product);
      break;
    case "PRODUCT_DELETED":
      await service.handleProductDeleted(product.id);
      break;
    default:

      break;
  }
}
