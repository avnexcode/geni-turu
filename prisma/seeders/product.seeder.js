import { PrismaClient } from '@prisma/client'
import { products } from '../../data/products.js'
const prisma = new PrismaClient()

const main = async () => {
    await prisma.products.deleteMany()
    console.log('All existing products deleted')

    await prisma.products.createMany({
        data: products
    })
    console.log('Seed data inserted successfully')
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })