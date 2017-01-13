/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();
var bodyParser = require("body-parser");
var multer = require("multer");

var storage = multer.diskStorage({
    destination : function (req , file , cb){
        cb(null , "/upload")
    },
    filename : function (req , file , cb) {
        cb(null , file.fieldname + ' ' + Date.now());
    }
});
var upload = multer({dest: "/upload"});

var parser = bodyParser.urlencoded({extended : true});

router.get("/", function(req , res){
    res.render("./../views/ajout.html");
});

router.post("/" , parser , upload.single("image") , function (req , res) {
    var titre = req.body.titre;
    var realisateur = req.body.realisateur;

});


module.exports = router;