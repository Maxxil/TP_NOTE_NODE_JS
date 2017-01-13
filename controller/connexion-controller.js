/**
 * Created by Massil on 13/01/2017.
 */
var express = require("express");
var router = express.Router();
var utilisateur = require("./../model/utilisateur");
var hash = require("bcrypt-nodejs");
var bodyParser = require("body-parser");

var app = express();
var parser = bodyParser.urlencoded({extended : true});

router.get("/" , function(req , res){
    res.render("./../views/connexion.html");
});

router.post("/" , parser , function(req , res){
    var pseudo = req.body.pseudo;
    var password = req.body.password;
    var passHash = hash.hashSync(password);
    utilisateur
        .find({pseudo : pseudo})
        .exec(function(err , data){
            if(err)
                console.log("L'utilisateur n'existe pas.");
            else{
                if(hash.compareSync(password,passHash)) {
                    if (data.autorisation == "Full") {
                        req.session.name = "admin";
                    }
                    else {
                        req.session.name = "user";
                    }
                }
            }
        });
    res.writeHead(302 , {Location : "/"});
    res.end();
});

module.exports = router;