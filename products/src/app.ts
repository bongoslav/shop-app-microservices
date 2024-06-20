import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import productRoutes from "./api/routes/productRoutes";
import * as dotenv from "dotenv";
import { createChannel, subscribeMessage } from "./utils/broker";
dotenv.config();

const BASE_PATH = "/api/v1/products";
export const CUSTOMER_SERVICE = "customer_service";
export const PRODUCT_SERVICE = "product_service";
export const SHOPPING_SERVICE = "shopping_service";

const app = express();
app.use(express.json());
app.use(cors());

// basic logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("PRODUCTS: ", req.method, req.hostname, req.path);
  next();
});

app.use(BASE_PATH, productRoutes);

createChannel()
  .then((channel) => {
    console.log("RabbitMQ connected and channel created");
    subscribeMessage(PRODUCT_SERVICE, (message) => {
      console.log("Received message:", message);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to RabbitMQ:", err);
  });

export default app;
