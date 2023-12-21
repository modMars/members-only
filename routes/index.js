var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' })
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
