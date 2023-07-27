import db from "../database/db.js";

export const validateToken = async (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const sessionDB = await db.collection("sessions").findOne({ token });
        if (!sessionDB) {
            return res.sendStatus(401);
        }

        res.locals.session = sessionDB;
        next();

    } catch (err) {
        return res.status(500).send(err.message);
    }
}
