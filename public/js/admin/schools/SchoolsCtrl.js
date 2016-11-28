(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("SchoolsCtrl", ["$scope", "$http", "$uibModal",
            function SchoolsCtrl($scope, $http, $uibModal)
            {
                var self = this;

                self.userData;
                self.error;

                $http.get("api/v1.0.0/schools").then (
                    function(schools)
                    {
                        self.schoolsData = schools.data;
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
                        self.groups = groups.data;
                    },
                    function(error)
                    {
                        self.error = error.data.error;
                        console.log(self.error); // TODO: handle error properly
                    }
                );


                // $scope.launchModal = function(user)
                // {
                //     var modalInstance = $uibModal.open(
                //     {
                //         templateUrl : "/js/modal/modal.html",
                //         controller  : "ModalCtrl",
                //         scope       : $scope,
                //         resolve:
                //         {
                //             roles: function()
                //             {
                //                 return self.roles;
                //             },
                //             user: function()
                //             {
                //                 return user;
                //             }
                //         }
                //     });
                //
                //     modalInstance.result.then(function(roles)
                //     {
                //         user.roles = roles;
                //     })
                // };
            }
        ]);
})();
