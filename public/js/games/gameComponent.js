    "use strict";

    angular
        .module("learnary")
        .component("modalComponent", {
            "templateUrl" : "/js/modal/modal.html",
            "bindings"    : {
                "resolve" : "<",
                "close"   : "&",
                "dismiss" : "&"
             },
             controller : function ()
             {
                var self = this;
                console.log(self);

                self.$onInit = function()
                {
                    self.items    = self.resolve.items;
                    self.selected = self.resolve.selected;
                    console.log(self.selected);
                };

                self.submit = function()
                {
                    self.close({$value : self.selected});
                };

                self.cancel = function()
                {
                    self.dismiss({$value : "cancel"})
                };
            }
        });
