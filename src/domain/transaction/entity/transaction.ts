export type TransactionProps = {
    id: string
    value: number
    payerId: number
    receiverId: number
    data: Date
}

export class Transaction {
    private constructor(private props: TransactionProps) {}

    public static create(props: Omit<TransactionProps, "id" | "data">) {
        return new Transaction({
            id: crypto.randomUUID().toString(),
            value: props.value,
            payerId: props.payerId,
            receiverId: props.receiverId,
            data: new Date(),
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
}
