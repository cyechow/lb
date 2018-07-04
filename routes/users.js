const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
	res.send(rows[0]);
});

module.exports = router;