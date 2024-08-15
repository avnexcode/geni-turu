import express from "express";
import { getProductController } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProductController);


export default router