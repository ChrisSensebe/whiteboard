var express = require('express');
var router  = express.Router();
var entries = require('../blog/sections');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Nizural', article: entries.getSection(0).articles });
});

/* GET sections pages. */
entries.getSections().forEach(function(entry){
  router.get('/' + entries.getSection(entry).sectionTitle, function(req, res, next){
    res.render('index', {title: 'Nizural', article: entries.getSection(entry).articles});
  });
});

// router.get('/code', function(req, res, next) {
//   res.render('index', { title: 'Nizural', article: 'Section code' });
// })
// .get('/raspberry', function(req, res, next) {
//   res.render('index', { title: 'Nizural', article: 'Section raspberrypi' });
// })
// .get('/photo', function(req, res, next) {
//   res.render('index', { title: 'Nizural', article: 'Section Photo' });
// })
// .get('/about', function(req, res, next) {
//   res.render('index', { title: 'Nizural', article: 'Section présentation' });
// });

module.exports = router;
