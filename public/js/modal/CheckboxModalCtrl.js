(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("CheckboxModalCtrl", [
            "$uibModalInstance",
            "inputs",

            function CheckboxModalCtrl ($uibModalInstance, inputs)
            {
                var self = this;

                console.log(inputs);

                self.items        = inputs.allItems;
                self.currentItems = inputs.currentItems;
                self.properties   = inputs.itemProperties;

                self.selectedItems = {};

                self.currentItems.forEach(function(item)
                {
                    self.selectedItems[item.id] = true;
                });


                self.submit = function(selectedItems)
                {
                    var selectedItemIds = [];

                    for (var id in selectedItems)
                    {
                        if (selectedItems[id])
                        {
                            selectedItemIds.push(id);
                        }
                    }

                    $uibModalInstance.close(selectedItemIds);
                };


                self.cancel = function()
                {
                    $uibModalInstance.dismiss("cancel");
                };
            }
        ]);
})();
