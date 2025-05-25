import { UserProps, UserPropsOmit } from "../../user/entity/user"

export type TransactionProps = {
    id: string
    value: number
    payerId: number
    receiverId: number
    createdAt: Date
    payer?: UserPropsOmit
    receiver?: UserPropsOmit
}

export class Transaction {
    private constructor(private props: TransactionProps) {}

    public static create(props: Omit<TransactionProps, "id" | "createdAt">) {
        return new Transaction({
            id: crypto.randomUUID().toString(),
            value: props.value,
            payerId: props.payerId,
            receiverId: props.receiverId,
            createdAt: new Date(),
        })
    }

    public static with(props: TransactionProps) {
        return new Transaction(props)
    }

    public get id() {
        return this.props.id
    }

    public get value() {
        return this.props.value
    }

    public get payerId() {
        return this.props.payerId
    }

    public get receiverId() {
        return this.props.receiverId
    }

    public get createdAt() {
        return this.props.createdAt
    }

    public get payer() {
        return this.props.payer
    }

    public get receiver() {
        return this.props.receiver
    }
}
