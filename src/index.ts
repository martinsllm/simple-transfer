import { ApiExpress } from "./infra/api/express/api.express"
import {
    CreateTransactionRoute,
    GetTransactionsRoute,
} from "./infra/api/express/routes/transactions"
import { GetTransactionRoute } from "./infra/api/express/routes/transactions/get-transaction.express.route"
import {
    GetProfileRoute,
    GetUserTransactionsRoute,
} from "./infra/api/express/routes/users"
import {
    CreateTransactionRepositoryPrisma,
    GetTransactionRepositoryPrisma,
    GetTransactionsRepositoryPrisma,
    GetUserRepositoryPrisma,
    WalletRepositoryPrisma,
} from "./infra/repositories"
import { GetUserTransactionRepositoryPrisma } from "./infra/repositories/user/get-user-transactions.repository.prisma"
import { AuthorizarionApi } from "./infra/services/authorization.api"
import { prisma } from "./package/prisma/prisma"
import {
    CreateTransactionUsecase,
    GetTransactionsUseCase,
    GetTransactionUsecase,
} from "./usecases/transactions"
import { GetProfileUsecase, GetUserTransactionsUsecase } from "./usecases/users"

const getUserRepository = GetUserRepositoryPrisma.create(prisma)

const walletRepository = WalletRepositoryPrisma.create(prisma)

const createTransactionRepository =
    CreateTransactionRepositoryPrisma.create(prisma)

const getUserTransactionsRepository =
    GetUserTransactionRepositoryPrisma.create(prisma)

const getTransactionsRepository = GetTransactionsRepositoryPrisma.create(prisma)

const getTransactionRepository = GetTransactionRepositoryPrisma.create(prisma)

const authService = AuthorizarionApi.create()

function main() {
    const createTransaction = CreateTransactionUsecase.create(
        getUserRepository,
        walletRepository,
        createTransactionRepository,
        authService
    )

    const getTransactions = GetTransactionsUseCase.create(
        getTransactionsRepository
    )

    const getProfile = GetProfileUsecase.create(getUserRepository)

    const getUserTransactions = GetUserTransactionsUsecase.create(
        getUserTransactionsRepository
    )

    const getTransaction = GetTransactionUsecase.create(
        getTransactionRepository
    )

    const createTransactionRoute =
        CreateTransactionRoute.create(createTransaction)

    const getTransactionsRoute = GetTransactionsRoute.create(getTransactions)

    const getProfileRoute = GetProfileRoute.create(getProfile)

    const getUserTransactionsRoute =
        GetUserTransactionsRoute.create(getUserTransactions)

    const getTransactionRoute = GetTransactionRoute.create(getTransaction)

    const port = Number(process.env.PORT)

    const api = ApiExpress.create([
        createTransactionRoute,
        getTransactionsRoute,
        getProfileRoute,
        getUserTransactionsRoute,
        getTransactionRoute,
    ])

    api.start(port)
}

main()
