const express = require('express');
const router = express.Router();

// 1b) GET route that returns a JSON object with one key/value pair
router.get('/welcome', function(req, res, next) {
    res.render('ps3', {
        string: 'Welcome! What is your name?',
        authorized: false
    });
});

/* 1c) Read the parameter from the request body and
 * return a JSON object with two key/value pairs,
 * one for the original string and the second for the length */
router.post('/new-user', function(req, res, next) {
    const name = req.body.name;
    res.render('ps3', {
        name: name,
        nameLen: name.length,
        authorized: true
    });
});

/* 1d) Read the input param as a named
 * value on the URL and pass it in a JSON object */
router.get('/users/:name', function(req, res, next) {
    const name = req.params.name;
    res.render('ps3', {
        name: name,
        nameLen: name.length,
        authorized: true
    });
});

module.exports = router;