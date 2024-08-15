import { destoryProduct, findProductById, findProducts, insertManyProduct, insertProduct, updateProduct } from "../repositories/product.repository.js"

export const getAllProducts = async () => {
    const products = await findProducts()
    return products
}

export const getProductById = async (id) => {
    const product = await findProductById(id)
    if (!product) {
        throw new Error('Product Not Found.')
    }
    return product
}

export const createProduct = async (newProductData) => {
    const product = await insertProduct(newProductData)
    return product
}

export const createProducts = async (newProductsData) => {
    if (!Array.isArray(newProductsData) || newProductsData.length === 0) {
        throw new Error("newProductData harus berupa array yang berisi objek produk.");
    }
    const products = await insertManyProduct(newProductsData)
    return products
}

export const editProduct = async (id, productData) => { 
    await getProductById(id)
    const product = await updateProduct(id, productData)
    return product
}

export const deleteProduct = async (id) => { 
    await getProductById(id)
    const product = await destoryProduct(id)
    return product
}