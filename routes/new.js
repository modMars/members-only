var express = require('express')
var router = express.Router()
const newMsgController = require('../controllers/new')

/* GET home page. */
router.get('/', newMsgController.new_get)
router.post('/', newMsgController.new_post)

module.exports = router
