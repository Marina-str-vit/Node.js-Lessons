import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import {randomBytes} from "crypto";
import path from "node:path";
import {readFile} from "node:fs/promises";
import Handlebars from "handlebars";
import jwt from "jsonwebtoken";

import UserCollection from "../db/models/User.js";
import SessionCollection from "../db/models/Session.js";

import {sendEmail} from "../utils/sendEmail.js";
import {getEnvVar} from "../utils/getEnvVar.js";

import { accessTokenLifetime, refreshTokenLifetime } from "../constants/users.js";
import { TEMPLATES_DIR } from "../constants/index.js";

const emailTemplatePath = path.join(TEMPLATES_DIR, "verify-email.html");

const emailTemplateSource = await readFile(emailTemplatePath, "utf-8");

const appDomain = getEnvVar("APP_DOMAIN");
const jwtSecret = getEnvVar("JWT_SECRET");

const createSessionData = ()=> ({
    accessToken: randomBytes(30).toString("base64"),
    refreshToken: randomBytes(30).toString("base64"),
    accessTokenValidUntil: Date.now() + accessTokenLifetime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
});

export const register = async payload => {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});
    if(user) {
        throw createHttpError(409, "User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserCollection.create({...payload, password: hashPassword});

    const template = Handlebars.compile(emailTemplateSource);

    const token = jwt.sign({email}, jwtSecret, {expiresIn: "1h"});

    const html = template({
        link: `${appDomain}/auth/verify?token=${token}`
    });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html,
    };

    await sendEmail(verifyEmail);

    return newUser;
};

export const verify = async token => {
    try {
        const {email} = jwt.verify(token, jwtSecret);
        const user = await UserCollection.findOne({email});
        if(!user) {
            throw createHttpError(401, "User not found");
        }
        await UserCollection.findOneAndUpdate({_id: user._id}, {verify: true});
    }
    catch(error) {
        throw createHttpError(401, error.message);
    }
};

export const login = async ({email, password}) => {
    const user = await UserCollection.findOne({email});
    if(!user) {
        throw createHttpError(401, "Email or password invalid");
    }

    if(!user.verify) {
        throw createHttpError(401, "Email not verfied");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw createHttpError(401, "Email or password invalid");
    }

    await SessionCollection.deleteOne({userId: user._id});

    const sessionData = createSessionData();

    return SessionCollection.create({
        userId: user._id,
        ...sessionData,
    });
};

export const refreshToken = async(payload)=>{
    const oldSession = await SessionCollection.findOne({
        _id: payload.sessionId,
        refreshToken: payload.refreshToken,
    });
    if(!oldSession) {
        throw createHttpError(401, "Session not found");
    }

    if(Date.now() > oldSession.refreshTokenValidUntil) {
        throw createHttpError(401, "Refresh token expired");
    }

    await SessionCollection.deleteOne({_id: payload.sessionId});

    const sessionData = createSessionData();

    return SessionCollection.create({
        userId: oldSession.userId,
        ...sessionData,
    });
};

export const logout = async sessionId => {
    await SessionCollection.deleteOne({_id: sessionId});
};

export const getUser = filter => UserCollection.findOne(filter);

export const getSession = filter => SessionCollection.findOne(filter);
