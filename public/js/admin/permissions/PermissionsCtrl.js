(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("PermissionsCtrl", ["$scope", "$http", "$uibModal", "AdminService",
            function PermissionsCtrl($scope, $http, $uibModal, AdminService)
            {
                var self = this;

                $scope.$watch(function() { return AdminService.data },
                    function()
                    {
                        self.data        = AdminService.getPermissions();
                        self.roles = AdminService.getRoles();
                    }, true
                );


                self.launchModal = function(perm)
                {
                    self.selectedRoles = {};

                    perm.roles.forEach(function(role)
                    {
                        self.selectedRoles[role.id] = true;
                    });

                    var modalInstance = $uibModal.open(
                    {
                        controller   : "ModalCtrl",
                        controllerAs : "$ctrl",
                        templateUrl  : "/js/modal/checkbox_modal.html",
                        resolve      : {
                            items: function()
                            {
                                return self.roles;
                            },
                            selected: function()
                            {
                                return self.selectedRoles;
                            },
                            columns: function()
                            {
                                return ["Role", "Description", "Action"];
                            },
                            properties: function()
                            {
                                return ["display_name", "description"];
                            }
                        }
                    });

                    // TODO: figure out what to do with the modal, if anything

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

                            postData = { roles: updatedRoleIds, permission: perm.name };

                            return $http.post("/api/v1.0.0/permissions/roles", postData);
                        }
                    ).then (
                        function(updatedRoles)
                        {
                            perm.roles = updatedRoles.data;
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
