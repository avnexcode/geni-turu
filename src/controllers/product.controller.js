import { updateProduct } from "../repositories/product.repository.js";
import { createProduct, createProducts, deleteProduct, getAllProducts, getProductById } from "../services/product.service.js";

export const getProductsController = async (request, response) => {
    try {
        const { page, limit, ...filterParams } = request.query;
        const pageNumber = page ? parseInt(page) : undefined;
        const limitNumber = limit ? parseInt(limit) : undefined;
        const validFilterFields = ['name', 'category', 'price', 'description'];

        const filter = Object.keys(filterParams).reduce((acc, key) => {
            if (validFilterFields.includes(key)) {
                acc[key] = filterParams[key];
            }
            return acc;
        }, {});

        const products = await getAllProducts(filter, pageNumber, limitNumber);

        response.status(200).json({
            status: "success",
            message: "Successfully retrieved all products",
            data: products,
        });
    } catch (error) {

        if (error.name === 'PrismaClientKnownRequestError') {
            response.status(400).json({
                status: "error",
                message: "Invalid filter parameters",
                error: "One or more filter parameters are not valid for the products model"
            });
        } else {
            response.status(500).json({
                status: "error",
                message: "Failed to retrieve products",
                error: error.message
            });
        }
    }
};

export const getProductController = async (request, response) => {
    try {
        const id = request.params.id;
        const product = await getProductById(id);
        if (!product) {
            return response.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        response.status(200).json({
            status: "success",
            message: "Successfully retrieved product details",
            data: product
        });
    } catch (error) {

        response.status(500).json({
            status: "error",
            message: "Failed to retrieve product details",
            error: error.message
        });
    }
};

export const postProductController = async (request, response) => {
    try {
        const product = await createProduct(request.body);

        response.status(201).json({
            status: "success",
            message: "Product has been successfully created",
            data: product
        });
    } catch (error) {

        response.status(400).json({
            status: "error",
            message: "Failed to create product",
            error: error.message
        });
    }
};

export const postProductsController = async (request, response) => {
    try {
        const products = await createProducts(request.body);

        response.status(201).json({
            status: "success",
            message: "Products have been successfully created",
            data: products
        });
    } catch (error) {

        response.status(400).json({
            status: "error",
            message: "Failed to create products",
            error: error.message
        });
    }
};

export const putProductController = async (request, response) => {
    const { name, price, category, description, image } = request.body;
    if (!(name && price && category && description && image)) {
        return response.status(400).json({
            status: "error",
            message: "Missing required fields"
        });
    }
    try {
        const id = request.params.id;
        const product = await updateProduct(id, request.body);
        if (!product) {
            return response.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        response.status(200).json({
            status: "success",
            message: "Product has been successfully updated",
            data: product
        });
    } catch (error) {

        response.status(500).json({
            status: "error",
            message: "Failed to update product",
            error: error.message
        });
    }
};

export const patchProductController = async (request, response) => {
    try {
        const id = request.params.id;
        const product = await updateProduct(id, request.body);
        if (!product) {
            return response.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        response.status(200).json({
            status: "success",
            message: "Product has been successfully updated",
            data: product
        });
    } catch (error) {

        response.status(500).json({
            status: "error",
            message: "Failed to update product",
            error: error.message
        });
    }
};

export const deleteProductController = async (request, response) => {
    try {
        const id = request.params.id;
        const product = await deleteProduct(id);
        if (!product) {
            return response.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }
        
        response.status(200).json({
            status: "success",
            message: "Product has been successfully deleted",
            data: product
        });
    } catch (error) {

        response.status(500).json({
            status: "error",
            message: "Failed to delete product",
            error: error.message
        });
    }
};