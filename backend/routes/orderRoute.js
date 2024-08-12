import express from "express"
import { placeOrder } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js";
import { listOrder } from "../controllers/orderController.js";

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.get("/",authMiddleware,listOrder)

export default orderRouter