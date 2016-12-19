var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    details: String,
    date: Date,
    refereeId : String,
    coachId : String,
    status: {type : String, default: 'PENDIENTE'}
});

module.exports = mongoose.model('Task', TaskSchema);