(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("SessionService", ["$http", "$rootScope",
            function SessionService($http, $rootScope)
            {
                var self = this;

                self.getUser = function(email)
                {
                    // TODO: There HAS to be a better way to do this!!
                    $http.get("/api/v1.0.0/users/show?email=" + email ).then (

                        function(response)
                        {
                            self.currentUser = response.data;
                            $rootScope.$broadcast("login");
                        },
                        function(error)
                        {
                            throw error;
                        }
                    );
                };


                self.getRoles = function(email)
                {
                    $http.get("/api/v1.0.0/roles?email=" + email ).then (

                        function(response)
                        {
                            self.currentUser.roles = response.data;
                            console.log(self.currentUser.roles);
                        },
                        function(error)
                        {
                            throw error;
                        }
                    );
                };


                // self.getPermissions = function(email)
                // {
                //     $http.get("/api/v1.0.0/roles?email=" + email ).then (
                //
                //         function(response)
                //         {
                //             self.currentUser.permissions = response.data;
                //             console.log(self.currentUser.permissions);
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
