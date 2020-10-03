var express = require('express');
var router = express.Router();

router.get('/authorize', function(req, res) {
    if (!req.query.state) return res.json({error: 'Redirect uri(state) query not privided'})
});

module.exports = router;
