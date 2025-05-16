import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: "alice@prisma.io" },
        update: {},
        create: {
            name: "Alice",
            cpf: "773.208.175-78",
            email: "alice@prisma.io",
            password: "12345678",
            wallet: {
                create: {
                    value: 1000,
                },
            },
        },
    })

    const user2 = await prisma.user.upsert({
        where: { email: "bob@prisma.io" },
        update: {},
        create: {
            name: "Bob",
            cpf: "644.284.351-34",
            email: "bob@prisma.io",
            password: "12345678",
            wallet: {
                create: {
                    value: 1500,
                },
            },
        },
    })

    const user3 = await prisma.user.upsert({
        where: { email: "john@prisma.io" },
        update: {},
        create: {
            name: "John",
            cpf: "601.791.681-50",
            email: "john@prisma.io",
            password: "12345678",
            role: "SHOPKEEPER",
            wallet: {
                create: {
                    value: 5000,
                },
            },
        },
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
