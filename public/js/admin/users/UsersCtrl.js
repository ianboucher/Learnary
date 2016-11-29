(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("UsersCtrl", ["$scope", "$http", "$uibModal",
            function UsersCtrl($scope, $http, $uibModal)
            {
                var self = this;

                self.userData;
                self.error;

                $http.get("api/v1.0.0/users").then (
                    function(users)
                    {
                        self.userData = users.data;
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
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                    }
                );


                self.launchModal = function(user)
                {
                    console.log(user);
                    self.selectedRoles = {};

                    user.roles.forEach(function(role)
                    {
                        self.selectedRoles[role.id] = true;
                    });

                    var modalInstance = $uibModal.open(
                    {
                        component: 'modalComponent',
                        resolve: {
                            items: function()
                            {
                                return self.roles;
                            },
                            selected: function()
                            {
                                return self.selectedRoles;
                            }
                        }
                    });

                    modalInstance.result.then (
                        function(selectedRoles)
                        {
                            var updatedRoleIds = [];
                            var postData = {};

                            for (var id in selectedRoles)
                            {
                                if (selectedRoles[id])
                                {
                                    updatedRoleIds.push(id);
                                }
                            }

                            postData = { roles: updatedRoleIds, email: user.email };

                            return $http.post("/api/v1.0.0/roles", postData);
                        }
                    ).then (
                        function(updatedRoles)
                        {
                            user.roles = updatedRoles.data;
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
