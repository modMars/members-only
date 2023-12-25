const express = require('express')
const router = express.Router()
const JoinController = require('../controllers/join')

/* GET home page. */
router.get('/', JoinController.join_get)
router.post('/', JoinController.join_post)

module.exports = router
