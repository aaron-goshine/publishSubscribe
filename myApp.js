
function diplayInMyConsole(valuesToWrite){
	var cons = document.getElementById("console");
	cons.innerHTML = valuesToWrite;
//	console.log(valuesToWrite);

}

//-- mad bad idea 
var console = function(data){
	
	document.getElementById("console");
	}
	//---
var bigGloabalProperty = 1;
var bigGloabalPropertySetter = function(increaseby){
	bigGloabalProperty+=(increaseby*10000);
	subCast.publish("PropertyChanged");

return	bigGloabalProperty;
}
// all subscription gives you a trackertoken,
 // for future modification like unsubscribe
 
  var clientNotification = function( eventType, data ){
	diplayInMyConsole("BigGloabalProperty is now: "+(bigGloabalProperty));
}

  var wildCardCaller = function(eventType,data ){
	 bigGloabalPropertySetter(3);
	diplayInMyConsole("wild  "+eventType+""+bigGloabalPropertySetter(3));
}

var ttPropertyChanged = subCast.subscribe( "PropertyChanged",  clientNotification);
 
var ttwildCard = subCast.subscribe( "wild*", wildCardCaller,{"value":"wildcards are on the run"}); 
 
// how to remove subscription
//subCast.unsubscribe(trackertoken_some);

//-- funtion just start an event chain...
setInterval(timecaller,5000);
function timecaller (){	
subCast.publish("wildCard");
subCast.publish("wilderness");
subCast.publish("wildgirls");

bigGloabalPropertySetter(2);

	}
	
// as you notice by now 
// all my pb/sub methods are attach to the global window 
// object  just to ensure its reach able at all times
