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
		
        var $prong = $("div#publishbox > span.publishbox-prong");
        var defaultLeft = parseInt($prong.position().left);
		
		// Text hint
	    ZM.Form.textHint($("#publishbox-input"), $("#publishbox-input-hint"));

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

        var planSelectCallback = function (objPlan) {
				var order, $categoryLi;
				if(objPlan){
					order = objPlan.order;
					categoryId = objPlan.id;
					$categoryLi = objPlan.el;
				}
				// Init burn drag-bar
				var hour = $categoryLi.data("hour");
				burnSlider(0, hour);
				// Effects
                var liWidth = $categoryLi.width();
                var liMarginLeft = parseInt($categoryLi.css("margin-left"));
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

		var renderCategory = function(categoryList){
            var objPlanList = new ZM.PlanList({ $container: $("div.planlist-container"), visibleNum: 5 });
            objPlanList
        		.renderDetailList(categoryList)
        		.nav(planNavCallback)
        		.select(planSelectCallback, 0);
        };

		// http://0.0.0.0:3000/targets
		var param = {
			url: "/targets?user_id=" + userId,
			type: "GET",
			datatype: "application/json",
			success: function(data){
				if(data && data.result === "success"){
					/*
					{
						"status":"active",
						"target_count":10,
						"category":{
							"desc":"Running",
							"id":1,
							"image":"/assets/icons/run.png",
							"name":"running"
						},
						"metadata":{
							"name":"hour"
						}
					}
					*/
					var detail = data.detail;
					if(detail && detail.length > 0){
						renderCategory(detail);
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