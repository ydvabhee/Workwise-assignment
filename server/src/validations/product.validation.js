const Joi = require('joi')

const createProductSchema = {
    body:  Joi.object({
        name: Joi.string().max(32).required().insensitive().lowercase().messages({
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

const deleteProductSchema = {
    params:  Joi.object({
        id: Joi.string().required().messages({
            'string.empty': 'Id is required in param ',
            'any.required': 'Id is required in param '
        }),
    }) 
}

 

module.exports = {
    createProductSchema,
    deleteProductSchema
}