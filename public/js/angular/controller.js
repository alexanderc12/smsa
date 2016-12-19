var app = angular.module('refereeApp', ['ngSanitize']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

function generalController($http, $scope) {
    $scope.controller.loginForm = {name: '', password: '' ,rol: 'referee'};
    $scope.controller.isShowError = false;
    this.login = function () {
        $http.post('/login', $scope.controller.loginForm)
            .then(function (res) {
                if (res.data.success) {
                    if($scope.controller.loginForm.rol === 'referee'){
                        window.location = '/referee';
                        window.sessionStorage['refereeId'] = res.data.refereeId;
                    }else{
                        window.location = '/coach';
                    }
                } else {
                    $scope.controller.isShowError = true;
                }
            }, function (res) {
                $scope.controller.isShowError = true;
            });
    };
    this.logOut = function () {
        window.sessionStorage.clear();
        window.location = '/';
    }
}

app.controller('GeneralController', ['$http', '$scope', generalController]);