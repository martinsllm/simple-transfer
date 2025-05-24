import { Wallet } from "../entity/wallet"

export interface WalletGateway {
    getByUserId(userId: number): Promise<Wallet>
    updateBalance(userId: number, data: Wallet): Promise<void>
}
