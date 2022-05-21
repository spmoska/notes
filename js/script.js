$(document).ready(function() {
    $(".list__item").click(function() {
        $(".note__body__menu", this).toggleClass("active");
        $(".buttons", this).toggleClass("active");
    })
})