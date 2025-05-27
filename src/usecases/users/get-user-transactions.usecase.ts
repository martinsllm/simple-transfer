import { Transaction } from "../../domain/transaction/entity/transaction"
import { UserPropsOmit } from "../../domain/user/entity/user"
import { UserGateway } from "../../domain/user/gateway/user.gateway"
import { Usecase } from "../usecase"

export type GetUserTransactionsInput = {
    id: number
}

export type GetUserTransactionsOutput = {
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
    implements Usecase<GetUserTransactionsInput, GetUserTransactionsOutput>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new GetUserTransactionsUsecase(userGateway)
    }

    public async execute(
        input: GetUserTransactionsInput
    ): Promise<GetUserTransactionsOutput> {
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
