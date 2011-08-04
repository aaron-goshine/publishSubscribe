/*
--
I just thought it would be nice if
all the functionality that is required 
to pub/sub could be encapsulated into a 
small portable lib that just kool
*/
(function (win) {
    var w = win.subCast = {};
    var subscriptionStack = {};
    //init at -1  to mentain zero base index while 
    var tokenId = -1;
    var wildCardArrest = function (wildStr, bool) {
            //-- convert literal wild cards to regex
  	if (bool) { return new RegExp(wildStr.replace('*', "(.*)")); 
	
	} else { return wildStr; }
        }
        //--
        w.publish = function (eventType, dataObj) {
            var subscribers = "";
            if (!subscriptionStack.hasOwnProperty(eventType)) {


                // iterater through subscriptionStack
                // search eventtyps mathing wild cards
                for (var i in subscriptionStack) {

                    if (eventType.search(wildCardArrest(i, true)) > -1) {

                        subscribers = subscriptionStack[wildCardArrest(i, false)];

                    }
                }

                //return eventType+"not in stack";
            } else {

                subscribers = subscriptionStack[eventType];

            }


            // var subscribers = subscriptionStack[eventType];
            var pushSubscription = function () {



                    for (var i = 0, j = subscribers.length; i < j; i++) {
                        subscribers[i].funct(eventType, dataObj);

                    }
                };
            //-- setTimeout is to create call stack
            setTimeout(pushSubscription, 0);

            return true;
        }

/**
 -- subscribe
**/

        w.subscribe = function (eventType, funct) {

            // checking to see if current eventType is in the subscriptionStack
            if (!subscriptionStack.hasOwnProperty(eventType)) {
                //-- converting event type to and Array
                //-- would make posible to more listeners
                // to the same eventtype
                subscriptionStack[eventType] = [];
            }


            var trakerToken = (tokenId += 1) + "";
            subscriptionStack[eventType].push({
                "trakerToken": trakerToken,
                "funct": funct
            });
            return trakerToken;
        };

/**
-- unsubscribe
this will iterate over the subscriptionStack
and remove matching tokenid

**/
    w.unsubscribe = function (trackertoken) {
        for (var s in subscriptionStack) {
            if (subscriptionStack.hasOwnProperty(s)) {

                for (var i = 0, j = subscriptionStack[s].length; i < j; i++) {

                    if (subscriptionStack[s][i].trackertoken === trackertoken) {
                        subscriptionStack[s].splice(i, 1);

                        return trackertoken;
                    }

                }
            }
        }
        return false;
    };


}(window));