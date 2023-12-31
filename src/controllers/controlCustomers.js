// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em customersRoutes

import { db } from "../database/db.js";
import { parseISO, format } from 'date-fns';

// essa função aqui é enviado por um get para pegar a lista de clientes
export async function customersGet(req, res) {

    // pegando os dados por query
    const { cpf, offset, limit, order, desc } = req.query;

    try {

        let query = 'SELECT * FROM customers';
        const queryParams = [];

        // Verificando os parâmetros enviados pela query são validos
        // verificando se name é valido
        if (typeof cpf !== 'undefined' && cpf !== '') {
            queryParams.push(`${cpf}%`);
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
            const validColumns = ['name', 'id', 'cpf', 'phone', 'birthday'];
            if (validColumns.includes(order)) {

                // adiciona o parâmetro de ordenação
                query += ' ORDER BY ' + order;

                //se desc for true adicione DESC à consulta
                if (typeof desc !== 'undefined' && desc.toLowerCase() === 'true') {
                    console.log("ate aqui desc")
                    query += ' DESC ';
                }
            } else {
                return res.status(400).send('Parâmetro de ordenação inválido.');
            };
        };

        // juntando tudo para linha ficar de modo correto
        const result = await db.query(query, queryParams);

        // tratando a data para vim no formato correto
        const updatedData = result.rows.map(date => {
            const dateCorret = new Date(date.birthday);
            const formatDate = dateCorret.toISOString().split('T')[0];
            return {
                ...date,
                birthday: formatDate
            };
        });

        res.send(updatedData);

    } catch (err) {
       return res.status(500).send("Erro ao processar a solicitação. Por favor, tente novamente mais tarde.");
    };
};

// essa função aqui é enviado por um get para pegar a lista de clientes pelo id
export async function customersGetId(req, res) {
    const { id } = req.params;

    try {

        const result = await db.query(
            `SELECT * FROM customers WHERE id=$1;`, [id]);

        // verificando se o id existe
        if (result.rows.length === 0) {
            return res.status(404).send("Cliente não encontrado.");
        };

        // tratando a data para vim no formato correto
        const updatedData = result.rows.map(date => {
            const dateCorret = new Date(date.birthday);
            const formatDate = dateCorret.toISOString().split('T')[0];
            return {
                ...date,
                birthday: formatDate
            };
        });

        res.send(updatedData[0]);

    } catch (err) {
        return res.status(500).send("Erro ao processar a solicitação. Por favor, tente novamente mais tarde.");
    };
};

// essa função aqui é enviado por um post para crir a lista de cliente
export async function customersPost(req, res) {

    // pegar os dados que a pessoa colocou na tela de cadastro de cliente
    const { name, phone, cpf, birthday } = req.body;

    try {

        // pegando toda a lista de clientes
        const listCustomers = await db.query(`
        SELECT * FROM customers;
        `);

        // verificar se o cpf ja foi cadastrado
        let cpfExists = false;
        listCustomers.rows.forEach(customer => {
            if (customer.cpf === cpf) {
                cpfExists = true;
                return;
            };
        });

        if (cpfExists) {
            return res.status(409).send("O CPF informado já está cadastrado para outro cliente.");
        };

        // se tivertudo certo enviar para o Api
        const insertCustomers = await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday) VAlUES ($1, $2, $3, $4);
            ` , [name, phone, cpf, birthday]);
        return res.sendStatus(201);

    } catch (err) {
        return res.status(500).send("Erro ao cadastrar o cliente. Por favor, verifique os dados e tente novamente.");
    };
};

// essa função aqui é enviado para atualizar lista de cliente usando 0 id
export async function customersPut(req, res) {

    // pegar os dados que a pessoa colocou na tela de cadastro de cliente
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    try {

        //verificar se o cpf ja existe
        const resultCustomers = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);

        // cpf que quer ser alterado não é do dono
        if (resultCustomers.rows.length !== 0 && resultCustomers.rows[0].id !== parseInt(id)) {
            return res.status(409).send("O CPF informado já está cadastrado para outro cliente.");
        };

        // se tivertudo certo enviar para o Api
        const insertPutCustomers = await db.query(`
        UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;
        ` , [name, phone, cpf, birthday, parseInt(id)]);

        return res.sendStatus(200);

    } catch (err) {
        return res.status(500).send("Erro ao atualizar o cliente. Por favor, verifique os dados e tente novamente.");
    };
};