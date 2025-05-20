import { User } from "../../domain/user/entity/user"
import { UserGateway } from "../../domain/user/gateway/user.gateway"
import { Usecase } from "../usecase"

export type TransactionInputDto = {
    payerId: number
    receiverId: number
}

export type TransactionOutputDto = void

export class CreateTransactionUsecase
    implements Usecase<TransactionInputDto, TransactionOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new CreateTransactionUsecase(userGateway)
    }

    public async execute(
        input: TransactionInputDto
    ): Promise<TransactionOutputDto> {
        const payer = await this.userGateway.getById(input.payerId)
        const receiver = await this.userGateway.getById(input.receiverId)

        this.validateStorePayer(payer)

        console.log(payer)
        console.log(receiver)
    }

    private validateStorePayer(user: User) {
        if (user.role == "SHOPKEEPER")
            throw new Error("Transaction not authorized for this user!")
    }
}
