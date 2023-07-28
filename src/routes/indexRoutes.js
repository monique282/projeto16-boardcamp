// esse arquivo serve pra unir todos que eu estou escrevendo Rotas que esta dentro de Routes
// lebrando que todas as Rotas aqui vai pro app

import { Router } from "express";
import gameRouter from "./gameRoutes.js";
import customerRouter from "./customersRoutes.js";
import rentsRouter from "./rentsRoutes.js";

const router = Router()

router.use([
    // rota para os jogos
    gameRouter,
    // rota para os clientes
    customerRouter,
    // rota para os alugueis
    rentsRouter
]);

export default router;
