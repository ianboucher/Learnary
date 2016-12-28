(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("CheckboxModalCtrl", ["$uibModalInstance", "inputs",
            function CheckboxModalCtrl($uibModalInstance, inputs)
            {
                var self = this;

                self.items      = inputs.items;
                self.selected   = inputs.selected;
                self.properties = inputs.itemProperties;

                self.selectedItems = {};

                self.selected.forEach(function(item)
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
