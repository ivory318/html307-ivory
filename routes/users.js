var express = require('express');
var router = express.Router();
var admin = require("../shared/firebaseAdmin").admin;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', function (req, res, next) {
  res.render('users/login.ejs');
});

router.get('/dashboard', function (req, res, next) {
  res.locals.user = req.session.user;
  res.render('users/dashboard.ejs');
});

router.get('/signout', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/verify', function (req, res, next) {
  var idToken = req.body.token;
  admin.auth().verifyIdToken(idToken)
    .then(function (decodedToken) {
      var uid = decodedToken.uid;
      req.session.user = req.body.user;
      res.json({
        success: true
      });
      // ...
    }).catch(function (error) {
      // Handle error
      req.session.user = req.body.user;
      res.json({
        success: false
      });
    });
});

module.exports = router;