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
	"use strict";
	
	var userId = $("#zm-userid").val();
			
	//http://0.0.0.0:3000/users/1/
	var param = {
		url: "/targets?user_id=" + userId,
		type: "GET",
		datatype: "application/json",
		success: function(data){
			if(data && data.result === "success"){
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