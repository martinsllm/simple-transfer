import { PrismaClient } from "@prisma/client"
import { CreateTransactionGateway } from "../../../domain/transaction/gateways/create-transaction.gateway"
import {
    Transaction,
    TransactionProps,
} from "../../../domain/transaction/entity/transaction"

export class CreateTransactionRepositoryPrisma
    implements CreateTransactionGateway
{
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new CreateTransactionRepositoryPrisma(prismaClient)
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
