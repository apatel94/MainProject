(function() {

    app.factory('trendingPropService', trendingPropService);

    trendingPropService.$inject = [
        '$q',
        '$timeout',
        '$http'

    ];

    function trendingPropService($q, $timeout, $http) {
        var service = {};
        // empty array to store the all the properties later
        var trendingProp = [];
        // Ex: Qc / sale
        service.getSimilarProp = function(city, type, id) {
            var similarProp = [];
            // logic to get the similar prop
            // trendingProp = [prop1, prop2, prop3]
            trendingProp.forEach(function(property, index, array) {
                // each iteration, query the location and type to match with 
                // parameters passed from controller.
                if (property.City == city && property.Type == type) {
                    // check the current property to avoid duplicates
                    if (property._id !== id) {
                        similarProp.push(property);
                    }
                }

            })

            return similarProp;
        }

        service.getTrendingProp = function() {
            var defer = $q.defer();
            // the below end point will give all the properties list from DB
            $http.get('http://localhost:3000/api/buy').then(
                function success(response) {
                    if (response.status == 200 && response.data.length > 0) {
                        // local storage to store all the properties.
                        trendingProp = response.data;
                        defer.resolve(response.data);
                        console.log(response.data);
                    }
                },
                function failure(error) {
                    console.log("There is some error");
                    defer.reject("Some error!")
                })

            return defer.promise;
        }

        service.getPropertyByID = function(id) {
            var defer = $q.defer();
            // issue a http call to the end point : api/getPropertyById/<<id>>
            $http.get('http://localhost:3000/api/getPropertyById/' + id).then(
                function success(response) {
                    if (response.status == 200 && response.data.length > 0) {
                        // resolve the promise.
                        defer.resolve(response.data[0]);
                    } else {
                        // reject
                    }
                },
                function fail(error) {
                    defer.reject(error);
                }

            )

            return defer.promise;
        }

        service.getShowProperties = function(type, location, rent, buy) {
            var status = rent === 'true' ? 'Rent' : buy === 'true' ? 'Sell' : 'All';

            var showPropPromise = $q.defer();
            // End point url to be called - ??
            //http://localhost:3000/api/getPropertiesByLocation/Montreal/Apartment/Sale
            $http.get('http://localhost:3000/api/getPropertiesByLocation/' + location + '/' + type + '/' + status)
                .then(
                    function success(response) {
                        if (response.status == 200 && response.data.length > 0) {
                            showPropPromise.resolve(response.data);
                            console.log(response.data);
                        } else {
                            showPropPromise.reject("No Properties to match with user search");
                        }
                    },
                    function failure(errorMessage) {
                        showPropPromise.reject("There is some error");
                    }
                )

            return showPropPromise.promise;
        }
        service.register = function(name, email, password) {
            var registerPromise = $q.defer();
            //http://localhost:3000/api/registerUser'
            var body = {
                Name: name,
                Mail: email,
                Password: password

            };
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            $http.post('http://localhost:3000/api/registerUser', body, config).then(
                function success(response) {
                    if (response.status == 200 && response.data != undefined) {

                        registerPromise.resolve("Success");


                    } else {

                        registerPromise.reject("Failure");
                    }

                },
                function failure(errorMsg) {
                    registerPromise.reject("Failure");

                }
            )



            return registerPromise.promise;

        }
        service.onlogIn = function(mail, pwd) {
            var loginPromise = $q.defer();
            $http.get('http://localhost:3000/api/logIn/' + mail + '/' + pwd).then(function success(response) {
                if (response.status == 200 && response.data.length > 0) {

                    loginPromise.resolve(response.data);


                } else {

                    loginPromise.reject("Failure");
                }

            }, function failure(errorMsg) {
                loginPromise.reject("Failure");

            })


            return loginPromise.promise;
        }

        return service;
    }


})();