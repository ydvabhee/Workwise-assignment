const Joi = require('joi')


const validate = (schema) => (req, res, next) => {

    // validate body if route is post
    for (const key in schema) {
        const { error } = schema[key].validate(req[key])
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
    }
    
    next()
}

module.exports = {
    validate
}
