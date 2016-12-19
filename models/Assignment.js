var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
    refereeId : String,
    coachId : String
});

module.exports = mongoose.model('Assignment', AssignmentSchema);