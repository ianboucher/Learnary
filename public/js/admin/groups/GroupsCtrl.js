(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("GroupsCtrl", ["$rootScope", "$http", "$uibModal", "AdminService",
            function GroupsCtrl($rootScope, $http, $uibModal, AdminService)
            {
                var self = this;

                self.groupsData = AdminService.groups;
                self.schools    = AdminService.schools;

                $rootScope.$on("groups loaded", function(event)
                {
                    self.groupsData = AdminService.groups;
                });

                $rootScope.$on("schools loaded", function(event)
                {
                    self.schools = AdminService.schools;
                });


                self.launchModal = function(group)
                {
                    var modalInstance = $uibModal.open(
                    {
                        controller   : "ModalCtrl",
                        controllerAs : "$ctrl",
                        templateUrl  : "/js/modal/button_modal.html",
                        resolve      : {
                            items: function()
                            {
                                return group.users;
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
