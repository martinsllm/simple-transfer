import { Transaction } from "../../transaction/entity/transaction"
import { User } from "../entity/user"

export interface UserGateway {
    getById(id: number): Promise<User>
    getUserTransactions(id: number): Promise<Transaction[][]>
}
