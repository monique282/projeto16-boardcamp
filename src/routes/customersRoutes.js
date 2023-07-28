import { Router } from "express";
import { customersGet, customersGetId, customersPost } from "../controllers/controlCustomers.js";



const customerRouter = Router();

customerRouter.get("/customers", customersGet);
customerRouter.get("/customers/:id", customersGetId);
customerRouter.post("/customers", customersPost);


export default customerRouter;