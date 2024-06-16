import { Application, NextFunction, Request, Response } from "express";
import { CustomerService } from "../services/customerService";

export function appEvents(app: Application) {
  const service = new CustomerService();
  app.use(
    "/app-events",
    async (req: Request, res: Response, next: NextFunction) => {
      const { payload } = req.body;

      //handle subscribe events
      service.SubscribeEvents(payload);

      console.log("============= Shopping ================");
      console.log(payload);
      res.json(payload);
    }
  );
}
