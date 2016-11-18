(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("SessionService", ["$http", "$rootScope", "$auth", "$state",
            function SessionService($http, $rootScope, $auth, $state)
            {
                var self = this;

                self.loginError = false;
                self.loginErrorText;

                self.login = function(credentials)
                {
                    $auth.login(credentials).then(
                        function()
                        {
                            // Return request to allow '.then' chain to be flattened
                            return $http.get("api/v1.0.0/users/show");
                        },
                        function(error)
                        {
                            // TODO: Handle error properly
                            self.loginError = true;
                            self.loginErrorText = error.data.error;
                            window.alert("Email or password invalid")
                        }
                    ).then (
                        function(users)
                        {
                            self.currentUser = users.data.user;

                            self.authenticated = true;

                            $state.go("users");

                            // TODO: Store user in browser's localStorage?

                            return $http.get("api/v1.0.0/roles");
                        }
                    ).then (
                        function(roles)
                        {
                            self.currentUser.roles = roles.data;

                            return $http.get("api/v1.0.0/permissions")
                        }
                    ).then (
                        function(permissions)
                        {
                            self.currentUser.permissions = permissions.data;
                        }
                    );
                };


                self.logout = function()
                {
                    $auth.logout().then(
                        function(response)
                        {
                            self.currentUser   = null;
                            self.authenticated = false;
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







                // self.getUser = function(email)
                // {
                //     // TODO: There HAS to be a better way to do this!!
                //     $http.get("/api/v1.0.0/users/show?email=" + email ).then (
                //
                //         function(response)
                //         {
                //             self.currentUser = response.data;
                //             $rootScope.$broadcast("login");
                //         },
                //         function(error)
                //         {
                //             throw error;
                //         }
                //     );
                // };

                return self;
            }
        ])
})();
