import { Router } from "express";

import { rentsGet, rentsPost } from "../controllers/controlRents.js";


const rentsRouter = Router();

rentsRouter.get("/rentals", rentsGet);
rentsRouter.post("/rentals", rentsPost);

export default rentsRouter;