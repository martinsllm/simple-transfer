import { PrismaClient } from "@prisma/client"
import { UserGateway } from "../../../domain/user/gateway/user.gateway"
import { User, UserProps } from "../../../domain/user/entity/user"

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient)
    }

    public async getById(id: number): Promise<User> {
        const user = await this.prismaClient.user.findFirst({
            where: {
                id,
            },
        })

        if (!user) throw new Error("User Not Found")

        const userData = this.present(user)
        return userData
    }

    private present(user: UserProps): User {
        const userData = User.with({
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
            role: user.role,
        })

        return userData
    }
}
