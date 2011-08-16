//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// File:            reg.js
// Defines:
// Dependencies:
// Description:     this is the document ready functions for reg page
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function($) {

    var Plan = function() {

        var $elBox = $("#fnb-planlist");
        var $elForm = $("#form-function");
        var $elHour = $("#fnb-hour");

        var edit = function() {
            $elBox.find(" > a").live("click", function() {

                var val = $(this).find("span.ph-val").text();
				var target_id = $(this).find("input.ph-target-id").val();
                switch (val) {
                    case "1":
                    default:
                        $elHour.addClass("ph-1");
                        $elHour.find("span.ph-val").text(val);
						$elHour.find("input.ph-target-id").val(target_id)
                        break;
                    case "10":
                        $elHour.addClass("ph-10");
                        $elHour.find("span.ph-val").text(val);
						$elHour.find("input.ph-target-id").val(target_id)
                        break;
                    case "100":
                        $elHour.addClass("ph-100");
                        $elHour.find("span.ph-val").text(val);
						$elHour.find("input.ph-target-id").val(target_id)
                        break;
                }
                $elBox.hide();
                $elForm.show("fast").animate(
                    {
                        left: 30
                    },
                    {
                        duration: 200
                    }
                );
            });
        };

        this.reset = function() {
            $elForm.animate(
                {
                    left: "-660px"
                },
                {
                    duration: 200,
                    complete: function() {
                        $elForm.css("left", "100%").hide();
                        $elBox.show()
                    }
                }
            );
        };

        this.init = function() {
            edit();
        };

    };

    var Burn = function() {

        var $elSubmit = $("#fnb-submit");
        var cssClass = "btn-disable";

        var validNumeric = function() {

            var el = $("#fnb-input")[0],
                $elErr = $("#fnb-err");

            var handle = function() {
                var txt = el.value;
                var maxMin = parseInt($("#fnb-hour span.ph-val").text()) * 60;

                if (txt !== "") {
                    if (!isNaN(txt)) {
                        if (txt <= maxMin) {
                            $elSubmit.removeClass(cssClass);
                            $elErr.html("");
                        }
                        else {
                            $elSubmit.addClass(cssClass);
                            $elErr.html(ZM.Config.Msg.Valid.outside);
                        }
                    }
                    else {
                        $elSubmit.addClass(cssClass);
                        $elErr.html(ZM.Config.Msg.Valid.numeric);
                    }
                }
                else {
                    $elSubmit.addClass(cssClass);
                    $elErr.html("");
                }
            };

            // input text change event
            if ($.browser.msie) {
                el.onpropertychange = handle;
            }
            else {
                el.addEventListener("input", handle, false);
            }
            el.addEventListener("blur", handle, false);

        };

		var asyncSubmit = function(args, callback){
			var url = "/targets/{0}/activities.json?user_id={1}".format(args.target_id, args.user_id);
			var args = args;
			var param = {
				url: url,
				data: args,
				type: "POST",
				dataType: "json",
				beforeSend : function(xhr){
				       xhr.setRequestHeader("Accept", "application/json")
				     },
				success: function(data){
					if(data && data.result === "success"){
						typeof callback === "function"?callback():null;
						// Reset Plan
						var objPlan = new Plan();
	                    objPlan.reset();
					}
					else{
						alert("Error");
					}
				},
				error: function(){
					alert("Error");
				}
			};
			$.ajax(param);
		};
		
        var clickSubmit = function() {

            $("#fnb-submit").click(function() {
                if (!$(this).hasClass(cssClass)) {
					var args = {
						target_id: $("#fnb-hour .ph-target-id").val(),
						user_id: $("#fnb-hour .ph-user-id").val(),
						count: $(".formbox #fnb-input").val(),
						authenticity_token: $("#fnb-hour .ph-authenticity").val()
						};
					var callback = "";
					asyncSubmit(args, callback);
                }
                return false;
            });

        };

        this.init = function() {
            validNumeric();
            clickSubmit();
        };
    };

    var Progress = function() {

        var event = function() {
            $("#activitystatusbox ul li").bind({
                "mouseover": function() {
                    $(this).find(".asb-giveup").show();
                },
                "mouseout": function() {
                    $(this).find(".asb-giveup").hide();
                }
            });
            $("#activitystatusbox ul li .asb-giveup").bind({
                "mouseover": function() {
                    $(this).find(".asb-gu-prompt").show();
                },
                "mouseout": function() {
                    $(this).find(".asb-gu-prompt").hide();
                }
            });
        };

        this.init = function() {
            event();
        };
    };

    ZM.UI.Mypage = {
        init: function() {
            var objBurn = new Burn();
            objBurn.init();

            var objPlan = new Plan();
            objPlan.init();

            var objProgress = new Progress();
            objProgress.init();
        }
    };

})(jQuery);

// Document Ready.
jQuery(function($) {

    ZM.UI.Mypage.init();

});

// Window Onload.
ZM.windowOnload = window.onload;
window.onload = function() {
    if (ZM.windowOnload) {
        ZM.windowOnload();
    }
    // Your code here
};