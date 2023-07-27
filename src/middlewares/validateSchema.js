import { stripHtml } from "string-strip-html";

export const validateSchema = (schema) => {

    return function (req, res, next) {

        const data = { ...req.body, ...req.params };
        for (const [key, value] of Object.entries(data)) {
            
            if (typeof value === "string") {
                data[key] = stripHtml(value).result.trim();
            }
        }

        const validation = schema.validate(data, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        res.locals.data = req.body;
        next();
    }
}