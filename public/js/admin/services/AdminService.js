(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("AdminService", ["$http", "$auth", "$state", "$window",
            function AdminService($http, $auth, $state, $window)
            {
                var self = this;
                var data = {};

                self.getUsers = function()
                {
                    return data.users;
                };

                self.getRoles = function()
                {
                    return data.roles;
                };

                self.getPermissions = function()
                {
                    return data.permissions;
                };

                self.getSchools = function()
                {
                    return data.schools;
                };

                self.getGroups = function()
                {
                    return data.groups;
                };


                $http.get("api/v1.0.0/users").then (
                    function(users)
                    {
                        data.users = users.data;
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
                        data.roles = roles.data;
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
                        data.permissions = permissions.data;
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
                        data.schools = schools.data;
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
                        data.groups = groups.data;
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                    }
                );

                self.data = data;
                return self;
            }
        ])
})();
