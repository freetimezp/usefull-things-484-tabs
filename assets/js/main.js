$(document).ready(function () {
    $(".box").on("click", "li", function () {
        var tabsId = $(this).attr("id");

        $(this).addClass("active").siblings().removeClass("active");
        $("#" + tabsId + "-content-box")
            .addClass("active")
            .siblings()
            .removeClass("active");
    });
});
