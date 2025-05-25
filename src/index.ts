import { ApiExpress } from "./infra/api/express/api.express"
import {
    CreateTransactionRoute,
    GetTransactionsRoute,
} from "./infra/api/express/routes/transactions"
import { GetProfileRoute } from "./infra/api/express/routes/users"
import { TransactionRepositoryPrisma } from "./infra/repositories/transaction/transaction.repository.prisma"
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma"
import { WalletRepositoryPrisma } from "./infra/repositories/wallet/wallet.repository.prisma"
import { AuthorizarionApi } from "./infra/services/authorization.api"
import { prisma } from "./package/prisma/prisma"
import { CreateTransactionUsecase } from "./usecases/transactions"
import { GetTransactionsUseCase } from "./usecases/transactions/get-transactions.usecase"
import { GetProfileUsecase } from "./usecases/users"

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

    const createTransactionRoute =
        CreateTransactionRoute.create(createTransaction)

    const getTransactionsRoute = GetTransactionsRoute.create(getTransactions)

    const getProfileRoute = GetProfileRoute.create(getProfile)

    const port = Number(process.env.PORT)

    const api = ApiExpress.create([
        createTransactionRoute,
        getTransactionsRoute,
        getProfileRoute,
    ])

    api.start(port)
}

main()
