(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("UsersCtrl", [
            "$scope",
            "$http",
            "$uibModal",
            "ModalService",
            "UserService",
            "RoleService",
            "GroupService",
            function UsersCtrl($scope, $http, $uibModal, ModalService, UserService, RoleService, GroupService)
            {
                var self = this;

                UserService.loadUsers().then(function(users)
                {
                    self.data = users;
                    return RoleService.loadRoles();
                })
                .then(function(roles)
                {
                    self.roles = roles;
                    return GroupService.loadGroups();
                })
                .then(function(groups)
                {
                    self.groups = groups;
                })
                .catch(function(error)
                {
                    console.log(error);
                });


                self.editUser = function(user)
                {
                    ModalService.createModal("/js/modal/form_modal_users.html", "FormModalCtrl", user)
                        .then(function(updatedUser)
                        {
                            UserService.editUser(updatedUser);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.deleteUser = function(user, index)
                {
                    UserService.deleteUser(user);
                    self.data.splice(index, 1);
                }


                self.manageRoles = function(user)
                {
                    var additionalData = {
                        "currentItems"   : user.roles,
                        "allItems"       : self.roles,
                        "itemProperties" : ['display_name', 'description']
                    }

                    ModalService.createModal("/js/modal/checkbox_modal.html", "CheckboxModalCtrl", additionalData)
                        .then(function(selectedRoleIds)
                        {
                            return $http.put("/api/v1.0.0/user-roles/" + user.id, {
                                "roles" : selectedRoleIds,
                            });
                        })
                        .then(function(updatedRoles)
                        {
                            user.roles = updatedRoles.data;
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.manageGroup = function(user)
                {
                    var additionalData = {
                        "currentItem"    : user.group,
                        "allItems"       : self.groups,
                        "itemProperties" : ['name', '']
                    }

                    ModalService.createModal("/js/modal/radio_modal.html", "RadioModalCtrl", additionalData)
                        .then(function(selectedGroup)
                        {
                            return $http.put("/api/v1.0.0/users/" + user.id + "/groups/" + selectedGroup.id);
                        })
                        .then(function(selectedGroup)
                        {
                            user.group = selectedGroup.data;
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };
            }
        ]);
})();
