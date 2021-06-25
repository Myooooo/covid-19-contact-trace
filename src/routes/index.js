var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET privacy */
router.get('/privacy', function(req, res, next) {
  res.send('We care about your privacy! But how? ');
});

/* GET terms */
router.get('/terms', function(req, res, next) {
  res.send('This is our terms and conditions. You have to accept it anyway because you are marking our assignment! ');
});

module.exports = router;
