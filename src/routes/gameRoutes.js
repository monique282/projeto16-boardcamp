import { Router } from "express";
import { gameGet } from "../controllers/controlGame.js";


const gameRouter = Router();

gameRouter.get("/games", gameGet);


export default gameRouter;