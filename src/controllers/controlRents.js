// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em rentsRoutes

import { db } from "../database/db.js";

// essa função aqui é enviado por um get para pegar a lista de alugueis
export async function rentsGet(req, res) {
    try {
        const rentsRequest = await db.query(`SELECT * FROM rentals;`)
        res.send(rentsRequest);
    } catch (err) {
        res.status(500).send(err.message)
    }

}