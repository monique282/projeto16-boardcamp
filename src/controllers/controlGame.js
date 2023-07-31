// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em gameRoutes

import { db } from "../database/db.js";

// essa função aqui é enviado por um get para pegar a lista de jogos
export async function gameGet(req, res) {

    // pegando os dados por query
    const { name, offset, limit, order, desc } = req.query;
   
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
            query += ' OFFSET $' + queryParams.length;

        };

        //verificando se limit é valido
        if (typeof limit !== 'undefined' && limit !== '') {
            queryParams.push(limit);
            query += ' LIMIT $' + queryParams.length;
        };

        // ordenação
        //verificando se order é valido
        if (typeof order !== 'undefined' && order !== '') {

            // todas as colunas válidas para ordenação
            const validColumns = ['name', 'id', 'image', "stockTotal", "pricePerDay"];
            if (validColumns.includes(order)) {

                // adiciona o parâmetro de ordenação
                query += ' ORDER BY "' + order + '"'
        
                //se desc for true adicione DESC à consulta
                if (typeof desc !== 'undefined' && desc.toLowerCase() === 'true') {
                    console.log("ate aqui desc")
                    query += ' DESC';
                }
            } else {
                res.status(400).send('Parâmetro de ordenação inválido.');
                return 
            }
        }

        const result = await db.query(query, queryParams);
        const gameRequest = result.rows;
        res.send(gameRequest);
    } catch (err) {
        res.status(500).send("Erro ao processar a solicitação. Por favor, tente novamente mais tarde.");

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
            return res.status(409).send("O nome do jogo já está cadastrado. Escolha um nome diferente.");

        };

        const insertGame = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay") VAlUES ($1, $2, $3, $4);
            ` , [name, image, stockTotal, pricePerDay]);
        return res.sendStatus(201);

    } catch (err) {
        res.status(500).send("Erro ao cadastrar o jogo. Por favor, verifique os dados e tente novamente.");
    };
};