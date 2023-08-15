import Joi = require("joi");

export const RegisterSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    full_name: Joi.string().min(3).max(80).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(128).required()
})

export const LoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(128).required()
})