const express = require('express')
const {authenticate, authorize} = require('../../middlewares/auth.middleware')
const {getUser} = require('../../controllers/user.controller')
const {validate} = require('../../middlewares/validate.middleware')
const {createProductSchema, deleteProductSchema} = require('../../validations/product.validation')
const {createProduct, getProdcuts, deleteProduct, getSellerProdcuts} = require('../../controllers/product.controller')


const router = express.Router()

router.get('/', authenticate, authorize(['buyer']), getProdcuts )
router.get('/seller_products', authenticate, authorize(['seller']), getSellerProdcuts )
router.post('/', authenticate, authorize('seller'), validate(createProductSchema), createProduct )
router.delete('/:id', authenticate, authorize('seller'), validate(deleteProductSchema), deleteProduct )

module.exports = router
