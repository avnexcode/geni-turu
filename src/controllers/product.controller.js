import { updateProduct } from "../repositories/product.repository.js";
import { createProduct, createProducts, deleteProduct, getAllProducts, getProductById } from "../services/product.service.js";

export const getProductsController = async (request, response) => {
    try {
        const products = await getAllProducts();
        response.status(200).send({
            status: "OK",
            message: "Success Get All Products",
            data: products,
        });
    } catch (error) {
        response.status(400).send(error.message)
    }
};

export const getProductController = async (request, response) => {
    try {
        const id = request.params.id
        const product = await getProductById(id)
        response.status(200).send({
            status: "OK",
            message: "Success Get Detail Product",
            data: product
        })
    } catch (error) {
        response.status(400).send(error.message)
    }
};

export const postProductController = async (request, response) => {
    try {
        const product = await createProduct(request.body)
        response.status(200).send({
            status: "OK",
            message: "New Product Has Been Created",
            data: product
        })
    } catch (error) {
        response.status(400).send(error.message)
    }
};

export const postProductsController = async (request, response) => {
    try {
        const products = await createProducts(request.body)
        response.status(200).send({
            status: "OK",
            message: "New Products Has Been Created",
            data: products
        })
    } catch (error) {
        response.status(400).send(error.message)
    }
};

export const putProductController = async (request, response) => {
    if (!(request.body.name && request.body.price && request.body.category && request.body.description && request.body.image)) {
        return response.status(500).send({ message: "Missing some fields" })
    }
    try {
        const id = request.params.id
        const product = await updateProduct(id, request.body)
        response.status(200).send({
            status: "OK",
            message: "Product Has Been Updated",
            data: product
        })
    } catch (error) {
        response.status(400).send(error.message)
    }
};

export const patchProductController = async (request, response) => {
    try {
        const id = request.params.id
        const product = await updateProduct(id, request.body)
        response.status(200).send({
            status: "OK",
            message: "Product Has Been Updated",
            data: product
        })
    } catch (error) {
        response.status(400).send(error.message)
    }
};

export const deleteProductController = async (request, response) => {
    try {
        const id = request.params.id
        const product = await deleteProduct(id)
        response.status(200).send({
            status: "OK",
            message: "Success Delete Product",
            data: product
        })
    } catch (error) {
        response.status(400).send(error.message)
    }
};
