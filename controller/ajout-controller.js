/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var Film = require("./../model/film");

var storage = multer.diskStorage({
    destination : function (req , file , cb){
        cb(null , "upload")
    },
    filename : function (req , file , cb) {
        cb(null , file.name + ' ' + Date.now() );
    }
});
var upload = multer({storage: storage});

var parser = bodyParser.urlencoded({extended : true});

router.get("/", function(req , res){
    res.render("./../views/ajout.html");
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