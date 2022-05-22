$(document).ready(function() {
    let list__item = document.getElementsByClassName("list__item");
    console.log(list__item);

    function getNote() {
        let title = $("#note__title").val();
        const text = $("#note__text").html();
        let note = {
            title: title,
            text: text
        };
        return note;
    }

    $("#save").click(function() {
        
        localStorage.setItem(list__item.length+1, JSON.stringify(getNote()));
        $(".notepad").removeClass("active");
        $(".note__body__menu").removeClass("active");
        $(".buttons").removeClass("active");
    })
})