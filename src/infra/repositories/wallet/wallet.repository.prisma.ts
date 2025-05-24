import { PrismaClient } from "@prisma/client"
import { WalletGateway } from "../../../domain/wallet/gateway/wallet.gateway"
import { Wallet, WalletProps } from "../../../domain/wallet/entity/wallet"
import { NotFoundError } from "../../api/middlewares/errors/helpers/api-errors"

export class WalletRepositoryPrisma implements WalletGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new WalletRepositoryPrisma(prismaClient)
    }

    public async getByUserId(userId: number): Promise<Wallet> {
        const wallet = await this.prismaClient.wallet.findFirst({
            where: {
                userId,
            },
        })

        if (!wallet) throw new NotFoundError("Wallet Not Found!")

        const walletData = this.present(wallet)

        return walletData
    }

    public async updateBalance(userId: number, data: Wallet): Promise<void> {
        await this.prismaClient.wallet.update({
            data: {
                balance: data.balance,
            },
            where: {
                userId,
            },
        })
    }

    private present(wallet: WalletProps): Wallet {
        const walletData = Wallet.with({
            id: wallet.id,
            balance: wallet.balance,
            userId: wallet.userId,
        })

        return walletData
    }
}
