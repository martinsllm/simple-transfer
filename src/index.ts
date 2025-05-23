import { ApiExpress } from "./infra/api/express/api.express"
import { CreateTransactionRoute } from "./infra/api/express/routes/transactions"
import { TransactionRepositoryPrisma } from "./infra/repositories/transaction/transaction.repository.prisma"
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma"
import { AuthorizarionApi } from "./infra/services/authorization.api"
import { prisma } from "./package/prisma/prisma"
import { CreateTransactionUsecase } from "./usecases/transaction"

const userRepository = UserRepositoryPrisma.create(prisma)
const transactionRepository = TransactionRepositoryPrisma.create(prisma)
const authService = AuthorizarionApi.create()

function main() {
    const createTransaction = CreateTransactionUsecase.create(
        userRepository,
        transactionRepository,
        authService
    )

    const createTransactionRoute =
        CreateTransactionRoute.create(createTransaction)

    const port = Number(process.env.PORT)

    const api = ApiExpress.create([createTransactionRoute])

    api.start(port)
}

main()
