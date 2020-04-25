const Router = require('express-promise-router');
const router = new Router();

// Set custom variables needed in the layout here e.g. paths.
router.get('/', function (req, res) {
	res.render('index', {
		title: 'LimitBreaker: Welcome',
		message: 'Hello there!'
		});
});

var inquiryRoute = require('./inquiryRoute')

module.exports = (app) => {
	app.use(router);
	app.use(inquiryRoute);
}