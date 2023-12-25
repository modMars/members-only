const passport = require('passport')
const Post = require('../models/post')
const { body, validationResult } = require('express-validator')

//If the user isn't logged in take them to the log-in section instead
exports.new_get = (req, res, next) => {
	if (!req.user) {
		res.redirect('/log-in')
	}
	res.render('new', {})
}

exports.new_post = [
	body('title', 'Please enter a valid title').trim().not().isEmpty().escape(),
	body('message', 'Please enter a valid message').trim().not().isEmpty().escape(),

	async (req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.
			res.render('new', {
				title: req.body.title,
				message: req.body.message,
				errors: errors.array(),
			})
		} else {
			const post = new Post({
				title: req.body.title,
				message: req.body.message,
				created_by: req.user.id,
			})
			const result = await post.save()
			res.redirect('/')
		}
	},
]

exports.delete_get = (req, res, next) => {
	if (!req.user) {
		res.redirect('/log-in')
	}
	res.render('delete', {})
}

exports.delete_post = [
	async (req, res, next) => {
		const id = req.params.id
		try {
			await Post.findByIdAndDelete(id)
		} catch (err) {
			console.log(err)
		} finally {
			res.redirect('/')
		}
	},
]
