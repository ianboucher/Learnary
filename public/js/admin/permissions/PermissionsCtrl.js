(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("PermissionsCtrl", [
            "$http",
            "$uibModal",
            "RoleService",
            "PermissionService",
            "ModalService",

            function PermissionsCtrl($http, $uibModal, RoleService, PermissionService, ModalService)
            {
                var self = this;

                PermissionService.loadPermissions().then(function(permissions)
                {
                    self.data = permissions;
                    return RoleService.loadRoles();
                })
                .then(function(roles)
                {
                    self.roles = roles;
                })
                .catch(function(error)
                {
                    console.log(error);
                });


                self.addPermission = function()
                {
                    ModalService.createModal("/js/modal/form_modal_roles.html", "FormModalCtrl")
                        .then(function(permission)
                        {
                            PermissionService.addPermission(permission);
                            permission.roles = [];
                            self.data.push(permission);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.editPermission = function(permission)
                {
                    ModalService.createModal("/js/modal/form_modal_roles.html", "FormModalCtrl", permission)
                        .then(function(updatedPermission)
                        {
                            RoleService.editRole(updatedPermission);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.deletePermission = function(permission, index)
                {
                    PermissionService.deletePermission(permission);
                    self.data.splice(index);
                }


                self.manageRoles = function(permission)
                {
                    var additionalData = {
                        "currentItems"   : permission.roles,
                        "allItems"       : self.roles,
                        "itemProperties" : ['display_name', 'description']
                    }

                    ModalService.createModal("/js/modal/checkbox_modal.html", "CheckboxModalCtrl", additionalData)
                        .then(function(selectedRoleIds)
                        {
                            return PermissionService.manageRoles(permission, selectedRoleIds)
                        })
                        .then(function(updatedRoles)
                        {
                            permission.roles = updatedRoles.data;
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };
            }
        ]);
})();
