// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em customersRoutes

import { db } from "../database/db.js";

// essa função aqui é enviado por um get para pegar a lista de clientes
export async function customersGet(req, res) {
    try {

        const customersRequest = await db.query(`SELECT * FROM customers;`)
        res.send(customersRequest);
    } catch (err) {
        res.status(500).send(err.message)
    }

}

// essa função aqui é enviado por um get para pegar a lista de clientes pelo id

export async function customersGetId(req, res) {
    const { id } = req.params;

    try {

        const CustomersRequestByid = await db.query(
            `SELECT * FROM customers WHERE id=$1;`, [id])
        res.send(CustomersRequestByid);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// essa função aqui é enviado por um post para crir a lista de cliente

export async function customersPost(req, res) {
    // pegar os dados que a pessoa colocou na tela de cadastro de cliente
    const { name, phone, cpf, birthday } = req.body;

    try {
        // pegando toda a lista de jogos
        const listGames = await db.query(`
        SELECT * FROM games
        `)
        // verificar se o nome ja foi cadastrado
        let nameExists = false;
        listGames.rows.forEach(game => {
            if (game.name === name) {
                nameExists = true;
                return;
            }
        });
        if (nameExists) {
            return res.sendStatus(409);
        }
        const insertGame = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay") VAlUES ($1, $2, $3, $4);
            ` , [name, image, stockTotal, pricePerDay]);
            return res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message)

    }
}
