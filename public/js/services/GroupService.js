(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("GroupService", ["$http", "$auth", "$cacheFactory",
            function GroupService($http, $auth, $cacheFactory)
            {
                var self = this;
                var data = {};
                var $httpDefaultCache = $cacheFactory.get("$http");

                self.loadGroups = function()
                {
                    return $http.get("api/v1.0.0/groups", { "cache" : true })
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
                    $httpDefaultCache.removeAll();

                    return $http.post("/api/v1.0.0/groups", { "group" : group });
                };


                self.editGroup = function(group)
                {
                    $httpDefaultCache.removeAll();

                    return $http.put("/api/v1.0.0/groups/" + group.id, { "group" : group });
                };


                self.deleteGroup = function(group)
                {
                    $httpDefaultCache.removeAll();
                    $http.delete("/api/v1.0.0/groups/" + group.id);
                };


                self.manageUsers = function(group, userIds)
                {
                    $httpDefaultCache.removeAll();

                    return $http.put("/api/v1.0.0/group-users/" + group.id, {
                        "users" : userIds
                    });
                };


                self.data = data;
                return self;
            }
        ])
})();
