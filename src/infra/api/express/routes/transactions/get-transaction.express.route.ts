import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import {
    GetTransactionInputDto,
    GetTransactionOutputDto,
    GetTransactionUsecase,
} from "../../../../../usecases/transactions"

export type GetTransactionResponseDto = GetTransactionOutputDto

export class GetTransactionRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly transactionService: GetTransactionUsecase
    ) {}

    public static create(transactionService: GetTransactionUsecase) {
        return new GetTransactionRoute(
            "/transaction/:id",
            HttpMethod.GET,
            transactionService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { id } = req.params

            const input: GetTransactionInputDto = {
                id,
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

    private present(input: GetTransactionOutputDto): GetTransactionResponseDto {
        const response: GetTransactionResponseDto = {
            id: input.id,
            payerId: input.payerId,
            receiverId: input.receiverId,
            value: input.value,
            createdAt: input.createdAt,
            payer: input.payer,
            receiver: input.receiver,
        }

        return response
    }
}
