(function()
{
    "use strict";

    angular
        .module("learnary")
        .service("ModalService", ["$http", "$uibModal",
            function ModalService($http, $uibModal)
            {
                var self = this;

                self.createModal = function(templateUrl, controllerName, additionalData)
                {
                    return $uibModal.open(
                    {
                        templateUrl  : templateUrl,
                        controller   : controllerName,
                        controllerAs : "$ctrl",
                        resolve      : {
                            inputs   : function()
                            {
                                return additionalData;
                            }
                        }
                    }).result;
                };

                return self;
            }
        ]);
})();
