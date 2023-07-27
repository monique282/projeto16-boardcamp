import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/db.js";
import router from "./routes/indexRoutes.js";

/* API configuration*/
dotenv.config();
connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router)



const PORT = process.env.PORT || 5000;
// cerve pra deixar a aplicação ligada na porta escolhida
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));