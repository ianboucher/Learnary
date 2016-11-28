(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("PermissionsCtrl", ["$scope", "$http", "$uibModal",
            function PermissionsCtrl($scope, $http, $uibModal)
            {
                var self = this;

                self.userData;
                self.error;

                $http.get("api/v1.0.0/permissions/all").then (
                    function(permissions)
                    {
                        self.permissionsData = permissions.data;
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


                $scope.launchModal = function(user)
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
                                return self.roles;
                            },
                            user: function()
                            {
                                return user;
                            }
                        }
                    });

                    modalInstance.result.then(function(roles)
                    {
                        user.roles = roles;
                    })
                };
            }
        ]);
})();
