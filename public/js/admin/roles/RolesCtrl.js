(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("RolesCtrl", ["$scope", "$http", "$uibModal",
            function RolesCtrl($scope, $http, $uibModal)
            {
                var self = this;

                self.userData;
                self.error;

                $http.get("api/v1.0.0/roles/all").then (
                    function(roles)
                    {
                        console.log(roles.data);
                        self.roleData = roles.data;
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                        // window.alert("Unable to retrieve user data")
                    }
                );


                $http.get("api/v1.0.0/permissions/all").then (
                    function(permissions)
                    {
                        console.log(permissions.data);
                        self.permissions = permissions.data;
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                    }
                );


                self.launchModal = function(role)
                {
                    console.log(role);
                    self.selectedPerms = {};

                    role.perms.forEach(function(role)
                    {
                        self.selectedPerms[perm.id] = true;
                    });

                    var modalInstance = $uibModal.open(
                    {
                        component: 'modalComponent',
                        resolve: {
                            items: function()
                            {
                                return self.permissions;
                            },
                            selected: function()
                            {
                                return self.selectedRoles;
                            }
                        }
                    });

                    modalInstance.result.then (
                        function(selectedPerms)
                        {
                            var updatedPermIds = [];
                            var postData = {};

                            for (var id in selectedPerms)
                            {
                                if (selectedPerms[id])
                                {
                                    updatedPermIds.push(id);
                                }
                            }

                            postData = { permissions: updatedPermIds, role: role.name };

                            return $http.post("/api/v1.0.0/permissions", postData);
                        }
                    ).then (
                        function(updatedPerms)
                        {
                            role.perms = updatedPerms.data;
                        },
                        function(error)
                        {
                            console.log("modal cancelled");
                        }
                    );
                };
            }
        ]);
})();
