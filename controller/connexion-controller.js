/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();
var session = require("express-session");
var utilisateur = require("./../model/utilisateur");
var hash = require("bcrypt-nodejs");

router.get("/" , function(req , res){
    res.render("./../views/connexion.html");
});

router.post("/" , function(req , res){
    var pseudo = hash.hashSync(req.body.pseudo);
    var password = hash.hashSync(req.body.password);
    utilisateur
        .find({pseudo : pseudo , password : password})
        .exec(function(err , res){
            if(err)
                console.log("L'utilisateur n'existe pas.");
            else{
                if(res.autorisation == "Full")
                {
                    app.use(session({name : "admin"}));
                }
                else{
                    app.use(session({name : "user"}));
                }
            }
        });
});

module.exports = router;