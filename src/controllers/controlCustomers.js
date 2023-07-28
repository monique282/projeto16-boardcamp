// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em customersRoutes

import { db } from "../database/db.js";

// essa função aqui é enviado por um get para pegar a lista de clientes
export async function customersGet(req, res) {
    try {

        const result = await db.query(`SELECT * FROM customers;`);
        const customersRequest = result.rows;
        res.send(customersRequest);
    } catch (err) {
        res.status(500).send(err.message)
    }

}

// essa função aqui é enviado por um get para pegar a lista de clientes pelo id

export async function customersGetId(req, res) {
    const { id } = req.params;

    try {

        const result = await db.query(
            `SELECT * FROM customers WHERE id=$1;`, [id]);
        const CustomersRequestByid = result.rows;

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
        // pegando toda a lista de clientes
        const listCustomers = await db.query(`
        SELECT * FROM customers;
        `)
        // verificar se o cpf ja foi cadastrado
        let cpfExists = false;
        listCustomers.rows.forEach(customer => {
            if (customer.cpf === cpf) {
                cpfExists = true;
                return;
            }
        });
        if (cpfExists) {
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
