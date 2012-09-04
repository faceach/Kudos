!function () {
    if (!/*@cc_on!@*/0) {
        return;
    }
    var e = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),
    i = e.length;
    while (i--) {
        document.createElement(e[i]);
    }
} ();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// File:            base.js
// Defines:
// Dependencies:
// Description:     this is the base framework module.
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function () {
    "use strict";

    /* Function help function */
    /* Add method for Function/Object */
    Function.prototype.method = function (name, func) {
        if (!this.prototype[name]) {
            this.prototype[name] = func;
        }
        return this;
    };

    /* String help function */
    // Format: "Hello, {0}. {1}".format("Mr","DJ")
    String.method('format', function () {
        var s = this;
        for (var i = 0; i < arguments.length; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i]);
        }
        return s;
    });

    // Trim: " Hello, Mr. DJ  " --> "Hello, Mr. DJ"
    String.method('trim', function () {
        return this.replace(/^\s+/g, "").replace(/\s+$/g, "");
    });

    /* Array help function */
    // Format: [1,3,4,5,6].exist(2) --> false
    Array.method('exist', function (d) {
        var result = false;
        for (var i = 0; i < this.length; i++) {
            if (d === this[i]) {
                result = true;
                break;
            }
        }
        return result;
    });

    // Format: [1,3,4,5,6].exist(2) --> false
    Array.method('remove', function (i) {
        if (isNaN(i) || i > this.length) {
            return false;
        }
        this.splice(i, 1);
        return this;
    });

    /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
    (function () {
        if (typeof window.console === "undefined") {
            // Reg console in IE
            window.console = {};
            console.log = function (e) {
                throw (e);
            };
        }
    })();

})();