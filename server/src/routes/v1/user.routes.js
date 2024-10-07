const express = require('express')
const {authenticate} = require('../../middlewares/auth.middleware')
const {getUser} = require('../../controllers/user.controller')

const router = express.Router()

router.get('/', authenticate, getUser )

module.exports = router
