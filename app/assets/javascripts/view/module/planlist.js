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
	"use strict";

    ZM.PlanList = function (args) {
        this.$planlistContainer = args.$container || $("div.planlist-container");
        this.visibleNum = args.visibleNum || 1;
        this.duration = args.duration || 400;

        this.$planlistUl = this.$planlistContainer.find("ul.planlist");
        this.$planlistLi = this.$planlistUl.find(" > li");
    };

    ZM.PlanList.prototype.nav = function (callback) {
        var $planlistContainer = this.$planlistContainer;
        var $planlistUl = this.$planlistUl;
        var $planlistLi = this.$planlistLi;

        var $dotNav = $("<div class='dotnav-container txtalign-c'>" +
                                "<ul class='dotnav hor'>" +
                                    "<li class='active'>0</li>" +
                                "</ul>" +
                            "</div>");

        var visibleNum = this.visibleNum,
                duration = this.duration;

        var _l = $planlistLi.length;

        if (_l > visibleNum) {
            var $planlistLiDelegate = $planlistLi.eq(1);
            var liWidth = $planlistLiDelegate.width();
            var liMarginLeft = parseInt($planlistLiDelegate.css("margin-left"));
            var ulWidth = 0,
                    containerWith = 0;
            var paragraphCount = Math.ceil(_l / visibleNum - 1);

            ulWidth = liWidth * _l + liMarginLeft * (_l - 1);
            containerWith = liWidth * visibleNum + liMarginLeft * (visibleNum - 1);

            $planlistContainer.width(containerWith);
            $planlistUl.width(ulWidth);

            for (var i = 0; i < paragraphCount; i++) {
                $dotNav.find(" > ul.dotnav").append("<li>" + (i + 1) + "</li>");
            }

            var paragraphWidth = containerWith + liMarginLeft;

            var $dotNavLi = $dotNav.find(" > ul.dotnav > li");

            $dotNavLi.live("click", function () {
                var order = $(this).text();
                $planlistUl.animate(
                        {
                            left: -(order * paragraphWidth)
                        },
                        duration,
                        function () {
                            // Animation complete.
                            typeof callback === "function" ? callback.call(null, order) : null;
                        });

                $dotNavLi.removeClass("active");
                $(this).addClass("active");
            });
        }
        // Append Dot Nav
        $planlistContainer.after($dotNav);

        return this;
    };

    ZM.PlanList.prototype.select = function (callback, defaultVal) {
        var $planlistContainer = this.$planlistContainer;
        var $planlistUl = this.$planlistUl;
        var $planlistLi = this.$planlistLi;

        var __planList = this;

        var $dotNavLi = $("ul.dotnav > li");

        $planlistLi.live("click", function () {
			var $el = $(this);
            $planlistLi.removeClass("active");
            $el.addClass("active");

            /* Highlight select dot */
            var order = $el.data("order");
            var vn = __planList.visibleNum;
            var navOrder = Math.floor(order / vn);
            var $selectLi = $dotNavLi.eq(navOrder);
            $dotNavLi.removeClass("select");
            $selectLi.addClass("select");

			var objPlan = {
				order: order,
				id: $el.data("pid"),
				el: $el
			};

            typeof callback === "function" ? callback.call(null, objPlan) : null;
        });
        if (defaultVal !== undefined) {
            $planlistLi.eq(defaultVal).click();
        }

        return this;
    };

	ZM.PlanList.prototype.render = function(plan, idx){
		if(!plan){
			return;
		}
        var htmlPlanlistLiTemp = "<li>" +
                                    "<a class='hand txtalign-c'>" +
                                        "<img src='{0}' width='73' height='73' />" +
                                        "<span class='planlist-name mgry txt-xl'>{1}</span>" +
                                    "</a>" +
                                "</li>";
		var htmlPlanlistLi = "",
			$planlistLi;
		var $planlistUl = this.$planlistUl;
		var id, image, categoryName;
		id = plan.id;
		image = plan.image;
		image || (image = ZM.Config.defaultIcon);
		categoryName = plan.name;
		
        htmlPlanlistLi = htmlPlanlistLiTemp.format(image, categoryName);
		$planlistLi = $(htmlPlanlistLi);
		$planlistLi.data("order", idx);
		$planlistLi.data("pid", id);
        $planlistUl.append($planlistLi);

		return $planlistLi;
	};
	
	ZM.PlanList.prototype.initPlanlist = function(){
		var $planlistUl = this.$planlistUl;
		$planlistUl.find(" > li:first").addClass("first");
        this.$planlistLi = $planlistUl.find(" > li");	
	};

    ZM.PlanList.prototype.renderList = function (data) {
		var plan;
        for (var i = 0; i < data.length; i++) {
			plan = data[i].category;
			if(plan){

				this.render(plan, i);
			}
        }
		this.initPlanlist();

        return this;
    };

    ZM.PlanList.prototype.renderDetailList = function (data) {
		var d, plan, $li;
        for (var i = 0; i < data.length; i++) {
			d = data[i].target;
			plan = d.category;
			if(plan){
				$li = this.render(plan, i);
				if($li){
					$li.data("hour", d.target_count);
				}
			}
        }
		this.initPlanlist();

        return this;
    };

})(jQuery);
