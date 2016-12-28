(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("GroupService", ["$http", "$auth",
            function GroupService($http, $auth)
            {
                var self = this;
                var data = {};

                self.loadGroups = function()
                {
                    return $http.get("api/v1.0.0/groups")
                        .then(function(groups)
                        {
                            return data.groups = groups.data;
                        })
                        .catch(function(error)
                        {
                            self.error = error;
                            console.log(self.error); // TODO: handle error properly
                            // window.alert("Unable to retrieve Group data")
                        });
                };


                self.getGroups = function()
                {
                    return data.groups;
                };


                self.addGroup = function(group)
                {
                    return $http.post("/api/v1.0.0/groups", { "group" : role });
                };


                self.editGroup = function(group)
                {
                    return $http.post("/api/v1.0.0/groups/" + group.id, { "group" : group });
                };


                self.deleteGroup = function(group)
                {
                    $http.delete("/api/v1.0.0/groups/" + group.id);
                };


                self.data = data;
                return self;
            }
        ])
})();
