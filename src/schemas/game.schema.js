import joi from "joi";

export const gameTable = joi.object({

    name: joi.string().max(64).required(),
    image: oi.string().max(1000).required(),
    stockTotal: 3,
    pricePerDay: 1500,

})