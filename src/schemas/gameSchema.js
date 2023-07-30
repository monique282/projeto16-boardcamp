import joi from "joi";

export const gameTable = joi.object({

    name: joi.string().max(64).required(),
    image: joi.string().max(1000).required(),
    // estoque total
    stockTotal: joi.number().min(1).required(),
    // preço por dia
    pricePerDay: joi.number().min(1).required(),
});