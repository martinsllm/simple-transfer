import { ApiExpress } from "./infra/api/express/api.express"
import {
    CreateTransactionRoute,
    GetTransactionsRoute,
} from "./infra/api/express/routes/transactions"
import {
    GetProfileRoute,
    GetUserTransactionsRoute,
} from "./infra/api/express/routes/users"
import {
    TransactionRepositoryPrisma,
    UserRepositoryPrisma,
    WalletRepositoryPrisma,
} from "./infra/repositories"
import { AuthorizarionApi } from "./infra/services/authorization.api"
import { prisma } from "./package/prisma/prisma"
import {
    CreateTransactionUsecase,
    GetTransactionsUseCase,
} from "./usecases/transactions"
import { GetProfileUsecase } from "./usecases/users"
import { GetUserTransactionsUsecase } from "./usecases/users/get-user-transactions.usecase"

const userRepository = UserRepositoryPrisma.create(prisma)
const walletRepository = WalletRepositoryPrisma.create(prisma)
const transactionRepository = TransactionRepositoryPrisma.create(prisma)
const authService = AuthorizarionApi.create()

function main() {
    const createTransaction = CreateTransactionUsecase.create(
        userRepository,
        walletRepository,
        transactionRepository,
        authService
    )

    const getTransactions = GetTransactionsUseCase.create(transactionRepository)

    const getProfile = GetProfileUsecase.create(userRepository)

    const getUserTransactions =
        GetUserTransactionsUsecase.create(userRepository)

    const createTransactionRoute =
        CreateTransactionRoute.create(createTransaction)

    const getTransactionsRoute = GetTransactionsRoute.create(getTransactions)

    const getProfileRoute = GetProfileRoute.create(getProfile)

    const getUserTransactionsRoute =
        GetUserTransactionsRoute.create(getUserTransactions)

    const port = Number(process.env.PORT)

    const api = ApiExpress.create([
        createTransactionRoute,
        getTransactionsRoute,
        getProfileRoute,
        getUserTransactionsRoute,
    ])

    api.start(port)
}

main()
