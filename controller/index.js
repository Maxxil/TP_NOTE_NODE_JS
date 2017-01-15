/**
 * Created by Massil on 13/01/2017.
 */
var router = require("express").Router();

router.use("/connexion", require("./connexion-controller"));
router.use("/inscription" , require("./inscription-controller"));
router.use("/ajout" , require("./ajout-controller"));
router.use("/comment" , require("./comment-controller"));
router.use("/" , require("./home-controller"));

module.exports = router;