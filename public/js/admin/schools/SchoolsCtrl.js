(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("SchoolsCtrl", ["$rootScope", "$scope", "$http", "$uibModal", "AdminService",
            function SchoolsCtrl($rootScope, $scope, $http, $uibModal, AdminService)
            {
                var self = this;

                self.schoolsData = AdminService.schools;
                self.groups      = AdminService.groups;

                $rootScope.$on("schools loaded", function(event)
                {
                    self.schoolsData = AdminService.schools;
                });

                $rootScope.$on("groups loaded", function(event)
                {
                    self.groups = AdminService.groups;
                });

                self.launchModal = function(school)
                {
                    var modalInstance = $uibModal.open(
                    {
                        controller   : "ModalCtrl",
                        controllerAs : "$ctrl",
                        templateUrl  : "/js/modal/button_modal.html",
                        resolve      : {
                            items: function()
                            {
                                return school.groups;
                            },
                            selected: function()
                            {
                                return null;
                            },
                            columns: function()
                            {
                                return ["Name", "Action"];
                            },
                            properties: function()
                            {
                                return ["name"];
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
