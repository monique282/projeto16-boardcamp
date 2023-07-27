// esse arquivo serve pra unir todos que eu estou escrevendo Rotas que esta dentro de Routes
// lebrando que todas as Rotas aqui vai pro app

import { Router } from "express";
import authRouter from "./auth.route.js";
import productsRouter from "./products.route.js";
import shoppingCartRouter from "./shoppingCart.route.js";

const router = Router()

router.use([
    authRouter, 
    productsRouter,
    shoppingCartRouter
]);

export default router;
