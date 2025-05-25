import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import {
    CreateTransactionUsecase,
    TransactionInputDto,
    TransactionOutputDto,
} from "../../../../../usecases/transactions"

export type TransactionResponseDto = {
    id: string
}

export class CreateTransactionRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly transactionService: CreateTransactionUsecase
    ) {}

    public static create(transactionService: CreateTransactionUsecase) {
        return new CreateTransactionRoute(
            "/transaction",
            HttpMethod.POST,
            transactionService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { payerId, receiverId, value } = req.body

            const input: TransactionInputDto = {
                payerId,
                receiverId,
                value,
            }

            const output: TransactionResponseDto =
                await this.transactionService.execute(input)

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

    private present(input: TransactionOutputDto): TransactionResponseDto {
        const response = { id: input.id }
        return response
    }
}
