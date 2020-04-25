const db = require('../db');
const Router = require('express-promise-router');
const router = new Router();

// Set custom variables needed in the layout here e.g. paths.
router.get('/', function (req, res) {
	res.render('index', {
		title: 'LimitBreaker: Welcome',
		message: 'Hello there!'
		});
});

var indexRouter = require('./index');
var clientsRouter = require('./clients');
var stockRouter = require('./stockRoute');
var ordersRouter = require('./ordersRoute');
var dataRouter = require('./data');

module.exports = (app) => {
	app.use(router);
	//app.use(dataRouter);
	app.use(clientsRouter);
	app.use(stockRouter);
	app.use(ordersRouter);
}