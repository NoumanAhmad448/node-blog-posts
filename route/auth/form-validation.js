import messages from './messages.js'
import Joi from 'joi'

const sys_msg = messages()

const msg_validation = {
        message: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z ]*$'),)
            .required()
            .messages({
                "string.pattern.base": sys_msg.input_nt_alwd("input")
            })
}
export const validation = {
        id: Joi.string()
            .trim()
            .alphanum()
            .required(),

        num_bool: (required=true) => {
            let rule = Joi.number().min(0).max(1)
            if(required){
                rule.required()
            }
            return rule
        },
        views: (required=true) => {
            let rule = Joi.number()
            if(required){
                rule.required()
            }
            return rule
        },
        message: (required=true) => {
            let rule = Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z ]*$'),)
            if(required){
                rule.required()
            }
            rule.messages({
                "string.pattern.base": sys_msg.input_nt_alwd("input")
            })
            return rule
        },
        limit: Joi.number()
}

export default msg_validation