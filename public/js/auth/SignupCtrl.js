(function(){

    "use strict";

    angular
        .module("learnary")
        .controller("SignupCtrl", ["$scope", "$auth", "$http", "$state", "SessionService",
            function SignupCtrl($scope, $auth, $http, $state, SessionService)
            {
                var self = this;
                $scope.credentials = {};
                $scope.credentials.role = "student";

                // QUESTION: I need to provide the option of specifying a school
                // or class/group for the user to join on signing-up. How should
                // this work?
                // My thoughts:
                // * I guess schools should only be created by admins
                // * User probably needs a searchable list of schools/classes to
                //   choose from.
                // * Upon specifying a valid school/class, do I need to create
                //   specific endpoints to assign the user to the school/class
                //   via a belongsTo relationship?

                // QUESTION: Should this sign-up procedure come under a UserCtrl
                // as it is effectively creating a new user and assigning a role
                // to them?


                self.signup = function()
                {
                    $auth.signup($scope.credentials).then (

                        function(response)
                        {
                            $auth.setToken(response.data.token);

                            // QUESTION: The request below assigns a role to the
                            // new user. At the moment, the value of 'role'
                            // (staff or student) is determined by a checkbox;
                            // how could I stop students signing up as staff and
                            // getting the associated permissions?

                            return $http.post("/api/v1.0.0/roles", { role: $scope.credentials.role } );
                        },
                        function(error)
                        {
                            console.log(error); // TO-DO: Handle error properly (how?)
                            window.alert("Login failed - email or password are incorrect")
                        }
                    ).then (

                        function(response)
                        {
                            SessionService.login($scope.credentials);
                            $state.go("users", {});
                        }
                    );
                };
            }
        ]);
})();
