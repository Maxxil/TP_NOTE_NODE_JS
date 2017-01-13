/**
 * Created by Massil on 13/01/2017.
 */
var express = require("express");

var session = require("express-session");
var bodyParser = require("body-parser");
var multer = require("multer");
var mime = require("mime");

var Film = require("./../model/film");

var router = express.Router();
var storage = multer.diskStorage({
    destination : function (req , file , cb){
        cb(null , "upload")
    },
    filename : function (req , file , cb) {
        cb(null , file.name + ' ' + Date.now() + mime.extension(file.mimeTypes) );
    }
});
var upload = multer({storage: storage});

var parser = bodyParser.urlencoded({extended : true});
var app = express();

app.use(session({secret : "session-control"}));

router.get("/", function(req , res){
    if(req.session.name == undefined){
        res.redirect({Location : "/"})
    }else{
        if(req.session.name == "admin")
        {
            res.render("./../views/ajout.html");
        }
        else
        {
            res.redirect({Location : "/"});
        }
    }
});

router.post("/" , parser , upload.single("image") , function (req , res) {
    var titre = req.body.titre;
    var realisateur = req.body.realisateur;
    var date = req.body.date;
    console.log(req.file);
    var image = req.file.path;

    var film = new Film({
        Titre : titre,
        Realisateur : realisateur,
        dateSortie : date,
        Affiche : image
    });
    film.save(function (err ,data) {
        
    });
    res.redirect({Location: "/ajout"});
});


module.exports = router;