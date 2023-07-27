import joi from "joi";

export const productSchema = joi.object({

    title: joi.string().max(128).required(),
    value: joi.number().positive().greater(0).max(1000000000).required(),
    description: joi.string().max(4096).required(),
    image: joi.string().max(4096).required(),
    quantity: joi.number().positive().integer().greater(0).max(10000).required()
});