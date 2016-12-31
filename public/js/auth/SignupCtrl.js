(function(){

    "use strict";

    angular
        .module("learnary")
        .controller("SignupCtrl", [
            "$auth",
            "$http",
            "$state",
            "SessionService",
            "RoleService",
            function SignupCtrl($auth, $http, $state, SessionService, RoleService)
            {
                var self  = this

                RoleService.loadRoles().then(function(roles)
                {
                    self.roles = roles;
                })
                .catch(function(error)
                {
                    console.log(error);
                });


                self.credentials  = {};
                self.selectedRole = "student";


                // QUESTION: I need to provide the option of specifying a school
                // or class/group for the user to join on signing-up. How should
                // this work?
                // My thoughts:
                // * I guess schools should only be created by admins
                // * User probably needs a searchable list of schools/classes to
                //   choose from.
                // * Upon specifying a valid school/class, do I need to create
                //   specific endpoints to assign the user to the school/class
                //   via a belongsTo relationship?

                // QUESTION: Should this sign-up procedure come under a UserCtrl
                // as it is effectively creating a new user and assigning a role
                // to them?


                self.signup = function()
                {
                    $auth.signup(self.credentials).then (

                        function(response)
                        {
                            if (!SessionService.currentUser)
                            {
                                $auth.setToken(response.data.token);
                            }

                            // QUESTION: The request below assigns a role to the
                            // new user. At the moment, the value of 'role'
                            // (staff or student) is determined by a checkbox;
                            // how could I stop students signing up as staff and
                            // getting the associated permissions?

                            // QUESTION: API expects an array of role_ids as this
                            // makes subsequent modifcation easier. Would it be
                            // preferable to pass role names and have the API find
                            // the relevant IDs before updating the roles?

                            var user = response.data.user,
                                role  = self.roles.find(function(role)
                                {
                                    return role.name === self.selectedRole;
                                });

                            return $http.put("/api/v1.0.0/user-roles/" + user.id, {
                                "roles" : [role.id]
                            });
                        },
                        function(error)
                        {
                            console.log(error); // TO-DO: Handle error properly (how?)
                            window.alert("Login failed - email or password are incorrect")
                        }
                    ).then (

                        function(response)
                        {
                            if (SessionService.currentUser && SessionService.checkRole("admin"))
                            {
                                $state.go($state.previous);
                            }
                            else
                            {
                                SessionService.login(self.credentials, "orientation");
                            }
                        }
                    );
                };
            }
        ]);
})();
