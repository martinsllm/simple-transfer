export interface Authorization {
    validateTransfer(): Promise<boolean>
}

export class AuthorizarionApi implements Authorization {
    private constructor() {}

    public static create() {
        return new AuthorizarionApi()
    }

    public async validateTransfer(): Promise<boolean> {
        const response = await fetch("https://util.devi.tools/api/v2/authorize")

        if (response.ok) return true

        return false
    }
}
