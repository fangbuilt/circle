import "reflect-metadata"
import { DataSource } from "typeorm"
import { Thread } from "./entities/ThreadsEntity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Engkar.K@12",
    database: "db_circle",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
