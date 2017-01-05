(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("SchoolsCtrl", [
            "$scope",
            "$http",
            "$uibModal",
            "SchoolService",
            "UserService",
            "GroupService",
            "ModalService",
            function SchoolsCtrl($scope, $http, $uibModal, SchoolService, UserService, GroupService, ModalService)
            {
                var self = this;

                SchoolService.loadSchools()
                    .then(function(schools)
                    {
                        self.data = schools;
                        console.log(self.data);
                        return UserService.loadUsers();
                    })
                    .then(function(users)
                    {
                        self.users = users;
                        console.log(users[5]);
                        self.unassignedUsers = users.filter(function(user)
                        {
                            return user.school_id === null;
                        });

                        return GroupService.loadGroups();
                    })
                    .then(function(groups)
                    {
                        self.groups           = groups;
                        self.unassignedGroups = groups.filter(function(group)
                        {
                            return group.school === null;
                        });
                    })
                    .catch(function(error)
                    {
                        console.log(error);
                    });


                self.addSchool = function()
                {
                    ModalService.createModal("/js/modal/form_modal_schools.html", "FormModalCtrl")
                        .then(function(school)
                        {
                            SchoolService.addSchool(school);
                            school.groups = [];
                            self.data.push(school);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.editSchool = function(school)
                {
                    ModalService.createModal("/js/modal/form_modal_schools.html", "FormModalCtrl", school)
                        .then(function(updatedSchool)
                        {
                            SchoolService.editSchool(updatedSchool);
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };


                self.deleteSchool = function(school, index)
                {
                    SchoolService.deleteSchool(school);
                    self.data.splice(index);
                }


                self.manageGroups = function(school)
                {
                    var additionalData = {
                        "currentItems"   : school.groups,
                        "allItems"       : school.groups.concat(self.unassignedGroups),
                        "itemProperties" : ["name", ""]
                    }

                    ModalService.createModal("/js/modal/checkbox_modal.html", "CheckboxModalCtrl", additionalData)
                        .then(function(selectedGroupIds)
                        {
                            return SchoolService.manageGroups(school, selectedGroupIds)
                        })
                        .then(function(updatedGroups)
                        {
                            school.groups = updatedGroups.data;
                            return GroupService.loadGroups();
                        })
                        .then(function(groups)
                        {
                            self.groups           = groups;
                            self.unassignedGroups = groups.filter(function(group)
                            {
                                return group.school === null;
                            });
                        })
                        .catch(function(error)
                        {
                            console.log("modal cancelled");
                        });
                };

                // QUESTION: What, if anything, should I be able to do with users
                // from the schools tab? Users are related to Schools through groups,
                // so it seems incorrect to attempt to edit the relationship at this
                // level. However, from an admin user perspective, it seems reasonable
                // to have some control over the users belonging to a particular school.

                self.manageUsers = function(school)
                {
                    var additionalData = {
                        "currentItems"   : school.users,
                        "allItems"       : school.users,//.concat(self.unassignedUsers),
                        "itemProperties" : ["name", "email", "group.name"]
                    }

                    ModalService.createModal("/js/modal/checkbox_modal.html", "CheckboxModalCtrl", additionalData)
                        .then(function(selectedUserIds)
                        {
                            return SchoolService.manageUsers(school, selectedUserIds)
                        })
                        .then(function(updatedUsers)
                        {
                            school.users = updatedUsers.data;
                            return UsersService.loadUsers();
                        })
                        .then(function(users)
                        {
                            self.users           = users;
                            self.unassignedUsers = users.filter(function(user)
                            {
                                return user.school_id === null;
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
