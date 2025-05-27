import { PrismaClient } from "@prisma/client"
import { UserGateway } from "../../../domain/user/gateway/user.gateway"
import { User, UserProps } from "../../../domain/user/entity/user"
import { NotFoundError } from "../../api/middlewares/errors/helpers/api-errors"
import {
    Transaction,
    TransactionProps,
} from "../../../domain/transaction/entity/transaction"

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient)
    }

    public async getById(id: number): Promise<User> {
        const user = await this.prismaClient.user.findFirst({
            where: {
                id,
            },
            include: {
                wallet: true,
            },
        })

        if (!user) throw new NotFoundError("User Not Found!")

        const userData = this.presentUser(user)
        return userData
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

        const transactionsList = this.presentUserTransactions(
            user.transactionsSent,
            user.transactionsReceived
        )

        return transactionsList
    }

    private presentUser(user: UserProps): User {
        const userData = User.with({
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            role: user.role,
            wallet: user.wallet,
        })

        return userData
    }

    private presentUserTransactions(
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
