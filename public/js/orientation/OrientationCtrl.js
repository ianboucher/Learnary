(function()
{
    "use strict";

    angular
        .module("learnary")
        .controller("OrientationCtrl", ["SessionService",
            function OrientationCtrl(SessionService)
            {
                var self = this;

                if (SessionService.checkRole("staff"))
                {
                    self.templateUrl = "js/orientation/orientation_staff.html";
                }
                else
                {
                    self.templateUrl = "js/orientation/orientation_student.html";
                }
            }
        ]);
})();
