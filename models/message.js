var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Word mdoel.
 * Modelga qoshmoqchi bogan attributlarni shu yerga yozamiz.
 */
module.exports = mongoose.model('Message', new Schema({
  content: String,
  date: String,
  user: String
}));
