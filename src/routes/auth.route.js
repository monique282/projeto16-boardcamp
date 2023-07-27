import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/", validateSchema(signInSchema), login);
authRouter.post("/cadastro", validateSchema(signUpSchema), register);

export default authRouter;