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


                $scope.launchModal = function(perm)
                {
                    var modalInstance = $uibModal.open(
                    {
                        templateUrl : "/js/modal/modal.html",
                        controller  : "ModalCtrl",
                        scope       : $scope,
                        resolve:
                        {
                            roles: function()
                            {
                                return self.permissions;
                            },
                            user: function()
                            {
                                return perm;
                            }
                        }
                    });

                    modalInstance.result.then(function(perms)
                    {
                        role.permsissions = perms;
                    })
                };
            }
        ]);
})();
