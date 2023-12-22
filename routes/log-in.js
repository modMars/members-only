const express = require('express')
const router = express.Router()
const LogInController = require('../controllers/log-in')

/* GET home page. */
router.get('/', LogInController.log_in_get)
router.post('/', LogInController.log_in_post)

module.exports = router
