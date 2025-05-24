import { Transaction } from "../entity/transaction"

export interface TransactionGateway {
    save(data: Transaction): Promise<void>
    getTransactions(): Promise<Transaction[]>
}
