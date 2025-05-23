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
}
