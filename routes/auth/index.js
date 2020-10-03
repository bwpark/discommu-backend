const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../../config.json')

router.get('/authorize', function(req, res, next) {
    if (!req.query.state) return res.json({error: 'Redirect uri(state) query not privided'})
    passport.authenticate('discord', {
        state: req.query.state
    })(req,res,next)
});

router.get('/callback', (req,res,next) => {
    passport.authenticate('discord')(req,res,next)
}, (req,res) => {
    res.redirect(req.query.state + '?token=' + jwt.sign(req.user,config.jwt))
})

module.exports = router;
