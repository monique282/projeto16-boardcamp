import { Router } from "express";

import { rentsDelete, rentsGet, rentsPost, rentsPostID } from "../controllers/controlRents.js";


const rentsRouter = Router();

rentsRouter.get("/rentals", rentsGet);
rentsRouter.post("/rentals", rentsPost);
rentsRouter.post("/rentals/:id/return", rentsPostID);
rentsRouter.delete("/rentals/:id", rentsDelete);

export default rentsRouter;