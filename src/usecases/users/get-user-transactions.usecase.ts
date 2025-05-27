import { Transaction } from "../../domain/transaction/entity/transaction"
import { UserPropsOmit } from "../../domain/user/entity/user"
import { GetUserTransactionsGateway } from "../../domain/user/gateway/get-user-transactions"
import { Usecase } from "../usecase"

export type GetUserTransactionsInputDto = {
    id: number
}

export type GetUserTransactionsOutputDto = {
    transactions: {
        transactionsReceived: {
            id: string
            value: number
            payer?: UserPropsOmit
        }[]
        transactionsSent: {
            id: string
            value: number
            receiver?: UserPropsOmit
        }[]
    }
}

export class GetUserTransactionsUsecase
    implements
        Usecase<GetUserTransactionsInputDto, GetUserTransactionsOutputDto>
{
    private constructor(
        private readonly userGateway: GetUserTransactionsGateway
    ) {}

    public static create(userGateway: GetUserTransactionsGateway) {
        return new GetUserTransactionsUsecase(userGateway)
    }

    public async execute(
        input: GetUserTransactionsInputDto
    ): Promise<GetUserTransactionsOutputDto> {
        const transactions = await this.userGateway.getUserTransactions(
            input.id
        )

        const output = this.presentOutput(transactions)

        return output
    }

    private presentOutput(transactions: Transaction[][]) {
        return {
            transactions: {
                transactionsReceived: transactions[0].map((t) => {
                    return {
                        id: t.id,
                        value: t.value,
                        payer: t.payer,
                    }
                }),
                transactionsSent: transactions[1].map((t) => {
                    return {
                        id: t.id,
                        value: t.value,
                        receiver: t.receiver,
                    }
                }),
            },
        }
    }
}
