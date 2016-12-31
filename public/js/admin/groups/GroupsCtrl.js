(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("GroupsCtrl", [
            "$scope",
            "$http",
            "$uibModal",
            "SchoolService",
            "UserService",
            "GroupService",
            "ModalService",
            function GroupsCtrl($scope, $http, $uibModal, SchoolService, UserService, GroupService, ModalService)
            {
                var self = this;

                GroupService.loadGroups()
                    .then(function(groups)
                    {
                        self.data = groups;
                        return UserService.loadUsers();
                    })
                    .then(function(users)
                    {
                        self.users           = users;
                        self.unassignedUsers = users.filter(function(user)
                        {
                            return user.group_id === null;
                        });
                    })
                    .catch(function(error)
                    {
                        console.log(error);
                    });


                self.addGroup = function()
                {
                    ModalService.createModal("/js/modal/form_modal_groups.html", "FormModalCtrl")
                        .then(function(group)
                        {
                            GroupService.addGroup(group);
                            group.users = [];
                            self.data.push(group);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.editGroup = function(group)
                {
                    ModalService.createModal("/js/modal/form_modal_groups.html", "FormModalCtrl", group)
                        .then(function(updatedGroup)
                        {
                            GroupService.editGroup(updatedGroup);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.deleteGroup = function(group, index)
                {
                    GroupService.deleteGroup(group);
                    self.data.splice(index);
                };


                self.manageUsers = function(group)
                {
                    var additionalData = {
                        "currentItems"   : group.users,
                        "allItems"       : group.users.concat(self.unassignedUsers),
                        "itemProperties" : ["name", "email", "group.name"]
                    }

                    ModalService.createModal("/js/modal/checkbox_modal.html", "CheckboxModalCtrl", additionalData)
                        .then(function(selectedUserIds)
                        {
                            return GroupService.manageUsers(group, selectedUserIds)
                        })
                        .then(function(updatedUsers)
                        {
                            group.users = updatedUsers.data;
                            return UserService.loadUsers();
                        })
                        .then(function(users)
                        {
                            self.users           = users;
                            self.unassignedUsers = users.filter(function(user)
                            {
                                return user.group_id === null;
                            });
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };
            }
        ]);
})();
