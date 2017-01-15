/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();
var film = require("./../model/film");
var detail = require("./../model/detail");

router.get("/"  , function(req , res){
    film.find({}).exec(function(err , data){
        res.render("./../views/index.html" , {data : data });
    });
});

router.get("/:idDetail" , function (req , res) {
    film
        .find({_id : req.params.idDetail})
        .populate("Detail")
        .exec(function (err , data) {
            console.log(data);
            console.log(data[0].Detail);
            res.render("./../views/detail.html" , {data : data[0]});
        });
});

module.exports = router;