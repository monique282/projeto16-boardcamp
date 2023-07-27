// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em customersRoutes

import { db } from "../database/db.js";

// esse arquivo aqui é enviado por um get para pegar a lista de jogos
export async function customersGet(req, res) {
    try {

        const customersRequest = await db.query(`SELECT * FROM customers;`)
        res.send(customersRequest);
    } catch (err) {
        res.status(500).send(err.message)
    }

}
