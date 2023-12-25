const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin')

/* GET home page. */
router.get('/', AdminController.admin_get)
router.post('/', AdminController.admin_post)

module.exports = router
