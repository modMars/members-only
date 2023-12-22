const passport = require('passport')

exports.log_in_get = (req, res, next) => {
	if (req.user) {
		res.redirect('/')
	}
	res.render('log_in', { errors: [] })
}

exports.log_in_post = [
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/sign-up',
	}),
]
