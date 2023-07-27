import { ObjectId } from "mongodb";
import db from "../database/db.js";

export const validateProductID = async (req, res, next) => {

    const { userID } = res.locals.session;

    let productID = req.params;
    productID = new ObjectId(productID);

    try {
        const product = await db.collection("products").findOne({ _id: productID });
        if (!product) {
            return res.sendStatus(404);
        }

        const shoppingCart = await db.collection("shoppingCart").findOne({ userID, productID });

        res.locals.product = product;
        res.locals.shoppingCart = shoppingCart;
        res.locals.productID = productID;

        next();

    } catch (err) {
        res.status(500).send(err.message);
    }
}