(function() {

    app.controller('homeController', ['$scope', '$location', '$http', '$q', '$rootScope',
        function($scope, $location, $http, $q, $rootScope) {
            $scope.onLogOut = function() {
                $rootScope.loggedIn = false;
            }

            //Add a logic to route to the sumbit property page
            $scope.onSubmit = function() {
                $location.path('/submitProperty');
            }
            $scope.onBuySelected = function() {
                $scope.buy = true;
                $scope.rent = false;
            }
            $scope.onRentSelected = function() {
                $scope.rent = true;
                $scope.buy = false;
            }
            $scope.fetchLocations = function() {
                $scope.locations = [];
                // logic to get the locations based on user entered text
                // make sure to avoid the duplicate locations.

                var locationPromise = $q.defer();
                // end point URL - http://localhost:3000/api/getLocations/ +locationText

                $http.get('http://localhost:3000/api/getLocations/' + $scope.locationText)
                    .then(
                        function success(response) {
                            if (response.status == 200 && response.data.length > 0) {
                                // good response
                                response.data.forEach(function(property, index, array) {
                                    // to avoid a duplicates
                                    if ($scope.locations.indexOf(property.City) <= -1) {
                                        $scope.locations.push(property.City);
                                    } else {
                                        // ignore.. it's already added.
                                    }
                                })

                                console.log($scope.locations);


                            } else {

                            }
                        },
                        function failure() {

                        })

                return locationPromise.promise;
            }
            $scope.setLocation = function(index) {
                $scope.locationText = $scope.locations[index];
                // clearing the drop down data after user selection
                $scope.locations = [];
            }
            $scope.onSearch = function() {
                //route state : /showProperties/Apartment/Montreal/false/true
                $location.path('/showProperties/' + $scope.type + '/' + $scope.locationText + '/' + $scope.rent + '/' + $scope.buy)
            }
        }
    ])


})();