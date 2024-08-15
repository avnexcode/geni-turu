import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRouter from "./routers/product.router.js"
import { verifyToken } from "./middlewares/middleware.js";

const app = express();

app.use(express.json())
app.use(cors())
dotenv.config();

const PORT = process.env.PORT;

app.use(verifyToken)
app.use("/products", productRouter)

app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`);
});