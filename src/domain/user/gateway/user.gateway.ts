import { User } from "../entity/user"

export interface UserGateway {
    getById(id: number): Promise<User>
}
