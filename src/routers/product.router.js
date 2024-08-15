import express from "express";
import {
    getProductsController,
    getProductController,
    postProductController,
    putProductController,
    patchProductController,
    deleteProductController,
    postProductsController,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProductsController);
router.get("/:id", getProductController);
router.post("/", postProductController);
router.put("/:id", putProductController);
router.patch("/:id", patchProductController);
router.delete("/:id", deleteProductController);
router.post("/many", postProductsController);

export default router