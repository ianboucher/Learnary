(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("ModalCtrl", ["$scope", "$http", "$uibModalInstance", "$log", "roles", "user",
            function ModalCtrl($scope, $http, $uibModalInstance, $log, roles, user)
            {
                // user and roles are passed in via the 'resolve' property of
                // uibModal.

                $scope.currentRoleIds = [];

                // iterate over the roles already assigned to the user that is
                // being edited, get their ids and set their status to 'true' (to
                // set-up the checkboxes)

                user.roles.forEach(function(role)
                {
                    $scope.currentRoleIds[role.id] = true;
                })


                $scope.submit = function()
                {
                    var updatedRoleIds = [];
                    var postData = {};

                    for (var key in $scope.currentRoleIds)
                    {
                        if ($scope.currentRoleIds[key])
                        {
                            updatedRoleIds.push(key);
                        }
                    }

                    postData = { roles: updatedRoleIds, email: user.email };

                    $http.post("/api/v1.0.0/roles", postData ).then (
                        function(response)
                        {
                            $uibModalInstance.close(response.data)
                        },
                        function(error)
                        {
                            // TODO: Handle error
                            console.log(error);
                        }
                    );
                }


                $scope.cancel = function()
                {
                    $uibModalInstance.dismiss("cancel");
                };
            }
        ]);
})();
