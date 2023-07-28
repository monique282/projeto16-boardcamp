import joi from "joi";

export const customersTable = joi.object({

    name: joi.string().min(1).required(),
    phone: joi.string().pattern(new RegExp('^[0-9]{10,11}$')),
    cpf: joi.string().pattern(new RegExp('^[0-9]{11,11}$')),
    birthday: joi.string().required(),
})