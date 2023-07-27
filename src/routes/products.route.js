import useRouter from "express";
import { createProduct, getProductById, getProducts } from "../controllers/products.controller.js";

import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/products.schema.js";
import { validateProductID } from "../middlewares/validateProductID.js";

const productsRouter = useRouter();
productsRouter.use(validateToken);

productsRouter.post("/create-product", validateSchema(productSchema), createProduct);
productsRouter.get("/home", getProducts);
productsRouter.get("/product-page/:id", validateProductID, getProductById);

export default productsRouter;