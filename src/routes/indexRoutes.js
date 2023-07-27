// esse arquivo serve pra unir todos que eu estou escrevendo Rotas que esta dentro de Routes
// lebrando que todas as Rotas aqui vai pro app

import { Router } from "express";
import gameRouter from "./game.route.js";

const router = Router()

router.use([
    gameRouter
]);

export default router;
