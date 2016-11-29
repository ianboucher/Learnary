(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("AdminService", ["$http", "$rootScope", "$auth", "$state", "$window",
            function AdminService($http, $rootScope, $auth, $state, $window)
            {
                var self = this;

                $http.get("api/v1.0.0/users").then (
                    function(users)
                    {
                        self.users = users.data;
                        $rootScope.$broadcast("users loaded");
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                        // window.alert("Unable to retrieve user data")
                    }
                );


                $http.get("api/v1.0.0/roles/all").then (
                    function(roles)
                    {
                        self.roles = roles.data;
                        $rootScope.$broadcast("roles loaded");
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                    }
                );


                $http.get("api/v1.0.0/permissions/all").then (
                    function(permissions)
                    {
                        self.permissions = permissions.data;
                        $rootScope.$broadcast("permissions loaded");
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                    }
                );


                $http.get("api/v1.0.0/schools").then (
                    function(schools)
                    {
                        self.schools = schools.data;
                        $rootScope.$broadcast("schools loaded");
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                        // window.alert("Unable to retrieve user data")
                    }
                );


                $http.get("api/v1.0.0/groups").then (
                    function(groups)
                    {
                        self.groups = groups.data;
                        $rootScope.$broadcast("groups loaded");
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                    }
                );

                return self;
            }
        ])
})();
