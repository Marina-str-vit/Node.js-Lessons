import pino from "pino-http";
//в Nest.js всі import іменовані
export const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });
