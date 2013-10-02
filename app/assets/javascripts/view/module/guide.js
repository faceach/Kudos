//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// File:            footer.js
// Defines:
// Dependencies:
// Description:     JS UI functions for Zhuomi footer
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function ($) {

    var Guide = {

        _click: function () {

        },

        _mouseCoordinate: function () {

            function mousePosition(ev) {
                if (ev.pageX || ev.pageY) {
                    return {
                        x: ev.pageX,

                        y: ev.pageY
                    };
                }
                return {
                    x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,

                    y: ev.clientY + document.body.scrollTop - document.body.clientTop
                };
            }

            document.onmousemove = mouseMove;

            function mouseMove(ev) {
                ev = ev || window.event;
                var mousePos = mousePosition(ev);

                var _sw = window.screen.width;
                if (mousePos) {
                    var _x = mousePos.x;
                    if (_x < _sw / 2) {
                        $("#slidenav > li.slidenav-prev").show("fast");
                        $("#slidenav > li.slidenav-next").hide("fast");
                    }
                    else {
                        $("#slidenav > li.slidenav-prev").hide("fast");
                        $("#slidenav > li.slidenav-next").show("fast");
                    }
                }

            }

        },

        init: function () {
            var ord = [
                "/users/login",
                "/users/new",
                "/targets/new",
                "/targets",
                "/profile",
                "/account"
            ];
            var $guideButton = $("<ul id=\"slidenav\">" +
                                    "<li class=\"slidenav-prev hidden\">" +
                                        "<a id=\"slidenav-btn-prev\" class=\"hand pos-abs txtindent\">Previous</a>" +
                                    "</li>" +
                                    "<li class=\"slidenav-next hidden\">" +
                                        "<a id=\"slidenav-btn-next\" class=\"hand pos-abs txtindent\">Next</a>" +
                                    "</li>" +
                                "</ul>");
            var $prev = $guideButton.find("#slidenav-btn-prev"),
                $next = $guideButton.find("#slidenav-btn-next");

            // Get Current Page Index
            var arrUrl = location.pathname;
            var iNav = 0;
            for (var i = 0; i < ord.length; i++) {
                if (ord[i] === arrUrl) {
                    iNav = i;
                    break;
                }
            }

            // Status
            if (iNav === 0) {
                $prev.hide();
                urlNext = ord[iNav + 1];
            }
            else if (iNav === ord.length - 1) {
                $next.hide();
                urlPrev = ord[iNav - 1];
            }
            else {
                urlPrev = ord[iNav - 1];
                urlNext = ord[iNav + 1];
            }

            // Append HTML
            $("body").append($guideButton);

            // Events
            $prev.click(function () {
                location.href = urlPrev;
            });
            $next.click(function () {
                location.href = urlNext;
            });

            // Mouse Events
            this._mouseCoordinate();

        }
    };

    // Document Ready.
    jQuery(function ($) {

        Guide.init();

    });

})(jQuery);