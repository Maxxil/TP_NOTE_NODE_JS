/**
 * Created by Massil on 13/01/2017.
 */
var express = require("express");
var router = express.Router();
var utilisateur = require("./../model/utilisateur");
var hash = require("bcrypt-nodejs");
var bodyParser = require("body-parser");

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
                    if (data[0].autorisation == "Full") {
                        req.session.pseudo = pseudo;
                        req.session.admin = true;
                    }
                    else {
                        req.session.pseudo = pseudo;
                        req.session.admin = false;
                    }
                    req.session.save(function(err){});
                }
            }
        });
    res.writeHead(302 , {Location : "/" });
    res.end();
});

module.exports = router;