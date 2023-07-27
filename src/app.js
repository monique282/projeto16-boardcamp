import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToDatabase } from "./database/db.js";
import router from "./routes/indexRoutes.js";

/* API configuration*/
dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
app.use(cors());
app.use(router)

/* Entrypoints (rotas) */
app.use(router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));