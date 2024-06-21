import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import productRoutes from "./api/routes/productRoutes";
import * as dotenv from "dotenv";
dotenv.config();

const BASE_PATH = "/api/v1/products";

const app = express();
app.use(express.json());
app.use(cors());

// basic logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("PRODUCTS: ", req.method, req.hostname, req.path);
  next();
});

app.use(BASE_PATH, productRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

export default app;
