//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// File:            x.js
// Defines:
// Dependencies:
// Description:     load js for x page
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Closure
(function ($) {


})(jQuery);

// Document Ready.
jQuery(function ($) {

		var userId = $("#zm-userid").val();
		
        !function () {
            var $prong = $("div#publishbox > span.publishbox-prong");
            var defaultLeft = parseInt($prong.position().left);

            var planSelectCallback = function (order, plan_id) {

                var $planlistUl = $("div.planlist-container").find("ul.planlist");
                var $planlistLi = $planlistUl.find(" > li");
                var $planlistLiDelegate = $planlistLi.eq(1);
                var liWidth = $planlistLiDelegate.width();
                var liMarginLeft = parseInt($planlistLiDelegate.css("margin-left"));
                var liSpan = liWidth + liMarginLeft;

                $prong.show().animate(
                    {
                        left: defaultLeft + liSpan * (order % 5)
                    },
                    400,
                    function () {
                        // Animation complete.
                    });
            };

            var planNavCallback = function (order) {
                $prong.hide().css("left", defaultLeft);
            };

            var objPlanList = new ZM.PlanList({ $container: $("div.planlist-container"), visibleNum: 5 });
            objPlanList
        .render(testPlanListData)
        .nav(planNavCallback)
        .select(planSelectCallback, 0);
        } ();

        ZM.Form.textHint($("#publishbox-input"), $("#publishbox-input-hint"));

        !function () {
            var burnSlider = function (defaultVal, maxVal) {
                var $elValue = $("#publishbox-time");
                $elValue.text(defaultVal);
                $("#publishbox-dragbar").slider({
                    range: "min",
                    value: defaultVal,
                    min: 0,
                    max: maxVal,
                    slide: function (event, ui) {
                        $elValue.text(ui.value);
                    }
                });
            };
            burnSlider(50, 180);
        } ();

		// http://0.0.0.0:3000/targets
		var param = {
			url: "/targets?user_id=" + userId,
			type: "GET",
			datatype: "application/json",
			success: function(data){
				if(data && data.result === "success"){
					debugger;
					var cl = data.detail;
					if(cl && cl.length > 0){
						renderCategory(cl);
					}
					else{
						console && console.log("No target");						
					}
				}
				else{
					console && console.log("Get target error");
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
					console && console.log("Get target error");
			}
		};
		$.ajax(param);

});

// Window Onload.
ZM.windowOnload = window.onload;
window.onload = function () {
    if (ZM.windowOnload) {
        ZM.windowOnload();
    }
    // Your code here
};