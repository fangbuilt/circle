import Joi = require("joi");

export const CreateReplySchema = Joi.object().keys({
    content: Joi.string().when("image", {
        is: Joi.exist(),
        then: Joi.string().allow("").optional(),
        otherwise: Joi.string().min(1).max(280).required()
    }),
    image: Joi.string().allow("").optional(),
    thread_id: Joi.number().required()
})

export const UpdateReplySchema = Joi.object().keys({
    content: Joi.string().min(1).max(280).required(),
    image: Joi.string().allow("").optional()
})