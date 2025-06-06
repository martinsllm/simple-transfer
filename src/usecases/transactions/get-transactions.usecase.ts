import { Transaction } from "../../domain/transaction/entity/transaction"
import { GetTransactionsGateway } from "../../domain/transaction/gateways/get-transactions.gateway"
import { UserPropsOmit } from "../../domain/user/entity/user"
import { Usecase } from "../usecase"

export type GetTransactionsInputDto = void

export type GetTransactionsOutputDto = {
    transactions: {
        id: string
        payerId: number
        receiverId: number
        value: number
        createdAt: Date
        payer?: UserPropsOmit
        receiver?: UserPropsOmit
    }[]
}

export class GetTransactionsUseCase
    implements Usecase<GetTransactionsInputDto, GetTransactionsOutputDto>
{
    private constructor(
        private readonly transactionGateway: GetTransactionsGateway
    ) {}

    public static create(transactionGateway: GetTransactionsGateway) {
        return new GetTransactionsUseCase(transactionGateway)
    }

    public async execute(
        input: GetTransactionsInputDto
    ): Promise<GetTransactionsOutputDto> {
        const transactions = await this.transactionGateway.getTransactions()

        const output = this.presentOutput(transactions)

        return output
    }

    private presentOutput(
        transactions: Transaction[]
    ): GetTransactionsOutputDto {
        return {
            transactions: transactions.map((t) => {
                return {
                    id: t.id,
                    payerId: t.payerId,
                    receiverId: t.receiverId,
                    value: t.value,
                    createdAt: t.createdAt,
                    payer: t.payer,
                    receiver: t.receiver,
                }
            }),
        }
    }
}
