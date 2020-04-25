const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');
const data = require('./data');

// Read
router.get('/api/v1/stock', data.allStock, async(req, res) => {
	parsed = JSON.parse(res.locals.allStock);
	res.render('stock', { title: 'Inventory', results: parsed });
});

router.get('/count/stock', async(req, res) => {
	var results = [];
	
	db.query('SELECT id, item, count FROM items ORDER BY id ASC;', [], (err, qRes) => {
		if (err) {
			console.log(err.message);
			next(err);
		}
		
		// Stream results back one row at a time
		qRes.rows.forEach(row => {
			results.push(row);
		});

		//console.log(results);
		return res.json(results);
	});
});

// Create
router.post('/api/v1/stock/add', async(req, res, next) => {
	console.log(req.body);
	
	const data = {item: req.body.item, count: req.body.count};
	db.query('INSERT INTO items(item, count) values($1, $2)', [data.item, data.count], (err, qRes) => {
		if (err) {
			next(err);
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

// Delete
router.delete('/api/v1/stock/delete/:item', async(req, res, next) => {
	const item = req.params.item;
	console.log("Deleting " + item);

	db.query('DELETE FROM items WHERE item = ($1)', [item], (err, qRes) => {
		if (err) {
			next(err);
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