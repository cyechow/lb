const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');
const data = require('./data');

// Read
router.get('/api/v1/stock', data.allStock, async(req, res) => {
	parsed = JSON.parse(res.locals.allStock);
	res.render('stock', { title: 'Inventory', results: parsed });
});

// Create
router.post('/api/v1/stock/add', async(req, res, next) => {
	console.log(req.body);
	
	const data = {item: req.body.item, count: req.body.count};
	db.query('INSERT INTO items(item, count) values($1, $2)', [data.item, data.count], (err, qRes) => {
		if (err) {
			next(err);
		}
		else {
			next();
		}
	});
	
	var results = [];
	
	db.query('SELECT * FROM items ORDER BY id ASC;', [], (err, qRes) => {
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
router.put('/api/v1/stock/update/:stock_id', async(req, res, next) => {
	const id = req.params.stock_id;
	const data = {item: req.body.item, count: req.body.count};
	db.query('UPDATE items SET item=($1), count=($2) WHERE id=($3)', [data.item, data.count, id], (err, qRes)=> {
		if (err) {
			next(err);
		}
		else {
			next();
		}
	});
	
	var results = [];
	
	db.query('SELECT * FROM items ORDER BY id ASC;', [], (err, qRes) => {
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