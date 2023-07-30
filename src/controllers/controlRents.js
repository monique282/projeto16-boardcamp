// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em rentsRoutes

import { db } from "../database/db.js";
import dayjs from 'dayjs';


// essa função aqui é enviado por um get para pegar a lista de alugueis
export async function rentsGet(req, res) {
    try {
        const rentsRequest = await db.query(`SELECT rentals.* , 
        json_build_object('id', customers.id, 'name',customers.name) AS customer, 
        json_build_object('id', games.id, 'name',games.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;

        
        `)

        const updatedData = rentsRequest.rows.map(date => {
            if (date.returnDate !== null) {
                const dateCorretCrient = new Date(date.rentDate);
                const dateCorretGiveBack = new Date(date.returnDate);
                const formatDateCrient = dateCorretCrient.toISOString().split('T')[0];
                const formatDateGiveBack = dateCorretGiveBack.toISOString().split('T')[0];
                return {
                    ...date,
                    rentDate: formatDateCrient,
                    returnDate: formatDateGiveBack
                }
            }
            if (date.returnDate === null) {
                const dateCorretCrient = new Date(date.rentDate);
                const formatDateCrient = dateCorretCrient.toISOString().split('T')[0];
                return {
                    ...date,
                    rentDate: formatDateCrient

                }
            }

        });


        res.send(updatedData);

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
        let customerIdExiste = true;
        resultCustomers.rows.forEach(item => {
            if (parseInt(item.id) === parseInt(customerId)) {
                customerIdExiste = false;
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
        let gamesIdExiste = true;
        resultGames.rows.forEach(item => {
            if (parseInt(item.id) === parseInt(gameId)) {
                gamesIdExiste = false;
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
        const rentDate = dayjs().format('YYYY-MM-DD');

        // pegar a dada de quando foi devolvido na rota de finalizar pedido
        const returnDate = null;

        // pegando a lista de jogos
        const result = await db.query(`SELECT * FROM games WHERE id=$1;`, [parseInt(gameId)]);
        // salvando o valor do jogo pela quantidada de dias alugados
        const originalPrice = (result.rows[0].pricePerDay) * (parseInt(daysRented));

        // pegar a dada de quando foi devolvido na rota de finalizar pedido
        const delayFee = null;

        // verificar se tem quantidade disponivel de jogos pra poder alugar
        const resultRents = await db.query(
            `SELECT * FROM rentals;`);
        let i = 0;
        const isAvailable = resultRents.rows.map(item => {
            if (item.gameId && returnDate === null) {
                i++
            }
        });

        if (parseInt(i) >= parseInt(result.rows[0].stockTotal)) {
            return res.sendStatus(400);
        };


        // se tivertudo certo enviar para o Api
        const insertRentals = await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VAlUES ($1, $2, $3, $4, $5, $6, $7);
            ` , [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);


        return res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message)

    }
}

let Delay = 0;
function adicionarDias(deliveryDate, days, rentDate) {
    let initialDate = new Date(deliveryDate);

    // Somar os dias à data
    initialDate.setDate(initialDate.getDate() + days);

    // transformando em uma data valida
    const dateCorretCrient = new Date(initialDate);
    const formatDateCrient = dateCorretCrient.toISOString().split('T')[0];

    // tranformando as informação em data
    const dat1 = new Date(rentDate);
    const dat2 = new Date(formatDateCrient);

    // Calcular a diferença em milissegundos
    const differenceInMilliseconds = dat1 - dat2;

    // Converter a diferença de milissegundos para dias
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 dia tem 24 horas, 60 minutos, 60 segundos e 1000 milissegundos
    Delay = differenceInMilliseconds / millisecondsPerDay;


}

export async function rentsPostID(req, res) {
    // pegar os dados que a pessoa colocou na tela de alugueis
    const { id } = req.params;

    try {

        // verificar se o aluguel que a pessoa quer finalizar existe
        const resultCustomersId = await db.query(
            `SELECT * FROM rentals WHERE id = $1;`, [id]);
        if (resultCustomersId.rows.length === 0) {
            return res.sendStatus(404);
        }

        // vericando se o aluguel ja foi entregue
        if (resultCustomersId.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }

        // enviar a data atual no rendDate
        const rentDate = dayjs().format('YYYY-MM-DD');

        // tranformar a data vinda do servido em uma data valida
        // data de criação
        const dateCorretCrient = new Date(resultCustomersId.rows[0].rentDate);
        const formatDateCrient = dateCorretCrient.toISOString().split('T')[0];

        // chamando função que faz o claculo so atrado
        adicionarDias(formatDateCrient, resultCustomersId.rows[0].daysRented, rentDate)

        const delayFee = 0;

        // vendo se ha dias atrazados
        if (Delay > 0) {
            delayFee = Delay * (resultCustomersId.rows[0].originalPrice / resultCustomersId.rows[0].daysRented);
        }

        // se tudo estiver certo manda pra api
        const insertPutRents = await db.query(`
        UPDATE rentals SET "returnDate" = $1 , "delayFee" = $2 WHERE id = $3;
        ` , [rentDate, delayFee, id]);

        return res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message)

    }
}

export async function rentsDelete(req, res) {
    const { id } = req.params

    try {

        const resultIdDelete = await db.query(
            `SELECT * FROM rentals WHERE id = $1;`, [id]);

        // verificando de o id exixste
        if (resultIdDelete.rows.length === 0) {
            return res.sendStatus(404);
        }

        // vericando se o aluguel ja foi entregue
        if (resultIdDelete.rows[0].returnDate === null) {
            return res.sendStatus(400);
        }

        // se tudo der certo axclui da api
        const deleteOk = await db.query(
            ` DELETE FROM rentals WHERE id = $1`, [id]);



        return res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message)

    }


}