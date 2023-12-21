const express = require('express')
const router = express.Router()
const SignUpController = require('../controllers/sign-up')

/* GET home page. */
router.get('/', SignUpController.sign_up_get)
router.post('/', SignUpController.sign_up_post)

module.exports = router
