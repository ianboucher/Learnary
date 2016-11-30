(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("UsersCtrl", ["$scope", "$http", "$uibModal", "AdminService",
            function UsersCtrl($scope, $http, $uibModal, AdminService)
            {
                var self = this;

                $scope.$watch(function() { return AdminService.data },
                    function(newValue)
                    {
                        // Added data to a .data object literal in service as
                        // allows me to $watch for changes - can't watch service
                        // directly.

                        // called 4x on initialisation of controller, but only
                        // 1x per change thereon.

                        // QUESTION: Using functions rather than referencing
                        // properties directly to prevent future changes to the
                        // service propogating up to controller. This increases
                        // the call-stack - what's the best option?

                        self.data  = AdminService.getUsers();
                        self.roles = AdminService.getRoles();
                    }, true
                );


                self.launchModal = function(user)
                {
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
