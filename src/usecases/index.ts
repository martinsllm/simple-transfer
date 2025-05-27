import {
    authService,
    createTransactionRepository,
    getTransactionRepository,
    getTransactionsRepository,
    getUserRepository,
    getUserTransactionsRepository,
    walletRepository,
} from "../infra/repositories"
import {
    CreateTransactionUsecase,
    GetTransactionsUseCase,
    GetTransactionUsecase,
} from "./transactions"
import { GetProfileUsecase, GetUserTransactionsUsecase } from "./users"

const createTransaction = CreateTransactionUsecase.create(
    getUserRepository,
    walletRepository,
    createTransactionRepository,
    authService
)

const getTransactions = GetTransactionsUseCase.create(getTransactionsRepository)

const getProfile = GetProfileUsecase.create(getUserRepository)

const getUserTransactions = GetUserTransactionsUsecase.create(
    getUserTransactionsRepository
)

const getTransaction = GetTransactionUsecase.create(getTransactionRepository)

export {
    createTransaction,
    getTransactions,
    getProfile,
    getUserTransactions,
    getTransaction,
}
