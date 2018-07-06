const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');
const data = require('./data');

// Read
router.get('/api/v1/orders', data.allOrders, async(req, res) => {
	parsed = JSON.parse(res.locals.allOrders);
	res.render('orders', { title: 'Orders', results: parsed });
});

// Create
router.post('/api/v1/orders/add', async(req, res, next) => {
	const data = {name: req.body.text, orderStatus: 'Created'};
	db.query('INSERT INTO orders(clientName, orderStatus) values($1, $2)', [data.name, data.orderStatus]);
	
	var results = [];
	
	db.query('SELECT * FROM orders ORDER BY id ASC;', [], (err, qRes) => {
		if (err) {
			return next(err);
		}
		
		// Stream results back one row at a time
		qRes.rows.forEach(row => {
			results.push(row);
		});
		
		console.log(results);
		return res.json(results);
	});
});

// Update
router.put('/api/v1/orders/:order_id', async(req, res, next) => {
	const id = req.body.order_id;
	const data = {name: req.body.text, orderStatus: req.body.orderStatus};
	db.query('UPDATE orders SET clientName=($1), orderStatus=($2) WHERE orderId=($3)', [data.item, data.count, id]);
	
	var results = [];
	
	db.query('SELECT * FROM orders ORDER BY id ASC;', [], (err, qRes) => {
		if (err) {
			return next(err);
		}
		
		// Stream results back one row at a time
		qRes.rows.forEach(row => {
			results.push(row);
		});
		
		console.log(results);
		return res.json(results);
	});
});

module.exports = router;