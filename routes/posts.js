var express = require('express')
var router = express.Router()
const postsController = require('../controllers/posts')

/* GET home page. */
router.get('/new', postsController.new_get)
router.post('/new', postsController.new_post)
router.get('/delete/:id', postsController.delete_get)
router.post('/delete/:id', postsController.delete_post)

module.exports = router
