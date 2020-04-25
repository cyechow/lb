const Router = require('express-promise-router');
const router = new Router();

router.get('/inquiry/', async(req, res) => {
    res.render('inquiry', {});
})
module.exports = router;