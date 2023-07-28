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

export async function rentsPost(req, res) {
    // pegar os dados que a pessoa colocou na tela de alugueis
    const { customerId, gameId, daysRented} = req.body;
    
    try {
        // pegando toda a lista de clientes
        const listCustomers = await db.query(`
        SELECT * FROM rents;
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
        // se tivertudo certo enviar para o Api
        const insertCustomers = await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday) VAlUES ($1, $2, $3, $4);
            ` , [name, phone, cpf, birthday]);
        return res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message)

    }
}
