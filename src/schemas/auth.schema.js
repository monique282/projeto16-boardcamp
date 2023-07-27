import joi from "joi";

export const signUpSchema = joi.object({

    name: joi.string().max(64).required(),
    email: joi.string().max(256).required(),
    password: joi.string().min(3).max(256).required(),
    image: joi.string().max(4096).required()
});

export const signInSchema = joi.object({

    email: joi.string().max(256).required(),
    password: joi.string().min(3).max(256).required(),
});