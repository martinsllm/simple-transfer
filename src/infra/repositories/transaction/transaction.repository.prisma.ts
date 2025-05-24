import { PrismaClient } from "@prisma/client"
import { TransactionGateway } from "../../../domain/transaction/gateway/transaction.gateway"
import { Transaction } from "../../../domain/transaction/entity/transaction"

export class TransactionRepositoryPrisma implements TransactionGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new TransactionRepositoryPrisma(prismaClient)
    }

    public async save(data: Transaction): Promise<void> {
        const transaction = {
            id: data.id,
            payerId: data.payerId,
            receiverId: data.receiverId,
            value: data.value,
            createdAt: data.createdAt,
        }

        await this.prismaClient.transaction.create({
            data: {
                ...transaction,
            },
        })
    }

    public async getTransactions(): Promise<Transaction[]> {
        const transactions = await this.prismaClient.transaction.findMany({
            include: {
                payer: true,
                receiver: true,
            },
        })

        const transactionList = transactions.map((t) => {
            const transaction = Transaction.with({
                id: t.id,
                payerId: t.payerId,
                receiverId: t.receiverId,
                value: t.value,
                createdAt: t.createdAt,
                payer: t.payer,
                receiver: t.receiver,
            })

            return transaction
        })

        return transactionList
    }
}
