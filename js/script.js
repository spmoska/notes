$(document).ready(function() {
    function date() {
        let curDate = new Date(),
        day = curDate.getDate(),
        month = curDate.getMonth() + 1,
        year = curDate.getFullYear(),
        date = day + '.0' + month + '.' + year;
        return date;
    }

    $(".current__date").text(date());
    $(".list__item").click(function() {
        $(".note__body__menu", this).toggleClass("active");
        $(".buttons", this).toggleClass("active");
    })

})