import { Router } from "express";

import { rentsGet } from "../controllers/controlRents.js";


const rentsRouter = Router();

rentsRouter.get("/rentals", rentsGet);


export default rentsRouter;