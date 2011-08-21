function diplayInMyConsole(valuesToWrite) {
    var cons = document.getElementById("console");
    cons.innerHTML = valuesToWrite;
    //	console.log(valuesToWrite);
}
//-- mad bad idea 
var console = function (data) {
        document.getElementById("console");
    }
    //---
var bigGloabalProperty = 1;
var bigCONSTANT = 60000;
// set and return bigGloabalProperty 
var bigGloabalPropertySetter = function (increaseby) {
        bigGloabalProperty += (increaseby * 1000);
        // publish / broadcast "PropertyChanged" event
        subCast.publish("PropertyChanged");
        if (bigGloabalProperty > bigCONSTANT) {
            subCast.publish("excLimit");
        }
        return bigGloabalProperty;
    }
    // eventhandler
var clientNotification = function (eventType, data) {
        diplayInMyConsole("BigGloabalProperty is now: " + (bigGloabalProperty));
    }
    // eventhandler
var exceedlimit = function (eventType, data) {
        var r = confirm("You have exceed my expectation");
        if (r == true) {
            window.location.reload();
        }
        else {
            alert("you need to refresh");
        }
    }
    // eventlistener for wildcard* selector
var wildCardCaller = function (eventType, data) {
        bigGloabalPropertySetter(3);
        diplayInMyConsole("wild  " + eventType + "" + bigGloabalPropertySetter(3));
    }
    // attach / subscribe event
var ttPropertyChanged = subCast.subscribe("PropertyChanged", clientNotification);
// attach / subscribe event with wild card
var ttwildCard = subCast.subscribe("wild*", wildCardCaller, {
    "value": "wildcards are on the run"
});
//ttach / subscribe event 
var ttexceed = subCast.subscribe("excLimit", exceedlimit, {
    "value": "you have exceeded my expectaion"
});
// how to remove subscription is listner isno longer needed
//subCast.unsubscribe(trackertoken_some);
//-- functoin to start an event chain...
setInterval(timecaller, 1000);

function timecaller() {
    subCast.publish("wildCard");
    subCast.publish("wildgirls");
    //set the cahin in motion
    bigGloabalPropertySetter(2);
}