import { Router } from "express";
import {
  addPhotoToProduct,
  addToCart,
  addToWishlist,
  createCategory,
  createProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
  removeFromCart,
  removeFromWishlist,
  removePhotoFromProduct,
  updateProduct,
} from "../controllers/productController";
import upload from "../middleware/fileUpload";

const router = Router();

// TODO: add auth middleware
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload.single("product-photo"), addPhotoToProduct);
router.delete("/:id/:photoName", removePhotoFromProduct);

router.get("/categories", getAllCategories);
router.post("/categories", createCategory);

router.get("/:categoryId", getProductsByCategory);

// TODO - update
router.put("/wishlist", addToWishlist);
router.delete("/wishlist/:id", removeFromWishlist);

router.put("/cart", addToCart);
router.delete("/cart/:id", removeFromCart);

export default router;
