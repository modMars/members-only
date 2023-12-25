var express = require('express')
var router = express.Router()
const Post = require('../models/post')

/* GET home page. */
router.get('/', async function (req, res, next) {
	const posts = await Post.find().populate('created_by')
	res.render('index', { posts: posts })
})

router.get('/log-out', (req, res, next) => {
	req.logout(err => {
		if (err) {
			return next(err)
		}
		res.redirect('/')
	})
})

module.exports = router
