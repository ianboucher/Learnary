(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("SessionService", ["$http", "$rootScope", "$auth", "$state", "$window",
            function SessionService($http, $rootScope, $auth, $state, $window)
            {
                var self = this;

                self.isAuthenticated = false;

                if ($window.localStorage["currentUser"])
                {
                    // QUESTION: What should I do here to handle the situation
                    // where a previous user hasn't logged-out, leaving their data
                    // in localStorage?
                    self.currentUser = JSON.parse($window.localStorage["currentUser"]);
                    self.isAuthenticated = $auth.isAuthenticated();
                }


                self.loginError = false;
                self.loginErrorText;

                // QUESTION: As the User/Role/Permission data are handled by
                // different controllers, I've performed 3 separate HTTP requests
                // to retrieve the currentUser data. Is this OK? It seems somewhat
                // inefficent...

                // QUESTION: What else should I include in my SessionService at
                // the moment?

                self.login = function(credentials, nextState)
                {
                    $auth.login(credentials).then (

                        function()
                        {
                            return $http.get("api/v1.0.0/users/show");
                        },
                        function(error)
                        {
                            // TODO: Handle error properly
                            // QUESTION: What's the best way to hanlde these kind of errors?
                            self.loginError     = true;
                            self.loginErrorText = error.data.error;
                            window.alert("Email or password invalid");
                        }
                    ).then ( // Retrieve the authenticated current user

                        function(users)
                        {
                            self.currentUser     = users.data.user;
                            self.isAuthenticated = $auth.isAuthenticated();

                            return $http.get("api/v1.0.0/roles");
                        }
                    ).then ( // Retrieve the current user's roles

                        function(roles)
                        {
                            // TODO: Consider checking roles by email rather than
                            // by getting the user from the token. This would
                            // allow an admin to retrieve roles belonging to other
                            // users.
                            self.currentUser.roles = roles.data;

                            return $http.get("api/v1.0.0/permissions");
                        }
                    ).then ( // Retrieve the current user's permissions

                        function(permissions)
                        {
                            self.currentUser.permissions = permissions.data;
                            $rootScope.$broadcast("login");
                            $window.localStorage.setItem("currentUser", angular.toJson(self.currentUser));

                            if (nextState)
                            {
                                $state.go(nextState);
                            }
                        }
                    );
                };


                self.logout = function()
                {
                    $auth.logout().then (

                        function(response)
                        {
                            $window.localStorage.removeItem("currentUser");
                            self.currentUser     = null;
                            self.isAuthenticated = false;
                            $state.go("landing");
                        },
                        function(error)
                        {
                            console.log(error.data);
                            window.alert("There was a problem logging you out. Please try again.")
                        }
                    );
                };


                self.checkRole = function(role)
                {
                    return self.currentUser.roles.hasOwnProperty(role);
                }


                self.checkPermission = function(permission)
                {
                    return self.currentUser.permissions.hasOwnProperty(permission);
                }

                return self;
            }
        ])
})();
