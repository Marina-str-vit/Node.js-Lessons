import createError from "http-errors";
// створюю додатковий декоратор
export const validateBody = schema => {
    const func = async (req, res, next)=> {
        try {
            await schema.validateAsync(req.body, {
// по замовчуванню завжди стоїть тру і тому перевірка закіньчується на першій помилці, а нам треба йти далі
                abortEarly: false,  // робимо так, щоб шукало всі помилки
            });
            next();
        }
        catch(error) {
            next(createError(400, error.message));
        }
    };

    return func;
};
