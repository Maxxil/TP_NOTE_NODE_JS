var db = require('../config/db');
var Film = require('./film');
var Avis = require('./avis');

var Schema = db.Schema;

var detailSchema = new Schema({
  dateAjout: 'String',
  Sypnosis: 'String'
});

var Detail = db.model('Detail', detailSchema);

module.exports = Detail;