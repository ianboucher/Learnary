(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("RolesCtrl", ["$scope", "$http", "$uibModal", "RoleService", "PermissionService", "ModalService",
            function RolesCtrl($scope, $http, $uibModal, RoleService, PermissionService, ModalService)
            {
                var self = this;

                RoleService.loadRoles().then(function(roles)
                {
                    self.data = roles;
                    return PermissionService.loadPermissions();
                })
                .then(function(permissions)
                {
                    self.permissions = permissions;
                })
                .catch(function(error)
                {
                    console.log(error);
                });


                self.deleteRole = function(user, index)
                {
                    RoleService.deleteRole(role);
                    self.data.splice(index);
                }


                self.editRole = function(role)
                {
                    ModalService.createModal("/js/modal/user_form_modal.html", "FormModalCtrl", user)
                        .then(function(updatedUser)
                        {
                            $http.post("/api/v1.0.0/users/" + user.id, { "user" : updatedUser });
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.editPermissions = function(role, items, itemProperties)
                {
                    var additionalData = {
                        "parent"         : role,
                        "selected"       : role.perms,
                        "items"          : items,
                        "itemProperties" : itemProperties
                    }

                    ModalService.createModal("/js/modal/checkbox_modal.html", "CheckboxModalCtrl", additionalData)
                        .then(function(selectedItemIds)
                        {
                            return $http.post("/api/v1.0.0/permissions", {
                                "permissions" : selectedItemIds,
                                "role"        : role.name
                            });
                        })
                        .then(function(updatedItems)
                        {
                            role.perms = updatedItems.data;
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };

                // $scope.$watch(function() { return AdminService.data },
                //     function()
                //     {
                //         self.data        = AdminService.getRoles();
                //         self.permissions = AdminService.getPermissions();
                //     }, true
                // );


                // self.launchModal = function(role)
                // {
                //     self.selectedPerms = {};
                //
                //     role.perms.forEach(function(perm)
                //     {
                //         self.selectedPerms[perm.id] = true;
                //     });
                //
                //     var modalInstance = $uibModal.open(
                //     {
                //         controller   : "ModalCtrl",
                //         controllerAs : "$ctrl",
                //         templateUrl  : "/js/modal/checkbox_modal.html",
                //         resolve      : {
                //             items: function()
                //             {
                //                 return self.permissions;
                //             },
                //             selected: function()
                //             {
                //                 return self.selectedPerms;
                //             },
                //             columns: function()
                //             {
                //                 return ["Permission", "Description", "Edit"];
                //             },
                //             properties: function()
                //             {
                //                 return ["display_name", "description"];
                //             }
                //         }
                //     });
                //
                //     modalInstance.result.then (
                //         function(selectedPerms)
                //         {
                //             var updatedPermIds = [];
                //             var postData = {};
                //
                //             for (var id in selectedPerms)
                //             {
                //                 if (selectedPerms[id])
                //                 {
                //                     updatedPermIds.push(id);
                //                 }
                //             }
                //
                //             postData = { permissions: updatedPermIds, role: role.name };
                //
                //             return $http.post("/api/v1.0.0/permissions", postData);
                //         }
                //     ).then (
                //         function(updatedPerms)
                //         {
                //             role.perms = updatedPerms.data;
                //         },
                //         function(error)
                //         {
                //             console.log("modal cancelled");
                //         }
                //     );
                // };
            }
        ]);
})();
