import { Transaction } from "../../transaction/entity/transaction"

export interface GetUserTransactionsGateway {
    getUserTransactions(id: number): Promise<Transaction[][]>
}
