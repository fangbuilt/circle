import Joi = require("joi");

export const CreateReplySchema = Joi.object().keys({
    thread: Joi.required(),
    user: Joi.required(),
    content: Joi.string().min(1).max(280).required(),
    image: Joi.string().allow("").optional()
})

export const UpdateReplySchema = Joi.object().keys({
    content: Joi.string().min(1).max(280).required(),
    image: Joi.string().allow("").optional()
})