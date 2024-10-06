const express = require('express')
const { signin, signup } = require('../../controllers/auth.controller')
const { validate } = require('../../middlewares/validate')
const { authValidation } = require('../../validations')
const router = express.Router()

router.post('/signin', validate(authValidation.signinSchema), signin)
router.post('/signup', validate(authValidation.signupSchema), signup )

module.exports = router
