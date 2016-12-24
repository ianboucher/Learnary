(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("RadioModalCtrl", ["$uibModalInstance", "inputs",
            function RadioModalCtrl($uibModalInstance, inputs)
            {
                var self = this;

                self.items        = inputs.items;
                self.itemName     = inputs.itemName;
                self.currentItem  = inputs.user[self.itemName];
                self.properties   = inputs.itemProperties;

                self.selectedItem = self.items.findIndex(function(item)
                {
                    return item.id === self.currentItem.id;
                });


                self.submit = function(index)
                {
                    $uibModalInstance.close(self.items[self.selectedItem]);
                };
                

                self.cancel = function()
                {
                    $uibModalInstance.dismiss("cancel");
                };
            }
        ]);
})();
