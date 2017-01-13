var db = require('../config/db');

var Schema = db.Schema;

var filmSchema = new Schema({
    Titre: 'String',
    Réalisateur: 'String',
    Affiche: 'String',
});

var Film = db.model('Film', filmSchema);

module.exports = Film;