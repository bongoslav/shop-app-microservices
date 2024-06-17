import { Application, NextFunction, Request, Response } from "express";
import { CustomerService } from "../services/customerService";

export async function appEventsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const service = new CustomerService();
  try {
    const { payload } = req.body;

    await service.SubscribeEvents(payload);

    res.json(payload);
  } catch (e) {
    next(e);
  }
}
