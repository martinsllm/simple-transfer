import { UserProps } from "../../domain/user/entity/user"
import { UserGateway } from "../../domain/user/gateway/user.gateway"
import { WalletProps } from "../../domain/wallet/entity/wallet"
import { Usecase } from "../usecase"

export type GetProfileInputDto = {
    id: number
}

export type GetProfileOutputDto = {
    name: string
    cpf: string
    email: string
    role: string
    wallet?: WalletProps | null
}

export class GetProfileUsecase
    implements Usecase<GetProfileInputDto, GetProfileOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new GetProfileUsecase(userGateway)
    }

    public async execute(
        input: GetProfileInputDto
    ): Promise<GetProfileOutputDto> {
        const user = await this.userGateway.getById(input.id)

        const output = this.presentOutput(user)

        return output
    }

    private presentOutput(user: UserProps): GetProfileOutputDto {
        return {
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            role: user.role,
            wallet: user.wallet,
        }
    }
}
