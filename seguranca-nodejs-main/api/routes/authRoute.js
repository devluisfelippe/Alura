const { Router } = require('express')
const router = Router()
const AuthController = require('../controllers/authController')

router
    .post('/auth/login', AuthController.login);

module.exports = router