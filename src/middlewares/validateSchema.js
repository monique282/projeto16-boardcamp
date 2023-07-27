// essa pasta serve somente pra validade se o que a pessoa digiotou esta correto com o que foi solicitado
// essa pasta é solicitada em dentro da pasta Routes e usada no arquivo expecifico necessario


export function validarJoiParaTodos(joi) {
    return (req, res, next) => {
        // verificar se passou nas validações do joi
        const validarSeTaCerto = joi.validate(req.body, { abortEarly: false });
        // o abortEarly serve pra procurar todos os requisitos que nao passou no joi
        if (validarSeTaCerto.error) {
            const erroEspecifico = validarSeTaCerto.error.details.map(qual => qual.message);
            return res.status(422).send(erroEspecifico);
        }
        next();
    }

}





