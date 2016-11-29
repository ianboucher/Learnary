(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("RolesCtrl", ["$rootScope", "$http", "$uibModal", "AdminService",
            function RolesCtrl($rootScope, $http, $uibModal, AdminService)
            {
                var self = this;

                self.roleData    = AdminService.roles;
                self.permissions = AdminService.permissions;

                $rootScope.$on("roles loaded", function(event)
                {
                    self.roleData = AdminService.roles;
                });

                $rootScope.$on("permissions loaded", function(event)
                {
                    self.permissions = AdminService.permissions;
                });


                self.launchModal = function(role)
                {
                    self.selectedPerms = {};

                    role.perms.forEach(function(perm)
                    {
                        self.selectedPerms[perm.id] = true;
                    });

                    var modalInstance = $uibModal.open(
                    {
                        controller   : "ModalCtrl",
                        controllerAs : "$ctrl",
                        templateUrl  : "/js/modal/checkbox_modal.html",
                        resolve      : {
                            items: function()
                            {
                                return self.permissions;
                            },
                            selected: function()
                            {
                                return self.selectedPerms;
                            },
                            columns: function()
                            {
                                return ["Permission", "Description", "Edit"];
                            },
                            properties: function()
                            {
                                return ["display_name", "description"];
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
