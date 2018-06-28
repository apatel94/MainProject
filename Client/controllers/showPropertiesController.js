(function() {
    app.controller('showPropertiesController', ['$scope', '$routeParams', 'trendingPropService', '$location', function($scope, $routeParams, trendingPropService, $location) {
        $scope.onChange = function(value) {
            $scope.grid = value;

        }
        $scope.onFilter = function(value) {
            if (value) {
                $scope.orderby = 'posted';
            } else {
                $scope.orderby = 'Price';
            }
        }
        activate();

        function activate() {

            $scope.perPage = 3;

            // issue a call to service to fetch the data according to user selection.
            trendingPropService.getShowProperties($routeParams.type, $routeParams.location,
                $routeParams.rent, $routeParams.buy).then(

                function success(response) {
                    // capture all the data and assign it to $scope.

                    $scope.showProperties = response;
                },
                function failure(errorMessage) {

                }
            )
        }


    }])

})();