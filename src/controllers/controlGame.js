// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em gameRoutes

import { db } from "../database/db.js";

// essa função aqui é enviado por um get para pegar a lista de jogos

export async function gameGet(req, res) {

    // pegando os dados por query
    const { name, offset, limit } = req.query;

    try {
        let result = [];

        // testando se os dados do query são validos
        if (typeof name !== 'undefined' && name !== '' &&
            typeof offset !== 'undefined' && offset !== '' &&
            typeof limit !== 'undefined' && limit !== '') {
            result = await db.query(`SELECT * FROM games WHERE name LIKE $1 OFFSET $2 LIMIT $3;`, [`${name}%`, offset, limit]);
        } else
            if (typeof name !== 'undefined' && name !== '' &&
                typeof offset !== 'undefined' && offset !== '') {
                result = await db.query(`SELECT * FROM games WHERE name LIKE $1 OFFSET $2 ;`, [`${name}%`, offset]);
            } else
                if (typeof name !== 'undefined' && name !== '' &&
                    typeof limit !== 'undefined' && limit !== '') {
                    result = await db.query(`SELECT * FROM games WHERE name LIKE $1 LIMIT $2;`, [`${name}%`, limit]);
                } else
                    if (typeof offset !== 'undefined' && offset !== '' &&
                        typeof limit !== 'undefined' && limit !== '') {
                        result = await db.query(`SELECT * FROM games OFFSET $1 LIMIT $2 ;`, [offset, limit])
                    } else
                        if (typeof offset !== 'undefined' && offset !== '') {
                            result = await db.query(`SELECT * FROM games OFFSET $1 ;`, [offset])
                        } else
                            if (typeof limit !== 'undefined' && limit !== '') {
                                result = await db.query(`SELECT * FROM games OFFSET $1 ;`, [limit])
                            } else {
                                result = await db.query(`SELECT * FROM games ;`)
                            }


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