(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("UserCtrl", ["$http",
            function UserCtrl($http)
            {
                var self = this;

                self.userData;
                self.error;

                self.getUsers = function()
                {
                    $http.get("api/v1.0.0/users").then(
                        function(users)
                        {
                            self.userData = users.data;
                        },
                        function(errorData)
                        {
                            self.error = errorData.data.error;
                            console.log(errorData); // TODO: handle error properly
                            // window.alert("Unable to retrieve user data")
                        }
                    );
                }
            }
        ]);
})();
