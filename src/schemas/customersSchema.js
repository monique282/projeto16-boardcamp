import joi from "joi";

export const gameTable = joi.object({

    name: joi.string().max(64).required(),
    phone: joi.number().min(10).required(),
    cpf: joi.number().min(11).required(),
    // preço por dia
    birthday: joi.string().required(),
})