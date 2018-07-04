const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

// Read
router.get('/api/v1/stock', async(req, res, next) => {
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

// Create
router.post('/api/v1/stock', async(req, res, next) => {});

module.exports = router;