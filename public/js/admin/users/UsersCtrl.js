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


                self.deleteUser = function(user, index)
                {
                    UserService.deleteUser(user);
                    self.data.splice(index);
                }


                self.editUser = function(user)
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


                self.editRoles = function(user, items, itemProperties)
                {
                    var additionalData = {
                        "parent"         : user,
                        "selected"       : user.roles,
                        "items"          : items,
                        "itemProperties" : itemProperties
                    }

                    ModalService.createModal("/js/modal/checkbox_modal.html", "CheckboxModalCtrl", additionalData)
                        .then(function(selectedItemIds)
                        {
                            return $http.post("/api/v1.0.0/roles", {
                                "roles" : selectedItemIds,
                                "email" : user.email
                            });
                        })
                        .then(function(updatedItems)
                        {
                            user.roles = updatedItems.data;
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.radioModal = function(user, items, itemName, itemProperties)
                {
                    var additionalData = {
                        "parent"         : user,
                        "selected"       : user.group,
                        "items"          : items,
                        "itemProperties" : itemProperties
                    }

                    ModalService.createModal("/js/modal/radio_modal.html", "RadioModalCtrl", additionalData)
                        .then(function(selectedItem)
                        {
                            return $http.put("/api/v1.0.0/users/" + user.id + "/groups/" + selectedItem.id);
                        })
                        .then(function(updatedItems)
                        {
                            user[itemName] = updatedItems.data;
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };
            }
        ]);
})();
