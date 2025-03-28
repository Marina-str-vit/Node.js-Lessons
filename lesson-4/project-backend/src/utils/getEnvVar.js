import "dotenv/config"; // допомагає нам взяти Порт з нашого компа

export const getEnvVar = (name, defaultValue)=> {
    const value = process.env[name];

    if(value) return value;
    if(defaultValue) return defaultValue;

    throw new Error(`Missing ${name} enviroment variable`);
};
