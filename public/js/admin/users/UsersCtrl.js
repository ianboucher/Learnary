(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("UsersCtrl", ["$rootScope", "$http", "$uibModal", "AdminService",
            function UsersCtrl($rootScope, $http, $uibModal, AdminService)
            {
                var self = this;

                self.userData = AdminService.users;
                self.roles    = AdminService.roles;

                $rootScope.$on("users loaded", function(event)
                {
                    self.userData = AdminService.users;
                });

                $rootScope.$on("roles loaded", function(event)
                {
                    self.roles = AdminService.roles;
                });


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
