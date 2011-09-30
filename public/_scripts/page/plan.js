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
		var categoryId;
	
		var updateCategory = function(objPlan){
			var $categoryLi,
				name;
			if(objPlan){
				categoryId = objPlan.id;
				$categoryLi = objPlan.el;
			}
			var $planName = $("#plan-name");
			name = $categoryLi.find(".planlist-name").text();
			
			$planName.text(name);
		};

        var renderCategory = function(categoryList){
			var objPlanList = new ZM.PlanList({ $container: $("div.planlist-container"), visibleNum: 6 });
        	objPlanList
        	.renderList(categoryList)
        	.select(updateCategory, 0)
        	.nav(function (i) { console.log("move to " + i + " paragraph"); });
		};

		// http://0.0.0.0:3000/categories
		var param = {
			url: "/categories",
			type: "GET",
			datatype: "application/json",
			success: function(data){
				if(data && data.result === "success"){
					var cl = data.categoryList;
					if(cl && cl.length > 0){
						renderCategory(cl);
					}
					else{
						console && console.log("No category");						
					}
				}
				else{
					console && console.log("Category error");
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
					console && console.log("Category error");
			}
		};
		$.ajax(param);
		
		var $hourContainer = $("#planhour");
		$hourContainer.find(" > li > a").live("click",function(){
			var $el = $(this);
			var hour = $el.find(" > span.ph-val").text();
			if(hour){
				hour = parseFloat(hour);
			}
			else{
				hour = 0;
			}
			
			var data;
			
			// {"target":{"target_count":9, "category_id":1}}			
			if(categoryId && hour){
				data = {"target":{"target_count": hour, "category_id": categoryId}};
				
				var param = {
					url: "/targets?user_id=" + userId,
					data: data,
					type: "POST",
					datatype: "application/json",
					success: function(data){
						if(data && data.result === "success"){
							location.href = "/targets";
						}
						else{
							console && console.log("Create target error");
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console && console.log("Create target error");
					}
				};
				$.ajax(param);				
			}
			
		});

});

// Window Onload.
ZM.windowOnload = window.onload;
window.onload = function () {
    if (ZM.windowOnload) {
        ZM.windowOnload();
    }
    // Your code here
};