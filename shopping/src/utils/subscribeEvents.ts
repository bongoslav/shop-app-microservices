export async function SubscribeEvents(payload) {
  console.log("Triggering Shopping Events");

  payload = JSON.parse(payload);
  const { event, data } = payload;
  const { userId, product, qty } = data;

  switch (event) {
    case "ADD_TO_CART":
      console.log("ADD TO CART EVENT FROM SHOPPING SERVICE");
      break;
    case "REMOVE_FROM_CART":
      console.log("REMOVE FROM CART EVENT FROM SHOPPING SERVICE");
      break;
    default:
      break;
  }
}
