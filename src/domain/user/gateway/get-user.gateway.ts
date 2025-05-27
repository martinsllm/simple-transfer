import { User } from "../entity/user"

export interface GetUserGateway {
    getById(id: number): Promise<User>
}
