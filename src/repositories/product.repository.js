import prisma from "../db/db.js";

export const findProducts = async (filter, page, limit) => {
    const skip = (page - 1) * limit;
    const products = await prisma.products.findMany({
        where: filter,
        skip,
        take: limit,
    });
    const total = await prisma.products.count({ where: filter });
    return { products, total, page, limit };
};

export const findProductById = async (id) => {
    return await prisma.products.findUnique({
        where: { id },
    });
};

export const insertProduct = async (newProductData) => {
    return await prisma.products.create({
        data: newProductData,
    });
};

export const insertManyProducts = async (newProductsData) => {
    return await prisma.products.createMany({
        data: newProductsData,
        skipDuplicates: true,
    });
};

export const destroyProduct = async (id) => {
    return await prisma.products.delete({
        where: { id },
    });
};

export const updateProduct = async (id, productData) => {
    return await prisma.products.update({
        data: productData,
        where: { id },
    });
};