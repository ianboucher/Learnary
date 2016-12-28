(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("RoleService", ["$http", "$auth",
            function RoleService($http, $auth)
            {
                var self = this;
                var data = {};

                self.loadRoles = function()
                {
                    return $http.get("api/v1.0.0/roles")
                        .then(function(roles)
                        {
                            return data.roles = roles.data;
                        })
                        .catch(function(error)
                        {
                            self.error = error;
                            console.log(self.error); // TODO: handle error properly
                            // window.alert("Unable to retrieve Role data")

                            // use Bootstrap flash classes. Flash service/controller
                            // remember to clear the error message somehow - eg close
                            // button.
                        });
                };


                self.getRoles = function()
                {
                    return data.roles;
                };


                self.addRole = function(role)
                {
                    return $http.post("/api/v1.0.0/roles", {
                        "role" : role
                    });
                };


                self.editRole = function(role)
                {
                    return $http.put("/api/v1.0.0/roles/" + role.id, {
                        "role" : role
                    });
                };


                self.deleteRole = function(role)
                {
                    $http.delete("/api/v1.0.0/roles/" + role.id);
                };


                self.managePermissions = function(role, permissionIds)
                {
                    return $http.put("/api/v1.0.0/role-permissions/" + role.id, {
                        "permissions" : permissionIds
                    });
                };


                self.data = data;
                return self;
            }
        ])
})();
