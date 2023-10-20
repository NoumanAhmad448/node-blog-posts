import messages from './messages.js'
import Joi from 'joi'

const sys_msg = messages()

const msg_validation = () => {
    return {
        message: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z ]*$'),)
            .required()
            .messages({
                "string.pattern.base": sys_msg.input_nt_alwd("input")
            })
    }
}
export default msg_validation