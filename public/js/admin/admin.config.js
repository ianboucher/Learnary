(function()
{
    "use strict";

    angular
        .module("learnary.admin")
        .config(function ($stateProvider, $locationProvider)
        {
            $locationProvider
                .html5Mode
                ({
                    "enabled"     : true,
                    "requireBase" : false
                });

            $stateProvider
                .state
                (
                    "users",
                    {
                        "url"         : "/users",
                        "controller"  : "UsersCtrl as users",
                        "templateUrl" : "js/admin/users/users.html"
                    }
                )
                .state
                (
                    "roles",
                    {
                        "url"         : "/roles",
                        "controller"  : "RolesCtrl as roles",
                        "templateUrl" : "js/admin/roles/roles.html"
                    }
                )
                .state
                (
                    "permissions",
                    {
                        "url"         : "/permissions",
                        "controller"  : "PermissionsCtrl as perms",
                        "templateUrl" : "js/admin/permissions/permissions.html"
                    }
                )
                .state
                (
                    "schools",
                    {
                        "url"         : "/schools",
                        "controller"  : "SchoolsCtrl as schools",
                        "templateUrl" : "js/admin/schools/schools.html"
                    }
                )
                .state
                (
                    "groups",
                    {
                        "url"         : "/groups",
                        "controller"  : "GroupsCtrl as groups",
                        "templateUrl" : "js/admin/groups/groups.html"
                    }
                )
        })
})();
