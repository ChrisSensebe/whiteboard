var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nizural', article: 'Section accueil' });
})

/* GET sections pages. */
.get('/code', function(req, res, next) {
  res.render('index', { title: 'Nizural', article: 'Section code' });
})
.get('/raspberry', function(req, res, next) {
  res.render('index', { title: 'Nizural', article: 'Section raspberrypi' });
})
.get('/photo', function(req, res, next) {
  res.render('index', { title: 'Nizural', article: 'Section Photo' });
})
.get('/about', function(req, res, next) {
  res.render('index', { title: 'Nizural', article: 'Section présentation' });
});

module.exports = router;
