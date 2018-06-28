(function() {
    app.controller('registerController', ['$scope', '$rootScope', 'trendingPropService', '$window',
        function($scope, $rootScope, trendingPropService, $window) {
            $scope.onRegister = function() {
                trendingPropService.register($scope.name, $scope.mail, $scope.password).then(function success(response) {
                        $scope.registered = true;
                        $scope.registrationMessage = "Thank you for registering with Suresh Realtors!";

                    },
                    function failure(errorMsg) {
                        $scope.registered = false;

                    })

            }
            $scope.onLogin = function() {
                trendingPropService.onlogIn($scope.logIn_mail, $scope.logIn_pwd)
                    .then(function success(response) {
                            $rootScope.loggedIn = true;
                            $rootScope.username = response[0].Name;
                            $window.history.back();


                        },
                        function failure(errorMsg) {


                        })

            }
            activate();



            function activate() {


            }


        }
    ])

})();