// 1 - імпортуємо express,
// 2 - створюю вебсервер  const app = express();
// 3 - прописуюю шлях відображення вебсторінки app.listen(port, ()=> console.log(`Server running on ${port} port`));
// 3 - оформлюю запити  app.get("/", (req, res)

import express from "express";
import cors from "cors"; // дозволяє різним доменам працювати один з одним, створюючи middleware, котра це дозволяє робити
import pino from "pino-http";

import { getEnvVar } from "./utils/getEnvVar.js";

export const startServer = ()=> {
    const app = express(); // це створили пустий сервер. Еxpress - бере перший запит і якщо добре!, то далі НЕ йде
    // порядок перевірки коду зверху до низу
 // використ middleware - ця функ. буде робити на будь-якому запиті, читати док-цію cors
    app.use(cors());
    app.use(express.json());
    // app.use(pino({  // це формує детальний запис про дані, не завжди потрібен
    //     transport: {
    //         target: "pino-pretty"
    //     }
    // }));
// це використ. коли необхідно, щоб запит пройшов деякі middleware, напр.1- зміна мови запиту, 2- заблокування АРІ запиту
   app.use((req, res, next)=> {
       console.log("First middleware");
//  щоб express рухався далі потрібно поставити виклик next() - каже, що треба шукати далі;
        next();       
   });
    
    // якщо прийде get-запит, то виконати наступну функцію
    app.get("/", (req, res)=> {
        console.log(req.method); // щоб побачити яким методом прийшли дані
        console.log(req.url); // щоб побачити звідки прийшло
        res.json({
            message: "Start work"
        });
    });

  // тут не знайшов відповідні дані для запиту, щоб сервер не ліг потрібно зробити через json
    app.use((req, res)=> {
        res.status(404).json({
            message: `${req.url} not found`
        });
    });

    app.use((error, res, req, next)=> {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    });

    const port = Number(getEnvVar("PORT", 3000));

    app.listen(port, ()=> console.log(`Server running on ${port} port`));
};
