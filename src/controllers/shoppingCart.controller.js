import db from "../database/db.js";

export const getProducts = async (req, res) => {

    const { userID } = res.locals.session;

    try {

        const shoppingCart = await db.collection("shoppingCart").find({ userID }).toArray();
        res.send(shoppingCart);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const addProduct = async (req, res) => {

    const { userID } = res.locals.session;
    const { product, shoppingCart, productID } = res.locals;

    if (shoppingCart) {
        return res.status(409).send("Este produto já está no carrinho de compras!");
    }

    if (product.quantity <= 0) {
        return res.status(401).send("Este produto não está mais disponível!");
    }

    try {

        await db.collection("products").updateOne({ _id: productID }, { $inc: { quantity: -1} });

        delete product._id;
        delete product.userID;
        delete product.quantity;

        const newProductData = { ...product, productID, userID };

        await db.collection("shoppingCart").insertOne({...newProductData});
        delete newProductData.userID;

        res.send({...newProductData});

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const deleteProduct = async (req, res) => {

    const { shoppingCart, productID } = res.locals;

    if (!shoppingCart) {
        return res.status(403).send("Este produto não está no carrinho de compras!");
    }

    try {

        await db.collection("products").updateOne({ _id: productID }, { $inc: { quantity: 1} });
        await db.collection("shoppingCart").deleteOne({ userID: shoppingCart.userID, productID });

        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
}