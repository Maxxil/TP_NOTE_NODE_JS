/**
 * Created by Massil on 13/01/2017.
 */
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var mime = require("mime");

var Film = require("./../model/film");

var router = express.Router();
var storage = multer.diskStorage({
    destination : function (req , file , cb){
        cb(null , "public/upload")
    },
    filename : function (req , file , cb) {
        cb(null , file.name + ' ' + Date.now() + '.' +mime.extension(file.mimetype) );
    }
});
var upload = multer({
    storage: storage,
    fileFilter : function (req , file , cb){
        var extension = ['jpg' , 'jpeg' , 'png' , 'bmp' , 'gif'];
        var ext = mime.extension(file.mimetype);
        if(extension.indexOf(ext)){
            cb(null , true);
        }else{
            cb(new Error('Fichier incorrect'))
        }

    }});

var parser = bodyParser.urlencoded({extended : true});
var app = express();

router.get("/", function(req , res){
    console.log(req.session.admin);
    if(req.session.admin)
    {
        res.render("./../views/ajout.html");
    }
    else
    {
        res.writeHead(302 ,{Location : "/"});
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
    film.save(function (err ,data) {});
    res.redirect({Location: "/ajout"});
});


module.exports = router;