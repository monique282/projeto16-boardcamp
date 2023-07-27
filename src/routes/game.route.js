import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import { gameTable } from "../schemas/game.schema.js";

const authRouter = Router();

authRouter.get("/games", validateSchema(gameTable));


export default authRouter;