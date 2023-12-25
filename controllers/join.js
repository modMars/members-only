const passport = require('passport')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')

exports.join_get = (req, res, next) => {
	if (!req.user) {
		res.redirect('/sign-up')
	}
	res.render('join', {})
}

exports.join_post = [
	body('secret', 'Invalid word').trim().not().isEmpty().escape(),

	async (req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.
			res.render('join', {
				secret: req.body.secret,
				errors: errors.array(),
			})
		} else if (req.body.secret !== process.env.SECRETWORD) {
			res.render('join', {
				wrong_word: 'Sorry, that is not the secret word!',
			})
		} else {
			await User.findByIdAndUpdate(req.user.id, { membership_status: true }, {})
			console.log('Updated user ', req.user.id, 'status to : ', req.user.membership_status)
			res.redirect('/')
		}
	},
]
