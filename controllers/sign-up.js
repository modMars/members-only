const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

//TODO Validate sign up data, hash passwords and save to db
exports.sign_up_get = (req, res, next) => {
	res.render('sign_up', { errors: [] })
}

exports.sign_up_post = [
	body('first_name', 'Please enter a first name.').trim().not().isEmpty().escape(),
	body('last_name', 'Please enter a last name').trim().not().isEmpty().escape(),
	body('email', 'Please enter a valid e-mail.').trim().not().isEmpty().isEmail().normalizeEmail().escape(),
	body('email').custom(async (value, { req }) => {
		const existingUser = await User.findOne({ email: value })
		if (existingUser) {
			throw new Error('E-mail already in use')
		}
		return true
	}),
	body('password', 'Your password must be at least 6 characters long.').isLength({ min: 6 }),
	body('password-confirm')
		.custom((value, { req }) => value === req.body.password)
		.withMessage('Passwords do not match'),

	async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.
			res.render('sign_up', {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				errors: errors.array(),
			})
		} else {
			// Data from form is valid. Save user.
			try {
				bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
					if (err) {
						return next(err)
					} else {
						const user = new User({
							first_name: req.body.first_name,
							last_name: req.body.last_name,
							email: req.body.email,
							password: hashedPassword,
						})
						const result = await user.save()
						console.log('Created user..')
						console.log('Username: ', user.email)
						console.log('Hash: ', user.password)
						res.redirect('/')
					}
				})
			} catch (err) {
				return next(err)
			}
		}
	},
]
