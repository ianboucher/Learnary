(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("SchoolService", ["$http", "$auth",
            function SchoolService($http, $auth)
            {
                var self = this;
                var data = {};

                self.loadSchools = function()
                {
                    return $http.get("api/v1.0.0/schools")
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
                    return $http.post("/api/v1.0.0/schools", {
                        "school" : school
                    });
                };


                self.editSchool = function(school)
                {
                    return $http.put("/api/v1.0.0/schools/" + school.id, {
                        "school" : school
                    });
                };


                self.deleteSchool = function(school)
                {
                    $http.delete("/api/v1.0.0/schools/" + school.id);
                };


                self.manageGroups = function(school, groupIds)
                {
                    return $http.put("/api/v1.0.0/school-groups/" + school.id, {
                        "groups" : groupIds
                    });
                };

                self.data = data;
                return self;
            }
        ])
})();
