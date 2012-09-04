require.config({
    baseUrl: "./_scripts",
    paths: {
        "class": "../../../public/_scripts/_lib/class",
        "block": "../../../public/_scripts/_lib/block",
        "slideshow": "../../../public/_scripts/_lib/slideshow"
    },
    urlArgs: "version=1.0"
});

require(["jquery", "slideshow"], function ($, slideshow) {
    $(document).ready(function () {

        slideshow($("#banner")).initialize();

    });
});
