(function () {

    app.controller('viewPropController', ['$scope', '$routeParams', 'trendingPropService', '$location',function ($scope, $routeParams, trendingPropService, $location) {

        activate();

        function activate() {
        	var id = $routeParams.id;
        	// call service to get property by Id
        	trendingPropService.getPropertyByID(id).then(
				function succ(res) {
					// res = inside the service response.data[0]
				    $scope.viewPropDetails = res;
				    // get all the additional details key's.
				    $scope.details = Object.keys($scope.viewPropDetails.AdditionalDetails);
				    // O/P of above line : ['WaterFront', 'Parking', 'View',... etc.]
				    $scope.similarProperties =
                        trendingPropService.getSimilarProp($scope.viewPropDetails.City, $scope.viewPropDetails.Type, $scope.viewPropDetails._id);
				}, function fail(error) {

				}

				)
        }

    }])
})();