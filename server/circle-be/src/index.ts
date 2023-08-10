import * as express from "express"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import router from "./route"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const port = 5001

        app.use(express.json())
        app.use("/api/v1", router)

        app.get("/", (req: Request, res: Response) => {
            res.send("Hello World!")
        })

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
    .catch((error) => console.log(error))