/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();
var film = require("./../model/film");

router.get("/" , function(req , res){
    film.find({}).exec(function(err , data){
        res.render("./../views/index.html" , {data : data });
    });
});

router.get("/:idDetail" , function (req , res) {
    console.log("coucou");
    film
        .find({_id : req.params.idDetail})
        .exec(function (err , data) {
            res.render("./../views/detail.html" , {data : data});
        });
});

module.exports = router;