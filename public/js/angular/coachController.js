function coachController($http, $scope, $sce) {
    $scope.coach.referees = [];
    $scope.coach.report = {};
    $scope.coach.task = {};
    $scope.coach.profile = {};

    this.loadList = function () {
        $http.get('/coach/refereeList').then(function (res) {
            $scope.coach.referees = res.data.referees;
        }, function () {
            console.log('Error 2');
        });
        $('#summernote').summernote({maxHeight: 300 });
    };
    this.loadList();

    this.showModalAddReport = function (id) {
        $scope.coach.report = {};
        $('#modalAddReport').modal('toggle');
        $scope.coach.report.refereeId = id;
    };

    this.addReport = function () {
        $http.post('coach/addReport', $scope.coach.report).then(function(res) {
            if (res.data.success) {
                $('#modalAddReport').modal('hide');
                $scope.coach.showSuccessReportAlert = true;
            }else{
                console.log('Error.');
            }
        }, function() {
            console.log('Error.');
        });
    };

    this.showModalAddTask = function (id) {
        $scope.coach.task = {};
        $('#summernote').summernote('reset');
        $('#modalAddTask').modal('toggle');
        $scope.coach.task.refereeId = id;
    };

    this.addTask = function () {
        $scope.coach.task.details = $('#summernote').summernote('code');
        $http.post('coach/addTask', $scope.coach.task).then(function(res) {
            if (res.data.success) {
                $('#modalAddTask').modal('hide');
                $scope.coach.showSuccessTaskAlert = true;
            }else{
                console.log('Error.');
            }
        }, function() {
            console.log('Error.');
        });
    };

    this.showModalViewProfile = function (id) {
        $http.get('/coach/profile/' + id).then(function (res) {
            $scope.coach.profile  = res.data.profile;
        }, function () {
            console.log('Error 2');
        });
        $('#modalProfile').modal('toggle');
    };

    this.formatDate = function(date){
        return new Date(date).toLocaleDateString();
    };

    $scope.formatHtml = function (html) {
        return $sce.trustAsHtml(html);
    };
}

app.controller('CoachController', ['$http', '$scope','$sce', coachController]);