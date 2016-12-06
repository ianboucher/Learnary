(function()
{
    "use strict";

    angular
        .module("learnary", ["ui.router", "ui.bootstrap", "satellizer"])
        .run(function ($rootScope, $state)
        {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState)
            {
                $state.previous = fromState;
            });
        })
        .config(function ($stateProvider, $locationProvider, $authProvider, $urlRouterProvider)
        {
            $locationProvider
                .html5Mode
                ({
                    "enabled": true,
                    "requireBase": false
                });

            // Satellizer configuration that specifies which API
            // route the JWT should be retrieved from
            $authProvider.loginUrl = "/api/v1.0.0/login";
            $authProvider.signupUrl = "/api/v1.0.0/signup";


            // Redirect to the auth state if any other states
            // are requested other than users
            $urlRouterProvider.otherwise("/login");

            $stateProvider
                .state
                (
                    "landing",
                    {
                        "url"         : "/",
                        "controller"  : "LandingCtrl as landing",
                        "templateUrl" : "js/landing/landing.html"
                    }
                )
                .state
                (
                    "login",
                    {
                        "url"         : "/login",
                        "controller"  : "LoginCtrl as login",
                        "templateUrl" : "js/auth/login.html"
                    }
                )
                .state
                (
                    "signup",
                    {
                        "url"         : "/signup",
                        "controller"  : "SignupCtrl as signup",
                        "templateUrl" : "js/auth/signup.html"
                    }
                )
                .state
                (
                    "orientation",
                    {
                        "url"         : "/orientation",
                        "controller"  : "OrientationCtrl as orientation",
                        "templateUrl" : "js/orientation/orientation.html"
                    }
                )
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
