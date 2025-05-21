import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma"
import { AuthorizarionApi } from "./infra/services/authorization.api"
import { prisma } from "./package/prisma/prisma"
import {
    CreateTransactionUsecase,
    TransactionInputDto,
} from "./usecases/transaction"

const userRepository = UserRepositoryPrisma.create(prisma)
const authService = AuthorizarionApi.create()

const createTransaction = CreateTransactionUsecase.create(
    userRepository,
    authService
)

const input: TransactionInputDto = {
    payerId: 1,
    receiverId: 2,
}

createTransaction.execute(input)
