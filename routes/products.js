var express = require('express');
var router = express.Router();
var db = require("../shared/firebaseAdmin").db;

function formatNumber(number) {
    if (number >= 1 && number < 10)
        return "00" + number;
    else if (number >= 10 && number < 100)
        return "0" + number;
    else
        return number;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.locals.formatNumber = formatNumber;
    res.locals.pokemons = [];
    db
        .collection("pokemons")
        .get()
        .then(function (snapshot) {

            snapshot.forEach(function (doc) {
                console.log(doc.data());
                res.locals.pokemons.push(doc.data());
            });

            res.render('products/products.ejs');

        });

});

router.get('/:productId', function (req, res, next) {
    var productId = req.params.productId;
    res.locals.formatNumber = formatNumber;
    db
        .doc(`pokemons/${productId}`)
        .get()
        .then(function (doc) {
            res.locals.pokemon = doc.data();
            res.render('products/product.ejs');
        });

});

module.exports = router;