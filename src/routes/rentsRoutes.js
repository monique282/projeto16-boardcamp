import { Router } from "express";

import { rentsGet, rentsPost, rentsPostID } from "../controllers/controlRents.js";


const rentsRouter = Router();

rentsRouter.get("/rentals", rentsGet);
rentsRouter.post("/rentals", rentsPost);
rentsRouter.post("/rentals/:id/return", rentsPostID);


export default rentsRouter;