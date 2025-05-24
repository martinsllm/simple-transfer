import { ApiExpress } from "./infra/api/express/api.express"
import {
    CreateTransactionRoute,
    GetTransactionsRoute,
} from "./infra/api/express/routes/transactions"
import { TransactionRepositoryPrisma } from "./infra/repositories/transaction/transaction.repository.prisma"
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma"
import { WalletRepositoryPrisma } from "./infra/repositories/wallet/wallet.repository.prisma"
import { AuthorizarionApi } from "./infra/services/authorization.api"
import { prisma } from "./package/prisma/prisma"
import { CreateTransactionUsecase } from "./usecases/transaction"
import { GetTransactionsUseCase } from "./usecases/transaction/get-transactions.usecase"

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

    const createTransactionRoute =
        CreateTransactionRoute.create(createTransaction)

    const getTransactionsRoute = GetTransactionsRoute.create(getTransactions)

    const port = Number(process.env.PORT)

    const api = ApiExpress.create([
        createTransactionRoute,
        getTransactionsRoute,
    ])

    api.start(port)
}

main()
