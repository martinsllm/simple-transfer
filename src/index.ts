import { ApiExpress } from "./infra/api/express/api.express"
import routes from "./infra/api/express/routes"

function main() {
    const port = Number(process.env.PORT)

    const api = ApiExpress.create(routes)

    api.start(port)
}

main()
