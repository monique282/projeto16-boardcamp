// esse arquivo serve pra chamar as rotas, usando as funções que estao dentro da pasta controllers o que eu quero
// lebrando que essa pasta vai ser enviada para a pasta indexRoutes

import { Router } from "express";
import { gameGet, gamePost } from "../controllers/controlGame.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";
import { gameTable } from "../schemas/gameSchema.js";

const gameRouter = Router();

gameRouter.get("/games", gameGet);
gameRouter.post("/games", validateJoiForAll(gameTable), gamePost)

export default gameRouter;