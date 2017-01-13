var db = require('../config/db');

var Schema = db.Schema;

var detailSchema = new Schema({
  dateSortie: 'String',
  dateAjout: 'String',
  Sypnosis: 'String'
});

var Detail = db.model('Detail', detailSchema);

module.exports = Detail;