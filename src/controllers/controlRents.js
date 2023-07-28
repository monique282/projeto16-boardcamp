// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em rentsRoutes

import { db } from "../database/db.js";
import dayjs from 'dayjs';


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
    const { customerId, gameId, daysRented } = req.body;

    try {

        // vamos ver se customerId é de um cliente cadastrado
        // pegando a lista de clientes
        const resultCustomers = await db.query(
            `SELECT * FROM customers;`);
        // verificar de o valor fornecido de customerId existe no resultCustomers
        let customerIdExiste = false;
        resultCustomers.rows.forEach(item => {
            if (item._id === customerId) {
                customerIdExiste = true;
                return;
            }
        });
        if (customerIdExiste) {
            return res.sendStatus(409);
        }

        // vamos ver se gameId é de um jogo cadastrado
        // pegando a lista de jogos
        const resultGames = await db.query(
            `SELECT * FROM games;`);
        // verificar de o valor fornecido de gameId existe no resultGames
        let gamesIdExiste = false;
        resultGames.rows.forEach(item => {
            if (item._id === gameId) {
                gamesIdExiste = true;
                return;
            }
        });
        if (gamesIdExiste) {
            return res.sendStatus(409);
        }

        // verificar se daysRented é maior que 0
        if (daysRented <= 0) {
            return res.sendStatus(400);
        }
        // enviar a data atual no rendDate
        const rentDate = dayjs().format('DD/MM/AAAA');
       
        // pegar a dada de quando foi devolvido na rota de finalizar pedido
        const returnDate = null;

        // se tivertudo certo enviar para o Api
        const insertRentals = await db.query(`
            INSERT INTO rentals (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee) VAlUES ($1, $2, $3, $4);
            ` , [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);

    
        return res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message)

    }
}
