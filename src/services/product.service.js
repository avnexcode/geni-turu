import { destroyProduct, findProductById, findProducts, insertManyProducts, insertProduct, updateProduct } from "../repositories/product.repository.js"

export const getAllProducts = async (filter = {}, page = 1, limit = 10) => {
    const products = await findProducts(filter, page, limit)
    return products
}

export const getProductById = async (id) => {
    const product = await findProductById(id)
    if (!product) {
        throw new Error('Product not found.')
    }
    return product
}

export const createProduct = async (newProductData) => {
    const product = await insertProduct(newProductData)
    return product
}

export const createProducts = async (newProductsData) => {
    if (!Array.isArray(newProductsData) || newProductsData.length === 0) {
        throw new Error("New products data must be a non-empty array of product objects");
    }
    const products = await insertManyProducts(newProductsData)
    return products
}

export const editProduct = async (id, productData) => {
    await getProductById(id)
    const product = await updateProduct(id, productData)
    return product
}

export const deleteProduct = async (id) => {
    await getProductById(id)
    const product = await destroyProduct(id)
    return product
}