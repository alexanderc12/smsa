var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RefereeSchema = new Schema({
    _id: String,
    name : String,
    lastName: String,
    bornDate: Date,
    height: Number,
    country: String,
    photo: String
});

module.exports = mongoose.model('Referee', RefereeSchema);