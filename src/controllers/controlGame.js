// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em gameRoutes

import { db } from "../database/db.js";

// essa função aqui é enviado por um get para pegar a lista de jogos
export async function gameGet(req, res) {
    try {
        const gameRequest = await db.query(`SELECT * FROM games;`)
        res.send(gameRequest);
    } catch (err) {
        res.status(500).send(err.message)
    }

}

// essa função aqui é enviado por um post para enviar uma lista de jogos

export async function gamePost(req, res) {
    // pegar os dados que a pessoa colocou na tela de cadastro
    const { name, image } = req.body;
    try {
        // verificar se o nome ja foi cadastrado
        const listGames = await db.query(`
        SELECT * FROM games
        `)
        

    } catch (erro) {

    }

};