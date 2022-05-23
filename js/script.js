$(document).ready(function() {
    let list__item = document.getElementsByClassName("list__item");
    let parentOfButton;
    
    if (localStorage.length != 0) {
        for (var i = 0; i < localStorage.length; i++) {
            let note__info = JSON.parse(localStorage.getItem(i));
            $(".list").append('<div class="list__item"><div class="note__body"><h3 class="note__title"></h3><p class="note__text__min"></p><div class="note__body__menu"><div class="buttons"><button class="animate__animated animate__bounceIn edit" method="post">Редактировать</button><button class="animate__animated animate__bounceIn delete" method="post">Удалить</button></div></div></div><div class="date"></div></div>');
            $(".note__title").eq(i).text(note__info.title);
            $(".note__text__min").eq(i).text(note__info.text.substring(0, 300));
            $(".date").eq(i).text(note__info.date);
        }
    }

    function date() {
        let curDate = new Date(),
        day = curDate.getDate(),
        month = curDate.getMonth() + 1,
        year = curDate.getFullYear(),
        date = day + '.0' + month + '.' + year;
        return date;
    };

    function getNote() {
        let title = $("#note__title").val();
        const text = $("#note__text").val();
        let note = {
            title: title,
            text: text,
            date: date()
        };
        return note;
    };

    function addNote() {
        
    }

    $("#save").click(function() {
        
        if (($(".buttons").hasClass("active"))) {
            localStorage.removeItem(parentOfButton.index()-1);
            localStorage.setItem(parentOfButton.index()-1, JSON.stringify(getNote()));
            $(".note__body__menu").removeClass("active");
            $(".buttons").removeClass("active");
        }
        else {
            localStorage.setItem(list__item.length, JSON.stringify(getNote()));
        }
        $(".notepad").removeClass("active");
    })

    $(".current__date").text(date());

    $(".list__item").click(function() {
        $(".note__body__menu").removeClass("active");
        $(".buttons").removeClass("active");
        $(".note__body__menu", this).addClass("active");
        $(".buttons", this).addClass("active");
    });

    $(".new__note").click(function() {
        $(".notepad").addClass("active");
        $(".note__body__menu").removeClass("active");
        $(".buttons").removeClass("active");
    });

    $(".edit").click(function() {
        $(".notepad").addClass("active");
        parentOfButton = $(this).parent().parent().parent().parent();
        note__info = JSON.parse(localStorage.getItem(parentOfButton.index()-1));
        $(".notepad__header").children().val(note__info.title);
        $(".notepad__editor").children().val(note__info.text);
    });
    
    $(".delete").click(function() {
        parentOfButton = $(this).parent().parent().parent().parent();
        localStorage.removeItem(parentOfButton.index()-1);
        for (let i = 0; i < localStorage.length + 1; i++) {
            if(i > parentOfButton.index()-1) {
                localStorage.setItem(i - 1, localStorage.getItem(i));
                localStorage.removeItem(i);
            }
        }
        $(this).parent().parent().parent().parent().remove();
    });
})