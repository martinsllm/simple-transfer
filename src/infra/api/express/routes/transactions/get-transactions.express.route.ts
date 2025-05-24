import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import {
    GetTransactionOutputDto,
    GetTransactionsUseCase,
} from "../../../../../usecases/transaction/"
import { UserProps } from "../../../../../domain/user/entity/user"

export type GetTransactionsResponseDto = {
    transactions: {
        id: string
        payerId: number
        receiverId: number
        value: number
        createdAt: Date
        payer?: UserProps
        receiver?: UserProps
    }[]
}

export class GetTransactionsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly transactionService: GetTransactionsUseCase
    ) {}

    public static create(transactionService: GetTransactionsUseCase) {
        return new GetTransactionsRoute(
            "/transactions",
            HttpMethod.GET,
            transactionService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const output = await this.transactionService.execute()

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

    private present(input: GetTransactionOutputDto): GetTransactionOutputDto {
        const response: GetTransactionOutputDto = {
            transactions: input.transactions.map((t: any) => {
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

        return response
    }
}
