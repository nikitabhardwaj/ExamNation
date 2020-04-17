/*
-v:     1.0.0
Author: type-writer
date:   19th aug 2019
dscr:   Simple event publishing and subscribing plugin. Supports, publish event by key or keys and trigger them
        separately or comma separated list. Also can be subscribe separately or comma separated list.
                                            :)
*/
(function(alias){
    var EventBox = function (object, isVMode) {
        var __p=this;
        var triggers = {};
        var validateRegistered = function (eventName) {
            if (!(triggers[eventName] && Array.isArray(triggers[eventName]))) {
                if (isVMode) {
                    throw "Event: '" + eventName + "' not registered";
                } else {
                    return false;
                }
            }
            return true;
        };
        //add event,//eventName=["change","click"] or ["change,click"] both are same, can call togather one after one
        var on = function (eventName, callback) {
            if (eventName) {
                eventName.split(",").forEach(function (v) {
                    if (v && v.trim()) {
                        v=v.trim();
                        if (validateRegistered(v)) {
                            triggers[v].push(callback);
                        }
                    }
                });
            }
        };
        //delete handlers,//eventName=["change","click"] or ["change,click"] both are same, can call togather one after one
        var off = function (eventName) {
            if (eventName) {
                eventName.split(",").forEach(function (v) {
                    if (v && v.trim()) {
                        v=v.trim();
                        if (validateRegistered(eventName)) {
                            triggers[eventName] = [];
                        }
                    }
                });
            }
        };
        //delete whole event,//eventName=["change","click"] or ["change,click"] both are same, can call togather one after one
        var _delete = function (eventName) {
            if (eventName) {
                eventName.split(",").forEach(function (v) {
                    if (v && v.trim()) {
                        v=v.trim();
                        if (validateRegistered(eventName)) {
                            delete triggers[eventName];
                        }
                    }
                });
            }
        };
        //trigger event, eventName=["change","click"] or ["change,click"] both are same, can call togather one after one
        var trigger = function (eventName, arg) {
            if (eventName) {
                eventName.split(",").forEach(function (v) {
                    if (v && v.trim()) {
                        v=v.trim();
                        if (validateRegistered(v)) {
                            triggers[v].forEach(function (x) {
                                if (typeof x === "function") {
                                    x(object, arg, v);
                                }
                            });
                        }
                    }
                });
            }
        };
    
        //eventName=["change","click"] or ["change,click"] both are same, can call togather one after one
        this._register = function (eventName) {
            if (eventName) {
                eventName.split(",").forEach(function (v) {
                    if (v && v.trim()) {
                        v=v.trim();
                        if (!(triggers[v] && Array.isArray(triggers[v]))) {
                            triggers[v] = [];
                        }
                    }
                });
            }
        };
        (function () {
            object._on = on;
            object._off = off;
            object._delete = _delete;
            object._trigger = trigger;
            object._emit = trigger;
            __p.v="1.0.0";
        }());
    };
    (function () {
        window[alias] = EventBox;
    }());
}("EventBox"));//you change alias

// var cls = new function () { };
// var ev = new EventBox(cls, true);
// ev._register('change,click');
// // cls._on('change', function (sender, arg,evtName) {
// //     alert('change event fired');
// //     console.log(sender, arg,evtName);
// // });
// cls._on('change,click', function (sender, arg,evtName) {
//     alert(evtName+' event fired');
//     console.log(sender, arg,evtName);
// });
// //cls._off('change')

// cls._emit('change,click', { a: 2 });
// //or
// cls._trigger('change,click', { a: 2 });
//$(function(){
//     var z=$("a");
//    // var ev = new EventBox(z, true);
//    // console.log(z);
//    // ev._register('change');
//    // z._on('change',function(a,b,c){
//    //     console.log(a,b,c);
//    // })
//    // z._trigger('change');
//    $('a').on('someFunction',function() {
//        alert('go away!')
//    });
//    $('a').trigger('someFunction');
//});
