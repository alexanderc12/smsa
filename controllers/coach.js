var express = require('express');
var router = express.Router();
var Referee = require('../models/referee');
var Assignment = require('../models/assignment');
var Report = require('../models/report');
var Task = require('../models/task');

router.get('/', function(req, res) {
    res.render('coach');
});

router.get('/refereeList', function(req, res) {
    Assignment.find({
        'coachId': req.session.coachId
    },'-_id refereeId', function(err, assigmentList) {
        if (err) console.log(err);
        var list = [];
        for (var i = 0; i < assigmentList.length; i++) {
            list.push(assigmentList[i].refereeId);
        }
        Referee.find({'_id': {$in : list}}).exec(
            function (err, refereeList) {
                if (err) console.log(err);
                res.send({referees: refereeList});
            }
        );
    });
});

router.get('/profile/:id', function(req, res) {
   var profile = {};
    Referee.findOne({'_id': req.params.id}).exec(
        function (err, referee) {
            if (err) console.log(err);
            profile.referee = referee;
            Report.find({refereeId: req.params.id}).exec(
                function (err, reports) {
                    if (err) console.log(err);
                    profile.reports = reports;
                    Task.find({refereeId: req.params.id}).exec(
                        function (err, tasks) {
                            if (err) console.log(err);
                            profile.tasks = tasks;
                            res.send({profile: profile});
                        }
                    )
                }
            );
        }
    );
});

router.post('/addReport', function(req, res) {
    var report = new Report({
        weight: req.body.weight,
        details: req.body.details,
        date: req.body.date,
        concept: req.body.concept,
        refereeId : req.body.refereeId[0],
        coachId : req.session.coachId
    });
    var promise = report.save();
    promise.then(function () {
        res.send({success: true});
    });
});

router.post('/addTask', function(req, res) {
    var task = new Task({
        details: req.body.details,
        date: req.body.date,
        refereeId : req.body.refereeId[0],
        coachId : req.session.coachId
    });
    var promise = task.save();
    promise.then(function () {
        res.send({success: true});
    });
});

module.exports = router;