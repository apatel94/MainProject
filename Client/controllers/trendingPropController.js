(function () {
    app.controller('trendingPropController', ['$scope', 'trendingPropService', '$location','$rootScope',
        function ($scope, trendingPropService, $location, $rootScope) {

            $scope.onViewMore = function () {
                $scope.displayCount = $scope.displayCount + 6;
                $scope.viewMore = $scope.displayCount < $scope.trendingProperties.length;
            }

            activate();

            function activate() {
                trendingPropService.getTrendingProp().then(
                    function suc(res)
                    {
                        // this will hold all the record / properties from the table.
                        $scope.trendingProperties = res;
                        // check the properties length and if it is more than '6' assign a '6' as displaycount
                        // otherwise consider the properties length as a displaycount.
                        $scope.displayCount = $scope.trendingProperties.length > 6 ? 6 : $scope.trendingProperties.length;

                        $scope.viewMore = $scope.displayCount < $scope.trendingProperties.length;
                    },
                    function fail(fail)
                    {
                    })
            }
        

    }])
  
})();