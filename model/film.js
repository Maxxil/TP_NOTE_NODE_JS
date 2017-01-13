var db = require('../config/db');
var Detail = require('./detail');

var Schema = db.Schema;

var filmSchema = new Schema({
    Titre: 'String',
    Realisateur: 'String',
    dateSortie: 'String',
    Affiche: 'String'
});

var Film = db.model('Film', filmSchema);

module.exports = Film;