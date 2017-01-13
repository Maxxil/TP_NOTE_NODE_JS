/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();
var hash = require("bcrypt-nodejs");
var utilisateur = require("./../model/utilisateur");
var bodyParser = require("body-parser");

var parser = bodyParser.urlencoded({extended : true});


router.get("/" , function (req , res) {
    res.render("./../views/inscription.html");
});

router.post("/" , parser, function (req , res) {
    var pseudo = hash.hashSync(req.body.pseudo);
    var password = hash.hashSync(req.body.password);

    var user = new utilisateur({
        pseudo : pseudo,
        password : password
    });

    user.save(function (err, data) {

    });
    res.redirect("/connexion");
});

module.exports = router;