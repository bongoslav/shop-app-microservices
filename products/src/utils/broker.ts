import amqplib, { Channel, Connection } from "amqplib";
import dotenv from "dotenv";
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
): Promise<boolean> {
  if (!channel) {
    throw new Error("Channel is not initialized");
  }
  // TODO: handle if error comes from the other ms
  const result = channel.publish(
    process.env.EXCHANGE_NAME,
    bindingKey,
    Buffer.from(message),
    {
      persistent: true,
    }
  );
  return result;
}

// products service don't need to subscribe to messages

export async function initializeRabbitMQ() {
  try {
    await createChannel();
    console.log("RabbitMQ connected and channel created");
  } catch (err) {
    console.error("Failed to connect to RabbitMQ:", err);
  }
}
