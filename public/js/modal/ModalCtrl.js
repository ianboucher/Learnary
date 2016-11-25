(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("ModalCtrl", ["$scope", "$http", "$uibModalInstance", "$log", "roles", "user",
            function ModalCtrl($scope, $http, $uibModalInstance, $log, roles, user)
            {
                $scope.currentRoleIds = [];

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
