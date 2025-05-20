export type WalletProps = {
    id: number
    balance: number
    userId: number
}

export class Wallet {
    private constructor(private props: WalletProps) {}

    public static with(props: WalletProps) {
        return new Wallet(props)
    }

    public get id() {
        return this.props.id
    }

    public get balance() {
        return this.props.balance
    }

    public get userId() {
        return this.props.userId
    }
}
