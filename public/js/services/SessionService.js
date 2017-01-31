(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("SessionService", [
            "$http",
            "$auth",
            "$state",
            "$window",

            function SessionService($http, $auth, $state, $window)
            {
                var self = this;

                self.isAuthenticated = false;

                if ($window.localStorage["currentUser"])
                {
                    // QUESTION: What should I do here to handle the situation
                    // where a previous user hasn't logged-out, leaving their data
                    // in localStorage?
                    self.currentUser = JSON.parse($window.localStorage["currentUser"]);
                    self.isAuthenticated = $auth.isAuthenticated();
                }

                if ($window.sessionStorage["currentSession"])
                {
                    self.currentSession = JSON.parse($window.sessionStorage["currentSession"]);
                }

                self.loginError = false;
                self.loginErrorText;

                // QUESTION: What else should I include in my SessionService at
                // the moment?

                // TODO: Extract some of the logic in the 'login' method into individual
                // functions to improve readability

                self.login = function(credentials, nextState)
                {
                    $auth.login(credentials).then(function()
                    {
                        return $http.get("api/v1.0.0/users/show");
                    })
                    .then(function(user) // Retrieve the authenticated current user
                    {
                        self.currentUser     = user.data.user;
                        self.isAuthenticated = $auth.isAuthenticated();
                        $window.localStorage.setItem("currentUser", angular.toJson(self.currentUser));

                        if (nextState)
                        {
                            $state.go(nextState);
                        }

                        return $http.post("api/v1.0.0/users/" + self.currentUser.id + "/sessions") // QUESTION: Should I extract this to 'saveSession()' method?
                    })
                    .then(function(session)
                    {
                        self.currentSession = session.data;
                        $window.sessionStorage.setItem("currentSession", angular.toJson(self.currentSession));
                    })
                    .catch(function(error)
                    {
                        // TODO: Handle error properly
                        // QUESTION: What's the best way to handle these kind of errors?
                        self.loginError     = true;
                        self.loginErrorText = error.data.error;
                        window.alert("Email or password invalid");
                    })
                };


                self.logout = function()
                {
                    $auth.logout().then (

                        function(response)
                        {
                            $window.localStorage.removeItem("currentUser");
                            self.currentUser     = null;
                            self.isAuthenticated = false;
                            $state.go("landing");
                        },
                        function(error)
                        {
                            console.log(error.data);
                            window.alert("There was a problem logging you out. Please try again.")
                        }
                    );
                };


                self.checkRole = function(roleName)
                {
                    return self.currentUser.roles.some(function(role)
                    {
                        return role.name === roleName;
                    })
                };


                self.checkPermission = function(permission)
                {
                    return self.currentUser.permissions.hasOwnProperty(permission);
                };

                return self;
            }
        ])
})();
