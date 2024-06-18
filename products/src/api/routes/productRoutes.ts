import { Router } from "express";
import {
  addToCart,
  addToWishlist,
  createProduct,
  getProducts,
  getProductsByType,
  getSingleProduct,
  removeFromCart,
  removeFromWishlist,
} from "../controllers/productController";

const router = Router();

// TODO: add auth middleware
router.get("/", getProducts);
router.post("/", createProduct);
router.get("/category/:type", getProductsByType);
router.get("/:uid", getSingleProduct);

router.put("/wishlist", addToWishlist);
router.delete("/wishlist/:id", removeFromWishlist);

router.put("/cart", addToCart);
router.delete("/cart/:id", removeFromCart);

export default router;
