const Joi = require('joi')

const createProductSchema = {
    body:  Joi.object({
        name: Joi.string().max(32).alphanum().required().insensitive().lowercase().messages({
            'string.empty': 'Name is required in body ',
            'any.required': 'Name is required in body '
        }),
        price: Joi.number().required().messages({
            'number.base': 'Price must be a number',
            'any.required': 'Price is required in body '
        }),
        discount: Joi.number().optional().messages({
            'number.base': 'Discount must be a number',
            'any.required': 'Discount is required in body '
        }),
        category: Joi.string().required().messages({
            'string.empty': 'Category is required in body ',
            'any.required': 'Category is required in body '
        }),
    }) 
}

 

module.exports = {
    createProductSchema
}