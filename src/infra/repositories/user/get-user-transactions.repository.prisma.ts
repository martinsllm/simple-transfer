import { PrismaClient } from "@prisma/client"
import {
    Transaction,
    TransactionProps,
} from "../../../domain/transaction/entity/transaction"
import { GetUserTransactionsGateway } from "../../../domain/user/gateway/get-user-transactions"
import { NotFoundError } from "../../api/middlewares/errors/helpers/api-errors"

export class GetUserTransactionRepositoryPrisma
    implements GetUserTransactionsGateway
{
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new GetUserTransactionRepositoryPrisma(prismaClient)
    }

    public async getUserTransactions(id: number): Promise<Transaction[][]> {
        const user = await this.prismaClient.user.findFirst({
            where: {
                id,
            },
            include: {
                transactionsSent: {
                    include: {
                        receiver: true,
                    },
                },
                transactionsReceived: {
                    include: {
                        payer: true,
                    },
                },
            },
        })

        if (!user) throw new NotFoundError("User Not Found!")

        const transactionsList = this.present(
            user.transactionsSent,
            user.transactionsReceived
        )

        return transactionsList
    }

    private present(
        sent: TransactionProps[],
        received: TransactionProps[]
    ): Transaction[][] {
        const transactionsReceived = received.map((t) => {
            const transaction = Transaction.with({
                id: t.id,
                payerId: t.payerId,
                receiverId: t.receiverId,
                value: t.value,
                createdAt: t.createdAt,
                payer: t.payer,
            })

            return transaction
        })

        const transactionsSent = sent.map((t) => {
            const transaction = Transaction.with({
                id: t.id,
                payerId: t.payerId,
                receiverId: t.receiverId,
                value: t.value,
                createdAt: t.createdAt,
                receiver: t.receiver,
            })

            return transaction
        })

        const transactionList = []

        transactionList.push(transactionsReceived)
        transactionList.push(transactionsSent)

        return transactionList
    }
}
