import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import customerRoutes from "./api/routes/customerRoutes";
import * as dotenv from "dotenv";
dotenv.config();

const BASE_PATH = "/api/v1/customer";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("CUSTOMERS: ", req.method, req.hostname, req.path);
  next();
});

app.use(BASE_PATH, customerRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

export default app;
