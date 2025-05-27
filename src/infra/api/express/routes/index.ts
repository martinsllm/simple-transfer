import {
    createTransaction,
    getProfile,
    getTransaction,
    getTransactions,
    getUserTransactions,
} from "../../../../usecases"
import {
    CreateTransactionRoute,
    GetTransactionRoute,
    GetTransactionsRoute,
} from "./transactions"
import { GetProfileRoute, GetUserTransactionsRoute } from "./users"

const createTransactionRoute = CreateTransactionRoute.create(createTransaction)

const getTransactionsRoute = GetTransactionsRoute.create(getTransactions)

const getProfileRoute = GetProfileRoute.create(getProfile)

const getUserTransactionsRoute =
    GetUserTransactionsRoute.create(getUserTransactions)

const getTransactionRoute = GetTransactionRoute.create(getTransaction)

const routes = [
    createTransactionRoute,
    getTransactionsRoute,
    getProfileRoute,
    getUserTransactionsRoute,
    getTransactionRoute,
]

export default routes
