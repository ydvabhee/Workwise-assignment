const Joi = require('joi')

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports = {
    signinSchema
}