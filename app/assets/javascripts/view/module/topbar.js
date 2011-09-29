//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// File:            topbar.js
// Defines:
// Dependencies:
// Description:     JS UI functions for Zhuomi Top Bar
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function ($) {
	"use strict";

    var topbar = function () {
        var $menu = $("#topbar-menu"),
            $close = $("#topbar-btn-close");

        // Expand/Close Events
        $("#topbar-menu a").click(function () {
            var that = this;
            var el = $(this).attr("href");
            if ($(el).css("display") === "none") {
                $menu.find(" > li").removeClass("active")
                $(that).parent("li").addClass("active");
                $(el).show("fast", function () {
                    $close.show();
                });
            }
            else {
                $close.hide();
                $(el).hide("fast", function () {
                    $menu.find(" > li").removeClass("active")
                });
            }
        });
        $close.click(function () {
            $(this).hide();
            $(".topbar-content").hide("fast", function () {
                $menu.find(" > li").removeClass("active");
            });
        });
		//
		var $form = $("#loginform");
		$form.find(".loginform-submit").live("click",function(){
			console && console.log("clicked");
			var username = $("#loginform-username").val();
			var password = $("#loginform-password").val();
			var data = {"email":username, "password":password};
			var param = {
				url: "http://0.0.0.0:3000/users/login",
				data: data,
				type: "POST",
				datatype: "application/json",
				success: function(data){
					if(data && data.result === "success"){
						location.href="/targets";
					}
					else{
						console && console.log("login error");
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
						console && console.log("login error");
				}
			};
			$.ajax(param);
		});
    };

    // Document Ready.
    $(topbar);

})(jQuery);