import { Transaction } from "../../domain/transaction/entity/transaction"
import { TransactionGateway } from "../../domain/transaction/gateway/transaction.gateway"
import { User } from "../../domain/user/entity/user"
import { UserGateway } from "../../domain/user/gateway/user.gateway"
import { BadRequestError } from "../../infra/api/middlewares/errors/helpers/api-errors"
import { AuthorizarionApi } from "../../infra/services/authorization.api"
import { Usecase } from "../usecase"

export type TransactionInputDto = {
    payerId: number
    receiverId: number
    value: number
}

export type TransactionOutputDto = {
    id: string
}

export class CreateTransactionUsecase
    implements Usecase<TransactionInputDto, TransactionOutputDto>
{
    private constructor(
        private readonly userGateway: UserGateway,
        private readonly transactionGateway: TransactionGateway,
        private readonly authService: AuthorizarionApi
    ) {}

    public static create(
        userGateway: UserGateway,
        transactionGateway: TransactionGateway,
        authService: AuthorizarionApi
    ) {
        return new CreateTransactionUsecase(
            userGateway,
            transactionGateway,
            authService
        )
    }

    public async execute(
        input: TransactionInputDto
    ): Promise<TransactionOutputDto> {
        const payer = await this.userGateway.getById(input.payerId)
        const receiver = await this.userGateway.getById(input.receiverId)

        this.validateStorePayer(payer)
        this.validatePayerBalance(payer, input.value)
        await this.validateTransfer()

        const transaction = Transaction.create(input)

        await this.transactionGateway.save(transaction)

        const output = this.presentOutput(transaction)

        return output
    }

    private validateStorePayer(user: User) {
        if (user.role == "SHOPKEEPER")
            throw new BadRequestError("Transfer not authorized for this user!")
    }

    private validatePayerBalance(user: User, value: number) {
        if (user.wallet) {
            if (user.wallet.balance < value)
                throw new BadRequestError("Insufficiente Balance")
        }
    }

    private async validateTransfer() {
        const success = await this.authService.validateTransfer()
        if (!success)
            throw new BadRequestError("Transfer not authorized by api")
    }

    private presentOutput(data: Transaction): TransactionOutputDto {
        const output: TransactionOutputDto = {
            id: data.id,
        }

        return output
    }
}
