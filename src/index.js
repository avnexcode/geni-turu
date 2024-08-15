import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRouter from "./routers/product.router.js"

const app = express();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())
dotenv.config();

const PORT = process.env.PORT;

// app.use("/products", productRouter)

app.get('/products', async (req, res) => {
    // const products = await prisma.products.findMany()
    const products = await prisma.$queryRaw`select * from products`
    res.send(products)
})

app.post('/products', async (req, res) => {
    const newProductData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
    }
    const result = await prisma.products.create({
        data: newProductData
    })
    res.send({
        status: "OKE",
        message: "Products Create Has Been Success",
        data: result
    })
    
})

app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`);
});