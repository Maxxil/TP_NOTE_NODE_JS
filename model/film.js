var db = require('../config/db');
var Detail = require('./detail');

var Schema = db.Schema;

var filmSchema = new Schema({
    Titre: 'String',
    Realisateur: 'String',
    dateSortie: 'String',
    Affiche: 'String',
    Detail : {type : Schema.Types.ObjectId , ref : 'Detail'}
});

var Film = db.model('Film', filmSchema);

module.exports = Film;