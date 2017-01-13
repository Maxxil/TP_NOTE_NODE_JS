/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();

router.get("/" , function(req , res){
    res.render("./../views/index.html");
});

module.exports = router;