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
    var pseudo = req.body.pseudo;
    var salt = hash.genSaltSync();
    var password = hash.hashSync(req.body.password);

    if(pseudo == "admin") {
        console.log("Add admin");
        var user = new utilisateur({
            pseudo: pseudo,
            password: password,
            autorisation : "Full",
            salt : salt
        });
        user.save(function (err, data) {
        });
    }else{
        console.log("Add user");
        var user = new utilisateur({
            pseudo: pseudo,
            password: password,
            salt : salt,
            autorisation : "Less"
        });
        user.save(function (err, data) {
        });
    }


    res.redirect("/connexion");
});

module.exports = router;