import { PrismaClient } from "@prisma/client"
import {
    Transaction,
    TransactionProps,
} from "../../../domain/transaction/entity/transaction"
import { GetTransactionGateway } from "../../../domain/transaction/gateways/get-transaction.gateway"
import { NotFoundError } from "../../api/middlewares/errors/helpers/api-errors"

export class GetTransactionRepositoryPrisma implements GetTransactionGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new GetTransactionRepositoryPrisma(prismaClient)
    }

    public async getTransaction(id: string): Promise<Transaction> {
        const transaction = await this.prismaClient.transaction.findFirst({
            where: {
                id,
            },
            include: {
                payer: {
                    select: {
                        name: true,
                        cpf: true,
                        email: true,
                    },
                },
                receiver: {
                    select: {
                        name: true,
                        cpf: true,
                        email: true,
                    },
                },
            },
        })

        if (!transaction) throw new NotFoundError("Transaction Not Found!")

        const transactionData = this.present(transaction)

        return transactionData
    }

    private present(transaction: TransactionProps): Transaction {
        const transactionData = Transaction.with({
            id: transaction.id,
            payerId: transaction.payerId,
            receiverId: transaction.receiverId,
            value: transaction.value,
            createdAt: transaction.createdAt,
            payer: transaction.payer,
            receiver: transaction.receiver,
        })

        return transactionData
    }
}
