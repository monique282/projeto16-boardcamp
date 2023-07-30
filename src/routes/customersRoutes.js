import { Router } from "express";
import { customersGet, customersGetId, customersPost, customersPut } from "../controllers/controlCustomers.js";
import { customersTable } from "../schemas/customersSchema.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";

const customerRouter = Router();

customerRouter.get("/customers", customersGet);
customerRouter.get("/customers/:id", customersGetId);
customerRouter.post("/customers", validateJoiForAll(customersTable), customersPost);
customerRouter.put("/customers/:id", validateJoiForAll(customersTable), customersPut);

export default customerRouter;