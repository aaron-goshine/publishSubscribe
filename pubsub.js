/*
*Copyright (C) 2011 by Goshine Design of Aaron Goshine
*AUTHOR:Aaron Goshine
*Permission is hereby granted, free of charge, to any person obtaining a copy
*of this software and associated documentation files (the "Software"), to deal
*in the Software without restriction, including without limitation the rights
*to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*copies of the Software, and to permit persons to whom the Software is
*furnished to do so, subject to the following conditions:

*The above copyright notice and this permission notice shall be included in
*all copies or substantial portions of the Software.

*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*THE SOFTWARE.
*/
(function (win) {
    'use strict';
    var w = win.subCast = {},
        subscriptionStack = {},
        //init at -1  to mentain zero base index while 
        tokenId = -1,
        wildCardArrest = function (wildStr, bool) {
            //-- convert literal wild cards to regex
            if (bool) {
                return new RegExp(wildStr.replace('*', "(.*)"));
            }
            else {
                return wildStr;
            }
        };
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
        }
        else {
            subscribers = subscriptionStack[eventType];
        }
        // var subscribers = subscriptionStack[eventType];
        var pushSubscription = function () {
                for (var i = 0, j = subscribers.length; i < j; i += 1) {
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
                for (var i = 0, j = subscriptionStack[s].length; i < j; i += 1) {
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