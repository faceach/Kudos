require.config({
    baseUrl: "./_scripts",
    paths: {
        "class": "_lib/class",
        "block": "_lib/block",
        "slideshow": "_lib/slideshow"
    },
    urlArgs: "version=1.0"
});

require(["jquery", "slideshow"], function ($, slideshow) {
    $(document).ready(function () {

        slideshow($("#banner")).initialize();

    });
});
