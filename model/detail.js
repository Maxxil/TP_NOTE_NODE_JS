var db = require('../config/db');
var Film = require('./film');

var Schema = db.Schema;

var detailSchema = new Schema({
    dateAjout: 'String',
    Description: 'String',
    Avis : [{type : Schema.Types.ObjectId , ref : 'Avis'}]
});

var Detail = db.model('Detail', detailSchema);

module.exports = Detail;