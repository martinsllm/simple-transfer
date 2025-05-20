import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma"
import { prisma } from "./package/prisma/prisma"
import {
    CreateTransactionUsecase,
    TransactionInputDto,
} from "./usecases/transaction"

const userRepository = UserRepositoryPrisma.create(prisma)

const createTransaction = CreateTransactionUsecase.create(userRepository)

const input: TransactionInputDto = {
    payerId: 1,
    receiverId: 2,
}

createTransaction.execute(input)
