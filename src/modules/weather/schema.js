import Joi from 'joi'

export const paramSchema = Joi.object({
    visitor_name: Joi.string().required()
})