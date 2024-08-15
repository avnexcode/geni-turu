import prisma from "../db/db.js";

export const findProducts = async (filter, page, limit) => {
    const skip = (page - 1) * limit;

    const prismaFilter = Object.keys(filter).reduce((acc, key) => {
        acc[key] = { contains: filter[key], mode: 'insensitive' };
        return acc;
    }, {});

    const products = await prisma.products.findMany({
        where: prismaFilter,
        skip,
        take: limit,
    });

    const total = await prisma.products.count({ where: prismaFilter });

    return { products, total, page, limit };
};


// export const findProducts = async (filter, page, limit) => {
//     const skip = (page - 1) * limit;

//     const whereClause = Object.keys(filter)
//         .map((key) => `${key} LIKE '%${filter[key]}%'`)
//         .join(' AND ');

//     const productsQuery = `
//         SELECT * FROM products
//         WHERE ${whereClause}
//         LIMIT ${limit}
//         OFFSET ${skip};
//     `;

//     const products = await prisma.$queryRawUnsafe(productsQuery);

//     const countQuery = `
//         SELECT COUNT(*) as total FROM products
//         WHERE ${whereClause};
//     `;

//     const totalResult = await prisma.$queryRawUnsafe(countQuery);
//     const total = Number(totalResult[0].total);

//     return { products, total, page, limit };
// };


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