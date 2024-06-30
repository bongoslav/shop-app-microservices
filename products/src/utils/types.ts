import { Request } from "express";

export type CreateProductData = {
  name: string;
  description: string;
  banner: string;
  type: string;
  unit: number;
  price: number;
  available: boolean;
  supplier: string;
};

export interface MulterRequest extends Request {
  file: any;
}
