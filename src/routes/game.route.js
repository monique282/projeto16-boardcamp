import { Router } from "express";
import { game } from "../controllers/controlGame.js";

const gameRouter = Router();

gameRouter.get("/games", game);


export default gameRouter;