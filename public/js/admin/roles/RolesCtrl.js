(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("RolesCtrl", [
            "$scope",
            "$http",
            "$uibModal",
            "RoleService",
            "PermissionService",
            "ModalService",

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


                self.addRole = function(role)
                {
                    ModalService.createModal("/js/modal/form_modal_roles.html", "FormModalCtrl", role)
                        .then(function(role)
                        {
                            RoleService.addRole(role);
                            role.perms = [];
                            self.data.push(role);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.editRole = function(role)
                {
                    ModalService.createModal("/js/modal/form_modal_roles.html", "FormModalCtrl", role)
                        .then(function(updatedRole)
                        {
                            RoleService.editRole(updatedRole);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.deleteRole = function(role, index)
                {
                    RoleService.deleteRole(role);
                    self.data.splice(index);
                }


                self.managePermissions = function(role)
                {
                    var additionalData = {
                        "currentItems"   : role.perms,
                        "allItems"       : self.permissions,
                        "itemProperties" : ['display_name', 'description']
                    }

                    ModalService.createModal("/js/modal/checkbox_modal.html", "CheckboxModalCtrl", additionalData)
                        .then(function(selectedPermissionIds)
                        {
                            return RoleService.managePermissions(role, selectedPermissionIds)
                        })
                        .then(function(updatedPermissions)
                        {
                            role.perms = updatedPermissions.data;
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };
            }
        ]);
})();
