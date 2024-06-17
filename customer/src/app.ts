import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import customerRoutes from "./api/routes/customerRoutes";
import * as dotenv from "dotenv";
import { appEventsHandler } from "./api/app-events";
dotenv.config();

const BASE_PATH = "/api/v1/customers";

const app = express();
app.use(express.json());
app.use(cors());

// listen to events (Event driven architecture)
app.post(`${BASE_PATH}/app-events`, appEventsHandler);

app.use("/api/v1/customers", customerRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

export default app;
