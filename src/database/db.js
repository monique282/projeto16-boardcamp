/* conectando o pg */
import pg, { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config()

const { Pool } = pg

const configDatabase = {
    connectionString:process.env.DATABASE_URL
}

const db = new Pool(configDatabase)