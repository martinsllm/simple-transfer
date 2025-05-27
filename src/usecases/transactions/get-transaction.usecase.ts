import { Transaction } from "../../domain/transaction/entity/transaction"
import { GetTransactionGateway } from "../../domain/transaction/gateways/get-transaction.gateway"
import { UserPropsOmit } from "../../domain/user/entity/user"
import { Usecase } from "../usecase"

export type GetTransactionInputDto = {
    id: string
}

export type GetTransactionOutputDto = {
    id: string
    payerId: number
    receiverId: number
    value: number
    createdAt: Date
    payer?: UserPropsOmit
    receiver?: UserPropsOmit
}

export class GetTransactionUsecase
    implements Usecase<GetTransactionInputDto, GetTransactionOutputDto>
{
    private constructor(
        private readonly transactionGateway: GetTransactionGateway
    ) {}

    public static create(transactionGateway: GetTransactionGateway) {
        return new GetTransactionUsecase(transactionGateway)
    }

    public async execute(
        input: GetTransactionInputDto
    ): Promise<GetTransactionOutputDto> {
        const transactions = await this.transactionGateway.getTransaction(
            input.id
        )

        const output = this.presentOutput(transactions)

        return output
    }

    private presentOutput(transaction: Transaction): GetTransactionOutputDto {
        return {
            id: transaction.id,
            payerId: transaction.payerId,
            receiverId: transaction.receiverId,
            value: transaction.value,
            createdAt: transaction.createdAt,
            payer: transaction.payer,
            receiver: transaction.receiver,
        }
    }
}
