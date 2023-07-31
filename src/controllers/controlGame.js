// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em gameRoutes

import { db } from "../database/db.js";

// essa função aqui é enviado por um get para pegar a lista de jogos
export async function gameGet(req, res) {

    // pegando os dados por query
    const { name, offset, limit } = req.query;

    try {

        let query = 'SELECT * FROM games';
        const queryParams = [];

        // Verificando os parâmetros enviados pela query são validos
        // verificando se name é valido
        if (typeof name !== 'undefined' && name !== '') {
            queryParams.push(`${name}%`);
            query += ' WHERE name LIKE $1';
        };

        // verificando de offset é valido
        if (typeof offset !== 'undefined' && offset !== '') {
            queryParams.push(offset);
            if (queryParams.length === 1) {
                query += ' OFFSET $1';
            } else {
                query += ' AND OFFSET $2';
            }
        };

        //verificando se limit é valido
        if (typeof limit !== 'undefined' && limit !== '') {
            queryParams.push(limit);
            if (queryParams.length === 1) {
                query += ' LIMIT $1';
            } else
                if (queryParams.length === 2) {
                    query += ' AND LIMIT $2';
                } else {
                    query += ' AND LIMIT $3';
                }
        };

        const result = await db.query(query, queryParams);
        const gameRequest = result.rows;
        res.send(gameRequest);
    } catch (err) {
        res.status(500).send(err.message);
    };
};

// essa função aqui é enviado por um post para enviar uma lista de jogos
export async function gamePost(req, res) {

    // pegar os dados que a pessoa colocou na tela de cadastro
    const { name, image, stockTotal, pricePerDay } = req.body;

    try {
        // pegando toda a lista de jogos
        const listGames = await db.query(`
        SELECT * FROM games;
        `);

        // verificar se o nome ja foi cadastrado
        let nameExists = false;
        listGames.rows.forEach(game => {
            if (game.name === name) {
                nameExists = true;
                return;
            };
        });

        if (nameExists) {
            return res.sendStatus(409);
        };

        const insertGame = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay") VAlUES ($1, $2, $3, $4);
            ` , [name, image, stockTotal, pricePerDay]);
        return res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    };
};