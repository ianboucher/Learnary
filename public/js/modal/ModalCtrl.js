(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("ModalCtrl", ["$uibModalInstance", "items", "selected", "columns", "properties",
            function ModalCtrl($uibModalInstance, items, selected, columns, properties)
            {
                var self = this;

                self.items      = items;
                self.selected   = selected;
                self.columns    = columns;
                self.properties = properties;

                self.submit = function()
                {
                    $uibModalInstance.close(self.selected);
                };

                self.cancel = function()
                {
                    $uibModalInstance.dismiss("cancel")
                };
            }
        ]);
})();
