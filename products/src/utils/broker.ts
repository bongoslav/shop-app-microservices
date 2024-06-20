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

export async function subscribeMessage(
  bindingKey: string,
  callback: (msg: any) => void
): Promise<void> {
  if (!channel) {
    throw new Error("Channel is not initialized");
  }
  const q = await channel.assertQueue("", { exclusive: true });
  channel.bindQueue(q.queue, process.env.EXCHANGE_NAME, bindingKey);
  channel.consume(q.queue, (msg) => {
    if (msg !== null) {
      callback(msg.content.toString());
      channel.ack(msg);
    }
  });
}
