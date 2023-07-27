import useRouter from "express";
import { getProducts, addProduct, deleteProduct } from "../controllers/shoppingCart.controller.js";

import { validateToken } from "../middlewares/validateToken.js";
import { validateProductID } from "../middlewares/validateProductID.js";

const shoppingCartRouter = useRouter();
shoppingCartRouter.use(validateToken);

shoppingCartRouter.get("/cart-info", getProducts);
shoppingCartRouter.post("/product-page/:id/buy", validateProductID, addProduct);
shoppingCartRouter.delete("/cart-info/:id/delete", validateProductID, deleteProduct);

export default shoppingCartRouter;