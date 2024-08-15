import { products } from '../../data/products.js'
import prisma from '../../src/db/db.js'

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