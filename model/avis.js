var db = require('../config/db');
var Detail = require('./detail');

var Schema = db.Schema;

var avisSchema = new Schema({
  pseudo: 'String',
  message: 'String',
  note: 'int'
});

var Avis = db.model('Avis', avisSchema);

module.exports = Avis;