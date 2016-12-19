var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
    weight: Number,
    details: String,
    date: Date,
    refereeId : String,
    coachId : String,
    concept: String
});

module.exports = mongoose.model('Report', ReportSchema);