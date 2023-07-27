import { Router } from "express";
import { customersGet } from "../controllers/controlCustomers.js";



const customerRouter = Router();

customerRouter.get("/customers", customersGet);


export default customerRouter;