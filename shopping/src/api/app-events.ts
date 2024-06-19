import { NextFunction, Request, Response } from "express";

export async function appEventsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { payload } = req.body;

  console.log("============= Shopping ================");
  console.log(payload);

  return res.status(200).json({ message: "notified!" });
}
