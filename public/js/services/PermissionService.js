(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("PermissionService", ["$http", "$auth",
            function PermissionService($http, $auth)
            {
                var self = this;
                var data = {};

                self.loadPermissions = function()
                {
                    return $http.get("api/v1.0.0/permissions/all")
                        .then(function(permissions)
                        {
                            return data.permissions = permissions.data;
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


                self.getPermissions = function()
                {
                    return data.roles;
                };


                self.editPermission = function(permission)
                {
                    return $http.post("/api/v1.0.0/permissions/" + permission.id, {
                        "permissions" : permission
                    });
                };


                self.deletePermission = function(permission)
                {
                    $http.delete("/api/v1.0.0/permissions/" + permission.id);
                };


                self.data = data;
                return self;
            }
        ])
})();
