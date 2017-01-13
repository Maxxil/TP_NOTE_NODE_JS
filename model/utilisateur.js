/**
 * Created by Massil on 13/01/2017.
 */
var db = require("./../config/db");

var Schema = db.Schema;

var utilisateur = new Schema({
    pseudo: "String",
    password : "String",
    salt : "String",
    autorisation : "String",
    connecte : "Boolean"
});

module.exports = db.model("Utilisateur" , utilisateur);