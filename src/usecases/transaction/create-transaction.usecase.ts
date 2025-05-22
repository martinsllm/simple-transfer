import { User } from "../../domain/user/entity/user"
import { UserGateway } from "../../domain/user/gateway/user.gateway"
import { AuthorizarionApi } from "../../infra/services/authorization.api"
import { Usecase } from "../usecase"

export type TransactionInputDto = {
    payerId: number
    receiverId: number
    value: number
}

export type TransactionOutputDto = void

export class CreateTransactionUsecase
    implements Usecase<TransactionInputDto, TransactionOutputDto>
{
    private constructor(
        private readonly userGateway: UserGateway,
        private readonly authService: AuthorizarionApi
    ) {}

    public static create(
        userGateway: UserGateway,
        authService: AuthorizarionApi
    ) {
        return new CreateTransactionUsecase(userGateway, authService)
    }

    public async execute(
        input: TransactionInputDto
    ): Promise<TransactionOutputDto> {
        const payer = await this.userGateway.getById(input.payerId)
        const receiver = await this.userGateway.getById(input.receiverId)

        this.validateStorePayer(payer)
        this.validatePayerBalance(payer, input.value)
        await this.validateTransfer()

        console.log(receiver)
    }

    private validateStorePayer(user: User) {
        if (user.role == "SHOPKEEPER")
            throw new Error("Transfer not authorized for this user!")
    }

    private validatePayerBalance(user: User, value: number) {
        if (user.wallet) {
            if (user.wallet.balance < value)
                throw new Error("Insufficiente Balance")
        }
    }

    private async validateTransfer() {
        const success = await this.authService.validateTransfer()
        if (!success) throw new Error("Transfer not authorized by api")
    }
}
