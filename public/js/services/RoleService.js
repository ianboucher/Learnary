(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("RoleService", [
            "$http",
            "$auth",
            "$cacheFactory",

            function RoleService($http, $auth, $cacheFactory)
            {
                var self = this;
                var data = {};
                var $httpDefaultCache = $cacheFactory.get("$http");

                self.loadRoles = function()
                {
                    return $http.get("api/v1.0.0/roles", { "cache" : true })
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
                    $httpDefaultCache.remove("api/v1.0.0/roles");

                    return $http.post("/api/v1.0.0/roles", {
                        "role" : role
                    });
                };


                self.editRole = function(role)
                {
                    $httpDefaultCache.removeAll();

                    return $http.put("/api/v1.0.0/roles/" + role.id, {
                        "role" : role
                    });
                };


                self.deleteRole = function(role)
                {
                    $httpDefaultCache.removeAll();
                    $http.delete("/api/v1.0.0/roles/" + role.id);
                };


                self.managePermissions = function(role, permissionIds)
                {
                    $httpDefaultCache.removeAll();

                    return $http.put("/api/v1.0.0/role-permissions/" + role.id, {
                        "permissions" : permissionIds
                    });
                };


                self.data = data;
                return self;
            }
        ])
})();
