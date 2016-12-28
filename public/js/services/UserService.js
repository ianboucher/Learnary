(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("UserService", ["$http", "$auth",
            function UserService($http, $auth)
            {
                var self = this;
                var data = {};

                self.loadUsers = function()
                {
                    return $http.get("api/v1.0.0/users")
                        .then(function(users)
                        {
                            return data.users = users.data;
                        })
                        .catch(function(error)
                        {
                            console.log(error); // TODO: handle error properly
                            // window.alert("Unable to retrieve user data")
                            return self.error = error;
                        });
                };


                self.getUsers = function()
                {
                    return data.users;
                };


                self.editUser = function(user)
                {
                    return $http.post("/api/v1.0.0/users/" + user.id, {
                        "user" : user
                    });
                };


                self.deleteUser = function(user)
                {
                    $http.delete("/api/v1.0.0/users/" + user.id);
                };


                self.data = data;
                return self;
            }
        ])
})();
