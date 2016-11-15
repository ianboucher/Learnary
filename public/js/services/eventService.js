angular
    .module("learnary")
    .service("eventService", [
        function eventService()
        {
            var self = this;

            self.fire = function(eventData, eventName)
            {
                bean.fire(eventData, eventName);
            }

            self.on = function(eventData, eventName)
            {
                bean.on(eventData, eventName)
            }

            return self;
        }
    ])
