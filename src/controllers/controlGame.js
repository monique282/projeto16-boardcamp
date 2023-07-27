import { db } from "../database/db.js";

export async function game(req, res) {
    try {

        const gameRequest = await db.query(`SELECT * FROM games;`)
        res.send(gameRequest);
    } catch (err) {
        res.status(500).send(err.message)
    }

}