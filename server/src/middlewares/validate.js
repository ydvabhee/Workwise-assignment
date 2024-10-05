const Joi = require('joi')
// const pick = require('lodash/pick')

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.query)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = {
    validate
}
