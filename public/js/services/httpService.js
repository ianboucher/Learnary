angular
    .module("commentApp")
    .service("httpService", ["$http",
        function httpService($http)
        {
            this.get = function(url)
            {
                return $http.get(url);
            };

            this.save = function(url, record)
            {
                return $http.post(url, record);
            };

            this.destroy = function(url, id)
            {
                return $http.delete(url + id);
            };

            return this;
        }
    ])
