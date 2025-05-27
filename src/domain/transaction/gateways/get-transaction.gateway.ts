import { Transaction } from "../entity/transaction"

export interface GetTransactionGateway {
    getTransaction(id: string): Promise<Transaction>
}
