import Joi from "joi";

import { typeList, minReleaseYear } from "../constants/movies.js";

export const movieAddSchema = Joi.object({
// якщо я хочу написати зрозуміло що саме трапилося то
// title: Joi.string().required().messages({
//   "any.required": "Требі вказати назву фільму",
//    "String.base": "назва фільму має бути строкою", // якщо назву передали не строкою а ціфрою чи символом
//})
    title: Joi.string().required(),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList), // якщо маємо массив значень, то йду в константи і там беру постійний їх перелік
    releaseYear: Joi.number().min(minReleaseYear).required().messages({
        "number.min": `Movie before ${minReleaseYear} not found`
    }),
});
// це для Patch запитів, бо хочимо змінити лише деякі поля
export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList),
    releaseYear: Joi.number().min(minReleaseYear).messages({
        "number.min": `Movie before ${minReleaseYear} not found`
    }),
});
