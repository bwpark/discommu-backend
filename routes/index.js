const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({hello:'world'});
});

module.exports = router;
