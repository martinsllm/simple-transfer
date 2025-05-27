import { Transaction } from "../entity/transaction"

export interface CreateTransactionGateway {
    save(data: Transaction): Promise<void>
}
