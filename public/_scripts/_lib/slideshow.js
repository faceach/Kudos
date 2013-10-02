define(["jquery", "class"], function ($, Class) {
    "use strict";

    var Slideshow = Class.extend({
        init: function ($el, hasDot, hasNext) {
            this.$el = $el;
            this.contentClass = "ss-c";
            this.htmlDotContainer = "<p class='ss-d'></p>";
            this.htmlDot = "<a>{0}</a>";
            this.activeDotClass = "active";
            this.activeContentClass = "ss-c-active";
            this.htmlNext = "<a class='ss-c-next'></a>";
            this.htmlPrev = "<a class='ss-c-prev'></a>";
            this.index = 0;
            this.$elSlides;
            this.$elDefaultSlide;
            this.lensSlides = 0;

            this.hasDot = hasDot === undefined ? true : hasDot;
            this.hasNext = hasNext === undefined ? true : hasNext;
        },
        initialize: function () {
            this.$elSlides = this.$el.find("." + this.contentClass);
            this.$elDefaultSlide = this.$el.find("." + this.activeContentClass);
            this.lensSlides = this.$elSlides.length;
            this.index = this.$elDefaultSlide.index();
            if (this.hasNext) {
                this._createNext();
                this._createPrev();
            }
            if (this.hasDot) {
                this._createDots();
            }
            this._setIndex(this.index);
            return this;
        },
        _createDots: function () {
            var lensSlides = this.lensSlides,
                $elDotContainer = $(this.htmlDotContainer),
                htmlDots = "",
                defaultIndex = this.index;
            for (var i = 0; i < lensSlides; i++) {
                htmlDots += this.htmlDot.format(i + 1);
            }
            this._regDotEvents($elDotContainer);
            $elDotContainer.append(htmlDots);
            this.$el.append($elDotContainer);
            return this;
        },
        _regDotEvents: function ($elDotContainer) {
            var _this = this;
            $elDotContainer.delegate("a", "click", function () {
                var $this = $(this),
                    index = $this.index();
                _this._move(index);
                return false;
            });
            return $elDotContainer;
        },
        _createNext: function () {
            var $elNext = this._regNextEvents($(this.htmlNext));
            this.$el.append($elNext);
            return this;
        },
        _regNextEvents: function ($elNext) {
            var _this = this;
            $elNext.click(function () {
                var index = _this.index + 1;
                if (index > _this.lensSlides - 1) {
                    return;
                }
                _this._move(index);
                return false;
            });
            return $elNext;
        },
        _createPrev: function () {
            var $elPrev = this._regPrevEvents($(this.htmlPrev));
            this.$el.append($elPrev);
            return this;
        },
        _regPrevEvents: function ($elPrev) {
            var _this = this;
            $elPrev.click(function () {
                var index = _this.index - 1;
                if (index < 0) {
                    return;
                }
                _this._move(index);
                return false;
            });
            return $elPrev;
        },
        _move: function (index) {
            var $elSlides = this.$elSlides;
            $elSlides
            .removeClass(this.activeContentClass);
            $elSlides
            .eq(index)
            .addClass(this.activeContentClass);
            this._setIndex(index);
        },
        _setIndex: function (index) {
            this.index = index;

            var $elDotContainer = this.$el.find(".ss-d");
            $elDotContainer.find("a").removeClass(this.activeDotClass);
            $elDotContainer.find("a").eq(index).addClass(this.activeDotClass);

            if (index > 0 && index < this.lensSlides - 1) {
                this.$el.find(".ss-c-next").show();
                this.$el.find(".ss-c-prev").show();
            }
            else if (index >= this.lensSlides - 1) {
                this.$el.find(".ss-c-next").hide();
                this.$el.find(".ss-c-prev").show();
            }
            else {
                this.$el.find(".ss-c-next").show();
                this.$el.find(".ss-c-prev").hide();
            }

        }
    });

    return function ($el, hasDot, hasNext) {
        return new Slideshow($el, hasDot, hasNext);
    };
});