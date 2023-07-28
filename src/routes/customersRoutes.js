import { Router } from "express";
import { customersGet, customersGetId, customersPost } from "../controllers/controlCustomers.js";
import { customersTable } from "../schemas/customersSchema.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";



const customerRouter = Router();

customerRouter.get("/customers", customersGet);
customerRouter.get("/customers/:id", customersGetId);
customerRouter.post("/customers", validateJoiForAll(customersTable), customersPost);


export default customerRouter;