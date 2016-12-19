var express = require('express');
var router = express.Router();
var Referee = require('../models/referee');
var Coach = require('../models/coach');
const REFEREE = "referee";
const COACH = "coach";

var Assignment = require('../models/assignment');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res, next) {
    switch (req.body.rol){
        case REFEREE:
            var query = Referee.findOne({'name': req.body.name});
            query.exec(function(err, referee) {
                if (err) console.log(err);
                if (referee.toObject().password === req.body.password){
                    res.send({success: true, refereeId: referee._id});
                } else
                    res.send({success: false});
            });
            break;
        case COACH:
            Coach.findOne({
                'name': req.body.name
            }, function(err, coach) {
                if (err) console.log(err);
                if (coach.toObject().password === req.body.password) {
                    req.session.coachId = coach._id;
                    res.send({success: true});
                } else
                    res.send({success: false});
            });
            break;
    }
});

module.exports = router;
