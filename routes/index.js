var express = require('express');
var router = express.Router();
var db = require("../shared/firebaseAdmin").db;

/* GET home page. */
router.get('/', function (req, res, next) {

  db
    .collection("comments")
    .get()
    .then(function (snapshot) {

      res.locals.comments = [];
      snapshot.forEach(function (doc) {
        console.log(doc.data());
        res.locals.comments.push(doc.data());
      });
      res.render('index', {
        title: 'Express'
      });
    });



});

module.exports = router;