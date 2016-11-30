(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("GroupsCtrl", ["$scope", "$http", "$uibModal", "AdminService",
            function GroupsCtrl($scope, $http, $uibModal, AdminService)
            {
                var self = this;

                $scope.$watch(function() { return AdminService.data },
                    function()
                    {
                        self.data        = AdminService.getGroups();
                    }, true
                );


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
