import { Router } from "express";
import {
  addToCart,
  createOrder,
  getAllOrders,
  getCart,
  getSingleOrder,
  getUserOrder,
  removeFromCart,
} from "../controllers/shoppingController";

const router = Router();

router.get("/orders", getAllOrders);
router.get("/orders/:id", getSingleOrder);
router.get("/orders/user/:id", getUserOrder);
router.post("/orders", createOrder);

router.get("/cart", getCart);
router.put("/cart", addToCart);
router.delete("/cart", removeFromCart);

export default router;
