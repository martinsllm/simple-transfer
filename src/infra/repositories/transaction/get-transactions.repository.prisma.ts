import { PrismaClient } from "@prisma/client"
import {
    Transaction,
    TransactionProps,
} from "../../../domain/transaction/entity/transaction"
import { GetTransactionsGateway } from "../../../domain/transaction/gateways/get-transactions.gateway"

export class GetTransactionsRepositoryPrisma implements GetTransactionsGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new GetTransactionsRepositoryPrisma(prismaClient)
    }

    public async getTransactions(): Promise<Transaction[]> {
        const transactions = await this.prismaClient.transaction.findMany({
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
            orderBy: {
                createdAt: "desc",
            },
        })

        const transactionList = this.present(transactions)

        return transactionList
    }

    private present(transactions: TransactionProps[]): Transaction[] {
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
