import Joi = require("joi");

export const CreateThreadSchema = Joi.object().keys({
    content: Joi.string().min(1).max(280).required(),
    image: Joi.string().allow("").optional(),
})

export const UpdateThreadSchema = Joi.object().keys({
    content: Joi.string().min(1).max(280).required(),
    image: Joi.string().allow("").optional()
})