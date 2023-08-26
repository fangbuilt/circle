import Joi = require("joi");

export const CreateThreadSchema = Joi.object().keys({
    content: Joi.string().when("image", {
        is: Joi.exist(), 
        then: Joi.string().allow("").optional(),
        otherwise: Joi.string().min(1).max(280).required()
    }),
    image: Joi.string().allow("").optional(),
})

export const UpdateThreadSchema = Joi.object().keys({
    content: Joi.string().min(1).max(280).optional(),
    image: Joi.string().allow("").optional()
})