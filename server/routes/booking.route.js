import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { createOrder, getOrders } from "../controllers/booking.controller.js";

const router = express.Router();


router.post("/:serviceId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

export default router
