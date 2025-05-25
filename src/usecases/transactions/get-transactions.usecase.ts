import { Transaction } from "../../domain/transaction/entity/transaction"
import { TransactionGateway } from "../../domain/transaction/gateway/transaction.gateway"
import { UserPropsOmit } from "../../domain/user/entity/user"
import { Usecase } from "../usecase"

export type GetTransactionsInputDto = void

export type GetTransactionOutputDto = {
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
    implements Usecase<GetTransactionsInputDto, GetTransactionOutputDto>
{
    private constructor(
        private readonly transactionGateway: TransactionGateway
    ) {}

    public static create(transactionGateway: TransactionGateway) {
        return new GetTransactionsUseCase(transactionGateway)
    }

    public async execute(
        input: GetTransactionsInputDto
    ): Promise<GetTransactionOutputDto> {
        const transactions = await this.transactionGateway.getTransactions()

        const output = this.presentOutput(transactions)

        return output
    }

    private presentOutput(
        transactions: Transaction[]
    ): GetTransactionOutputDto {
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
