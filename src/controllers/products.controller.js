import db from "../database/db.js";
import dayjs from "dayjs";

export const createProduct = async (req, res) => {

    const { userID } = res.locals.session;

    try {

        const newProduct = {

            ...res.locals.data,
            userID: userID,
            day: dayjs().locale('pt-br').format('DD/MM')
        }

        await db.collection("products").insertOne(newProduct);
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getProducts = async (req, res) => {

    const { limit } = req.query;
    const numLimit = Number(limit);

    if (limit !== undefined && (numLimit <= 0 || isNaN(numLimit))) {
        return res.sendStatus(422)
    }

    try {

        const offset = 20;
        let nextOffset;

        if (limit) {

            const totalProducts = await db.collection("products").countDocuments();
            const nextLimit = (numLimit + 1) * offset;
            nextOffset = (nextLimit >= totalProducts) ? 0 : nextLimit;
        }

        const products = await db.collection("products")
            .find()
            .sort({ $natural: -1 })
            .limit(limit === undefined ? offset : nextOffset)
            .toArray()

        res.send(products);
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getProductById = async (req, res) => {

    const { productID } = res.locals;

    console.log(productID);

    try {

        const product = await db.collection("products").findOne({ _id: productID });
        res.send(product);

    } catch (err) {
        res.status(500).send(err.message);
    }
}