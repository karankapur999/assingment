'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RecordsSchema = new Schema({
  'key': {type: String},
  'value': {type: String},
  'counts': {type: Array},
  'createdAt': {type: Date,default:Date.now() },
});

module.exports = mongoose.model('records', RecordsSchema);
