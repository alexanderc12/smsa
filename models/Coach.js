var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoachSchema = new Schema({
    _id: String,
    name : String,
    password : String,
    photo: String
});

module.exports = mongoose.model('Coach', CoachSchema);