angular.module('app', ['ui.router', '720kb.datepicker'])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('addcustomer', {
                url: '/addcustomer',
                params: {user: null},
                template: "<customer></customer>",
            })
            .state('/', {
                url: '/',
                template: "<demo></demo>",
                controller: "baseController"
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $urlRouterProvider.otherwise('/');
    })
    .controller('baseController', ["$timeout", "$scope", "$http", "$state", function ($timeout, $scope, $http, $state) {

        $http.get('/getusers').then(function (res) {
            $scope.data = res.data;
        });

        $scope.edit = function (data) {
            console.log("EDIt", data);
            $scope.User = {
                id: data._id,
                custId: data.customerID,
                name: {
                    first: data.name.first,
                    last: data.name.last
                },
                gender: data.gender,
                birthday: data.birthday,
                contact: data.lastContact,
                cltm: data.customerLifetimeValue
            };
            $state.go('addcustomer', {user: $scope.User})
        };

        $scope.deleteData = function (data) {
            var req = {
                method: 'POST',
                url: '/deletedata',
                accepts: {
                    "Content-Type": "application/json",
                    "dataType": "json"
                },
                data: data
            };
            $http(req).then(function (res) {
                $scope.data = res.data;
                $scope.obj = ''
            });
        };
    }])


    .directive("demo", ["$timeout", "$http", "$state", function ($timeout, $http, $state) {
        return {
            templateUrl: "views/demo.html",
            controller: function ($scope) {
                $scope.addNew = function () {
                    console.log("ADD new====");
                };

                $scope.backBtn = function () {
                    console.log("BAck")
                };
            }
        }
    }])

    .directive("customer", ["$timeout", "$http", "$stateParams", function ($timeout, $http, $stateParams) {
        return {
            templateUrl: 'views/addNew.html',
            controller: function ($scope) {
                $scope.User = {
                    contact: moment().utc().format('YYYY-mm-DDTHH:mm:ss.SSS')+'Z'
                };

                if ($stateParams.user) {
                    $scope.updateCondition = true;

                    $scope.User = {
                        _id: $stateParams.user.id,
                        custId: $stateParams.user.custId,
                        first: $stateParams.user.name.first,
                        last: $stateParams.user.name.last,
                        gender: $stateParams.user.gender,
                        birth: $stateParams.user.birthday,
                        contact: $stateParams.user.contact,
                        cltm: $stateParams.user.cltm
                    };
                }

                $scope.saveClick = function () {
                    var req = {
                        method: 'POST',
                        url: '/save',
                        accepts: {
                            "Content-Type": "application/json",
                            "dataType": "json"
                        },
                        data: $scope.User
                    };
                    $http(req).then(function (res) {
                        $scope.data = res.data;
                        $scope.obj = ''
                    });
                };

                $scope.updateClick = function () {
                    var req = {
                        method: 'POST',
                        url: '/edit',
                        accepts: {
                            "Content-Type": "application/json",
                            "dataType": "json"
                        },
                        data: $scope.User
                    };
                    $http(req).then(function (res) {
                        console.log("RESULT---", res.data);
                        $scope.data = res.data;
                        $scope.$watch('data', function (data) {
                            console.log("NEWE DATA------", data)
                            $scope.data = data;
                        });

                        $scope.obj = ''
                    });

                    $http.get('/getusers').then(function (res) {
                        $scope.data = res.data;
                    });
                };

                $scope.cancelClick = function () {
                    $scope.User = '';
                }


            }
        }
    }]);