function refereeController($http, $scope, $sce) {

    $scope.referee.profile = {};

    var getTotal = function(list, concept){
        return list.reduce(function (total, next) {if (next.concept == concept)  return total+=1; else return total;},0);
    };

    this.loadData = function () {
        $http.get('/coach/profile/' + window.sessionStorage['refereeId']).then(function (res) {
            $scope.referee.profile  = res.data.profile;
            var ctx = $("#myChart");
            var ctx2 = $("#myChart2");
            var options = {
                responsive: false,
                maintainAspectRatio: true
            };
            var data = {
                labels: ["Excelente", "Bueno", "Regular", "Insuficiente", "Deficiente"],
                datasets: [
                    {
                        data: [getTotal($scope.referee.profile.reports, "Excelente"), getTotal($scope.referee.profile.reports, "Bueno"),
                            getTotal($scope.referee.profile.reports, "Regular"), getTotal($scope.referee.profile.reports, "Insuficiente"),
                            getTotal($scope.referee.profile.reports, "Deficiente")],
                        backgroundColor: ["#2ecc71", "#3498db", "#95a5a6", "#f1c40f", "#e74c3c"]
                    }]
            };
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options : options
            });

            var dates = $scope.referee.profile.reports.map(function (report) {
                return new Date(report.date).toLocaleDateString();
            });

            var weigths = $scope.referee.profile.reports.map(function (report) {
                return report.weight;
            });
            var data2 = {
                labels: dates,
                datasets: [
                    {
                        label: "Peso en Kg",
                        data: weigths,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)"
                    }
                ]
            };

            var myLineChart = new Chart(ctx2, {
                type: 'line',
                data: data2,
                options: options
            });

        }, function () {
            console.log('Error 2');
        });
    };

    this.formatDate = function(date){
        return new Date(date).toLocaleDateString();
    };

    $scope.formatHtml = function (html) {
        return $sce.trustAsHtml(html);
    };

    this.loadData();
}
app.controller('RefereeController', ['$http', '$scope','$sce', refereeController]);