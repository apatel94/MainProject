(function () {
    app.controller('submitPropertyController', ['$scope', '$q', '$http','$window','$location',
        function ($scope, $q, $http, $window, $location) {

            $scope.onNext = function () {
                // take the current step value
                var currentStep = $scope.step;

                switch (currentStep) {
                    case 1:
                        $scope.step = 2;
                        break;
                    case 2:
                        $scope.step = 3;
                        break;
                    case 3:
                        $scope.step = 4;
                        break;
                    case 4:
                        $scope.step = 5;
                        break;
                        // there is no next afer step 5.
                    default:
                        $scope.step = 1;
                }
            }

            $scope.onPrevious = function () {
                // take the current step value
                var currentStep = $scope.step;

                switch (currentStep) {
                    // there is no previous for step 1.
                    case 2:
                        $scope.step = 1;
                        break;
                    case 3:
                        $scope.step = 2;
                        break;
                    case 4:
                        $scope.step = 3;
                        break;
                    case 5:
                        $scope.step = 4;
                        break;
                      
                    default:
                        $scope.step = 1;
                }
            }

            $scope.onFinish = function () {
                // Issue a http post call to server.
                // End point to post data - http://localhost:3000/api/product
                var body = {
                    Address: $scope.Address,
                    AgentAddress: $scope.AgentAddress,
                    AgentContact: $scope.AgentContact,
                    AgentDetails: $scope.AgentDetails,
                    AgentMail: $scope.AgentMail,
                    AgentName: $scope.AgentName,
                    Amenities: additionalDetails,
                    AdditionalDetails: { Parking: $scope.add.Parking, View: $scope.add.View, Builtin: $scope.add.BuiltIn, WaterFront: $scope.add.WaterFront, View: $scope.add.View },
                    Area: $scope.Area,
                    Availability: $scope.Availability,
                    Balcony: $scope.Balcony,
                    Bath: $scope.Bath,
                    Bed: $scope.Bed,
                    Builtin: $scope.Builtin,
                    CarGarages: $scope.CarGarages,
                    City: $scope.City,
                    Description: $scope.Description,
                    Facing: $scope.Facing,
                    Gated: $scope.Gated,
                    Id: $scope.Id,
                    Kitchen: $scope.Kitchen,
                    Parking: $scope.add.Parking,
                    posted: $scope.posted,
                    Price: $scope.Price,
                    Propimages: $scope.Propimages,
                    State: $scope.State,
                    Summary: $scope.Summary,
                    Status: $scope.Status,
                    Type: $scope.Type,
                    Password: $scope.Password
                };

                var config = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };

                var submitPropPromise = $q.defer();
                // Issue a http post call to store the data
                $http.post('http://localhost:3000/api/product', body, config)
                    .then(
                    function success(response)
                    {
                        if (response.status == 200 && response.data != undefined) {
                            $window.alert("Your property details submitted successfully!");
                            submitPropPromise.resolve("Success");
                            $location.path('/home');
                        } else {
                            $window.alert("Hey, There is some error. Try Again!");
                            submitPropPromise.reject("Fail");
                        }
                    },
                    function failure(errorMessage)
                    {
                        $window.alert("Hey, There is some error. Try Again!");
                        submitPropPromise.reject("Fail");
                    })

                return submitPropPromise.promise;
            }
            var additionalDetails = [];
            $scope.onCheckBoxSelected = function (detail) {
                // check the selected detail is already selected?
                if (additionalDetails.indexOf(detail) === -1) {
                    additionalDetails.push(detail);
                } else {
                    // remove the detail from array, uncheck logic
                    additionalDetails.splice(additionalDetails.indexOf(detail), 1);
                }
            }

       activate();

        function activate() {
            $scope.step = 1;
            $scope.AdditionalDetails =
                ['Swimming Pool',
                    '2 Stories',
                    'Emergency Exit',
                    'Fire Place',
                    'Laundry Room',
                    'Jog Path',
                    'Ceilings',
                    'Parking'];
        }

    }])

})();