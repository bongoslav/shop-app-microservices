import amqplib, { Channel, Connection } from "amqplib";
import dotenv from "dotenv";
import { SubscribeEvents } from "./subscribeEvents";
dotenv.config();

let connection: Connection;
let channel: Channel;

export async function createChannel(): Promise<Channel> {
  if (!channel) {
    connection = await amqplib.connect(process.env.MESSAGE_BROKER_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(process.env.EXCHANGE_NAME, "direct", {
      durable: true,
    });
  }
  return channel;
}

export async function createQueue(
  queueName: string,
  bindingKey: string
): Promise<void> {
  if (!channel) {
    throw new Error("Channel is not initialized");
  }
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, process.env.EXCHANGE_NAME, bindingKey);
}

export async function publishMessage(
  bindingKey: string,
  message: string
): Promise<void> {
  if (!channel) {
    throw new Error("Channel is not initialized");
  }
  channel.publish(process.env.EXCHANGE_NAME, bindingKey, Buffer.from(message), {
    persistent: true,
  });
}

export async function subscribeMessage(queueName: string): Promise<void> {
  if (!channel) {
    throw new Error("Channel is not initialized");
  }
  channel.consume(queueName, (data) => {
    if (data !== null) {
      const message = JSON.parse(data.content.toString());
      SubscribeEvents(message);
      channel.ack(data);
    }
  });
}

export async function initializeRabbitMQ() {
  try {
    await createChannel();
    console.log("RabbitMQ connected and channel created");

    await createQueue(process.env.QUEUE_NAME, process.env.SHOPPING_BINDING_KEY);
    console.log(
      `Queue ${process.env.QUEUE_NAME} created and bound to ${process.env.SHOPPING_BINDING_KEY}`
    );

    await subscribeMessage(process.env.QUEUE_NAME);
    console.log(`Subscribed to messages from queue ${process.env.QUEUE_NAME}`);
  } catch (err) {
    console.error("Failed to connect to RabbitMQ:", err);
  }
}
