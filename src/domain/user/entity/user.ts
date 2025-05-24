import { WalletProps } from "../../wallet/entity/wallet"

export type UserProps = {
    id: number
    name: string
    cpf: string
    email: string
    password: string
    role: string
    wallet?: WalletProps | null
}

export class User {
    private constructor(private props: UserProps) {}

    public static with(props: UserProps) {
        return new User(props)
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get cpf() {
        return this.props.cpf
    }

    public get email() {
        return this.props.email
    }

    public get password() {
        return this.props.password
    }

    public get role() {
        return this.props.role
    }

    public get wallet() {
        return this.props.wallet
    }
}
