const express = require('express')
const { signin } = require('../../controllers/auth.controller')
const { validate } = require('../../middlewares/validate')
const { authValidation } = require('../../validations')
const router = express.Router()

router.get('/signin', validate(authValidation.signinSchema), signin)

module.exports = router
