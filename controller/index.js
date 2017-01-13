/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();

router.use("/" , require("./home-controller"));
router.use("/connexion", require("./connexion-controller"));
router.use("/inscription" , require("./inscription-controller"));

module.exports = router;