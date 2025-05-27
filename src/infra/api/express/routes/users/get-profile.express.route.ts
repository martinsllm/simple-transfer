import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import {
    GetProfileInputDto,
    GetProfileOutputDto,
    GetProfileUsecase,
} from "../../../../../usecases/users"

export type GetProfileResponseDto = GetProfileOutputDto

export class GetProfileRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly userService: GetProfileUsecase
    ) {}

    public static create(userService: GetProfileUsecase) {
        return new GetProfileRoute(
            "/user/profile/:id",
            HttpMethod.GET,
            userService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { id } = req.params

            const id_num = Number(id)

            const input: GetProfileInputDto = {
                id: id_num,
            }

            const output: GetProfileOutputDto = await this.userService.execute(
                input
            )

            const responseBody = this.present(output)

            res.json(responseBody).send()
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: GetProfileOutputDto): GetProfileResponseDto {
        const response: GetProfileResponseDto = {
            name: input.name,
            cpf: input.cpf,
            email: input.email,
            role: input.role,
            wallet: input.wallet,
        }

        return response
    }
}
