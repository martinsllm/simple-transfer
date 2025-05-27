import { Transaction } from "../entity/transaction"

export interface GetTransactionsGateway {
    getTransactions(): Promise<Transaction[]>
}
