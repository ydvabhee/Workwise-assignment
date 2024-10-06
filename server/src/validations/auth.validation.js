const Joi = require('joi')

const signinSchema = {
    body:  Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email ',
            'string.empty': 'Email is required in body ',
            'any.required': 'Email is required in body '
        })  ,
        password: Joi.string().required().min(6).max(32).messages({
            'string.empty': 'Password is required in body ',
            'any.required': 'Password is required in body ',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be at most 32 characters long'
        })
    }) 
}

const signupSchema = {
    body: Joi.object({
        name: Joi.string().max(32).alphanum().required().messages({
            'string.empty': 'Name is required in body ',
            'any.required': 'Name is required in body '
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email ',
            'any.required': 'Email is required in body '
        }),
        password: Joi.string().required().min(6).max(32).messages({
            'any.required': 'Password is required in body ',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be at most 32 characters long'
        }),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
            'any.required': 'Confirm password is required in body ',
            'any.only': 'Confirm password must be the same as password'
        })
    })
}

module.exports = {
    signinSchema, signupSchema
}