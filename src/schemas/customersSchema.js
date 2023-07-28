import joi from "joi";

export const gameTable = joi.object({

    name: joi.string().max(64).required(),
    phone: joi.number().min(10).max(11).pattern(/^\d+$/).required(),
    cpf: joi.number().length(11).pattern(/^\d+$/).required(),
    birthday: joi.string().required(),
})