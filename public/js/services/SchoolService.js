(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("SchoolService", [
            "$http",
            "$auth",
            "$cacheFactory",

            function SchoolService($http, $auth, $cacheFactory)
            {
                var self = this;
                var data = {};
                var $httpDefaultCache = $cacheFactory.get("$http");

                self.loadSchools = function()
                {
                    return $http.get("api/v1.0.0/schools", { "cache" : true })
                        .then(function(schools)
                        {
                            return data.schools = schools.data;
                        })
                        .catch(function(error)
                        {
                            self.error = error;
                            console.log(self.error); // TODO: handle error properly
                            // window.alert("Unable to retrieve School data")

                            // use Bootstrap flash classes. Flash service/controller
                            // remember to clear the error message somehow - eg close
                            // button.
                        });
                };


                self.getSchools = function()
                {
                    return data.schools;
                };


                self.addSchool = function(school)
                {
                    $httpDefaultCache.remove("api/v1.0.0/schools");

                    return $http.post("/api/v1.0.0/schools", {
                        "school" : school
                    });
                };


                self.editSchool = function(school)
                {
                    $httpDefaultCache.removeAll();

                    return $http.put("/api/v1.0.0/schools/" + school.id, {
                        "school" : school
                    });
                };


                self.deleteSchool = function(school)
                {
                    $httpDefaultCache.removeAll();

                    $http.delete("/api/v1.0.0/schools/" + school.id);
                };


                self.manageGroups = function(school, groupIds)
                {
                    $httpDefaultCache.removeAll();

                    return $http.put("/api/v1.0.0/school-groups/" + school.id, {
                        "groups" : groupIds
                    });
                };

                self.data = data;
                return self;
            }
        ])
})();
