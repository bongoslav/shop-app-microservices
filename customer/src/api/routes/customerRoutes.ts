import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from "../controllers/customerController";

const router = Router();

// todo: add signup, login, add address, get profile, whoami
router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
