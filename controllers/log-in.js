const User = require('../models/user')
const passport = require('passport')
flash = require('connect-flash')

exports.log_in_get = (req, res, next) => {
	console.log('Log_in_get accessed')
	res.render('log_in', { errors: [] })
}

exports.log_in_post = [
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/sign-up',
		failureFlash: true,
	}),
]
