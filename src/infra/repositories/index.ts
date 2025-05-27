import { prisma } from "../../package/prisma/prisma"
import { AuthorizarionApi } from "../services/authorization.api"
import {
    CreateTransactionRepositoryPrisma,
    GetTransactionRepositoryPrisma,
    GetTransactionsRepositoryPrisma,
} from "./transaction"
import { GetUserRepositoryPrisma } from "./user"
import { GetUserTransactionRepositoryPrisma } from "./user/get-user-transactions.repository.prisma"
import { WalletRepositoryPrisma } from "./wallet"

const getUserRepository = GetUserRepositoryPrisma.create(prisma)

const walletRepository = WalletRepositoryPrisma.create(prisma)

const createTransactionRepository =
    CreateTransactionRepositoryPrisma.create(prisma)

const getUserTransactionsRepository =
    GetUserTransactionRepositoryPrisma.create(prisma)

const getTransactionsRepository = GetTransactionsRepositoryPrisma.create(prisma)

const getTransactionRepository = GetTransactionRepositoryPrisma.create(prisma)

const authService = AuthorizarionApi.create()

export {
    getUserRepository,
    getTransactionRepository,
    getTransactionsRepository,
    createTransactionRepository,
    walletRepository,
    getUserTransactionsRepository,
    authService,
}
