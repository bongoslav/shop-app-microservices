import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import customerRoutes from "./api/routes/customerRoutes";
import * as dotenv from "dotenv";
import { appEvents } from "./api/app-events";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/customers", customerRoutes);

// listen to events
appEvents(app)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

export default app;
