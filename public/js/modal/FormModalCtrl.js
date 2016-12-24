(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("FormModalCtrl", ["$uibModalInstance", "inputs",
            function FormModalCtrl($uibModalInstance, inputs)
            {
                var self = this;

                self.items = inputs;

                self.submit = function(formSubmission)
                {
                    $uibModalInstance.close(formSubmission);
                };

                self.cancel = function()
                {
                    $uibModalInstance.dismiss("cancel");
                };
            }
        ]);
})();
