import { Kysely, MysqlDialect } from "kysely"
import { createPool } from "mysql2"
import { LegoDataBase } from "./schema"
import dotenv from 'dotenv'

dotenv.config()

export const db = new Kysely<LegoDataBase>({
    dialect: new MysqlDialect({
        pool: createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        })
    })
})