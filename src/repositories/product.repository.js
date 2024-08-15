import prisma from "../db/db.js";

export const findProducts = async () => {
    const products = await prisma.products.findMany();
    return products;
};

export const findProductById = async (id) => {
    const product = await prisma.products.findUnique({
        where: { id },
    });
    return product;
};

export const insertProduct = async (newProductData) => {
    const product = await prisma.products.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            category: newProductData.category,
            description: newProductData.description,
            image: newProductData.image,
        },
    });
    return product;
};

export const insertManyProduct = async (newProductsData) => {
    const products = await prisma.products.createMany({
        data: newProductsData.map((product) => ({
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image,
        })),
        skipDuplicates: true,
    });
    return products;
};

export const destoryProduct = async (id) => {
    const product = await prisma.products.delete({
        where: { id },
    });
    return product;
};

export const updateProduct = async (id, productData) => {
    const product = await prisma.products.update({
        data: {
            name: productData.name,
            price: productData.price,
            category: productData.category,
            description: productData.description,
            image: productData.image,
        },
        where: { id },
    });
    return product;
};
