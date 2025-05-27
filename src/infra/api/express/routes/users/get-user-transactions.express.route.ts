import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import {
    GetUserTransactionsInput,
    GetUserTransactionsOutput,
    GetUserTransactionsUsecase,
} from "../../../../../usecases/users"

export type GetUserTransactionsResponse = GetUserTransactionsOutput

export class GetUserTransactionsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly transactionService: GetUserTransactionsUsecase
    ) {}

    public static create(transactionService: GetUserTransactionsUsecase) {
        return new GetUserTransactionsRoute(
            "/user/transactions/:id",
            HttpMethod.GET,
            transactionService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { id } = req.params

            const id_num = Number(id)

            const input: GetUserTransactionsInput = {
                id: id_num,
            }

            const output = await this.transactionService.execute(input)

            const responseBody = this.present(output)

            res.status(201).json(responseBody).send()
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(
        input: GetUserTransactionsOutput
    ): GetUserTransactionsResponse {
        const response: GetUserTransactionsOutput = {
            transactions: {
                transactionsReceived:
                    input.transactions.transactionsReceived.map((t: any) => {
                        return {
                            id: t.id,
                            value: t.value,
                            payer: t.payer,
                        }
                    }),
                transactionsSent: input.transactions.transactionsSent.map(
                    (t) => {
                        return {
                            id: t.id,
                            value: t.value,
                            receiver: t.receiver,
                        }
                    }
                ),
            },
        }

        return response
    }
}
