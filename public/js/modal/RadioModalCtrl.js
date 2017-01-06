(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("RadioModalCtrl", [
            "$uibModalInstance",
            "inputs",
            function RadioModalCtrl ($uibModalInstance, inputs)
            {
                var self = this;

                self.items        = inputs.allItems;
                self.currentItem  = inputs.currentItem;
                self.properties   = inputs.itemProperties;
                self.selectedItem = {};

                if (self.currentItem)
                {
                    self.selectedItem = self.items.findIndex(function(item)
                    {
                        return item.id === self.currentItem.id;
                    });
                }


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
