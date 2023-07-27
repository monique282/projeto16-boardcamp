import { Router } from "express";
import { customersGet, customersGetId } from "../controllers/controlCustomers.js";



const customerRouter = Router();

customerRouter.get("/customers", customersGet);
customerRouter.get("/customers:id", customersGetId);


export default customerRouter;