var router = require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var Detail = require('./../model/detail');

var parser = bodyParser.urlencoded({extended: false});

//permet d'enregistrer un commentaire
router.post('/:id', parser, function(req, res) {
    var idDetail = req.params.id;
    var comment = req.body.message;
    var note = req.body.note;
    var pseudo = req.session.pseudo;
    Detail.find({
        _id : idDetail
    }).exec(function(err , detail){
        console.log(detail.Avis);
        detail.Avis.push({
            pseudo : pseudo,
            message : comment,
            note : note
        }).save(function(err , avis){
            console.log(avis);
            res.writeHead(302 , "/"+idDetail);
            res.end();
        });
    });


});

module.exports = router;