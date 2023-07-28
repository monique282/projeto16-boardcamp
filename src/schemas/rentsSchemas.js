import joi from "joi";

export const rentsTable = joi.object({

    // id do ususario
    customerId: joi.string().min(1).required(),
    // id do jogo
    gameId: joi.string().min(1).required(),
    // quantidade de dias de aluguel do jogo
    daysRented: joi.number().min(1).required(),
   

})