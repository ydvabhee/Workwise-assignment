const express = require('express')
const {authenticate, authorize} = require('../../middlewares/auth.middleware')
const {getUser} = require('../../controllers/user.controller')
const {validate} = require('../../middlewares/validate.middleware')
const {createProductSchema} = require('../../validations/product.validation')
const {createProduct} = require('../../controllers/product.controller')

const router = express.Router()

router.post('/', authenticate, authorize('seller'), validate(createProductSchema), createProduct )

module.exports = router
