/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();

router.use("/" , require("./home-controller"));

module.exports = router;