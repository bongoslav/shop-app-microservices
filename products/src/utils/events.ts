export async function publishCustomerEvent(payload) {
  const url = "http://localhost:8001/api/v1/customers/app-events";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  };
  try {
    await fetch(url, options);
    console.log("Event published successfully");
  } catch (error) {
    console.error("Failed to publish event:", error);
  }
}

export async function publishShoppingEvent(payload) {
  const url = "http://localhost:8003/api/v1/shopping/app-events";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  };
  try {
    await fetch(url, options);
    console.log("Event published successfully");
  } catch (error) {
    console.error("Failed to publish event:", error);
  }
}
