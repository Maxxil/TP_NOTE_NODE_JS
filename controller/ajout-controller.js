/**
 * Created by Massil on 13/01/2017.
 */
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var mime = require("mime");
var moment = require("date-utils");

var Detail = require('./../model/detail');
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
    var image = req.file.path;
    var description = req.body.description;
    var detail = new Detail({
        dateAjout : Date.today(),
        Description : description,
        Avis : []
    });
    var film = new Film({
        Titre : titre,
        Realisateur : realisateur,
        dateSortie : date,
        Affiche : image,
        Detail : detail._id
    });
    detail.save(function (err ,data) {});
    film.save(function (err ,data) {});
    res.writeHead(302 ,{Location : "/"});
    res.end();
});


module.exports = router;