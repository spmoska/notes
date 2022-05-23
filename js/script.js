$(document).ready(function() {
    //Функция проверки cookie
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));
        return matches?decodeURIComponent(matches[1]):undefined
    }
    
    //Функция установки флага в cookie
    function setCookie(name,value,props) {
        props = props || { };
        var exp = props.expires;
        if(typeof exp == "number" && exp) {
            var d = new Date;
            d.setTime(d.getTime() + exp * 1E3);
            exp = props.expires = d
        }
        if(exp && exp.toUTCString) props.expires=exp.toUTCString();
        
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in props) {
            updatedCookie += "; " + propName;
            var propValue = props[propName];
            if(propValue !== true) updatedCookie += "=" + propValue
        }
        document.cookie = updatedCookie
    }

    //Функция получения текущей даты
    function date() {
        let curDate = new Date(),
        day = curDate.getDate(),
        month = curDate.getMonth() + 1,
        year = curDate.getFullYear(),
        date = day + '.0' + month + '.' + year;
        return date;
    };

    //Функция получения данных из полей редактора
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

    
    if (getCookie("flag") != "1") {
        setCookie("flag", "1", {expires: 30 * 60});
        note = {
            title: "Lorem impsum",
            text: "mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu",
            date: date()
        };
        localStorage.setItem(0, JSON.stringify(note));
    }
    //Получаем список элементов с классом .list__item
    let list__item = document.getElementsByClassName("list__item");

    let parentOfButton;
    
    //Проверяем localStorage на наличие записей, если записи есть, то создаем миниатюру заметки
    if (localStorage.length != 0) {
        for (var i = 0; i < localStorage.length; i++) {
            //Парсим данные из localStorage
            let note__info = JSON.parse(localStorage.getItem(i)); 
            //Создаем разметку миниатюры
            $(".list").append('<div class="list__item"><div class="note__body"><h3 class="note__title"></h3><p class="note__text__min"></p><div class="note__body__menu"><div class="buttons"><button class="animate__animated animate__bounceIn edit" method="post">Редактировать</button><button class="animate__animated animate__bounceIn delete" method="post">Удалить</button></div></div></div><div class="date"></div></div>');
            //Всавляем данные в миниатюру
            $(".note__title").eq(i).text(note__info.title);
            $(".note__text__min").eq(i).text(note__info.text.substring(0, 300));
            $(".date").eq(i).text(note__info.date);
        }
    }

    $(".current__date").text(date());
    $(".exit").click(function() {
        $(".notepad").removeClass("active");
    })

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
        //Получем родителя кнопки edit
        parentOfButton = $(this).parent().parent().parent().parent();
        //Парсим данные из localStorage
        note__info = JSON.parse(localStorage.getItem(parentOfButton.index()-1));
        $(".notepad__header").children().val(note__info.title);
        $(".notepad__editor").children().val(note__info.text);
    });
    
    $(".delete").click(function() {
        //Получем родителя кнопки delete
        parentOfButton = $(this).parent().parent().parent().parent();
        //Удаляем запись из localStorage
        localStorage.removeItem(parentOfButton.index()-1);
        //Проходим по записям localStorage и уменьшаем ключи записией
        for (let i = 0; i < localStorage.length + 1; i++) {
            if(i > parentOfButton.index()-1) {
                localStorage.setItem(i - 1, localStorage.getItem(i));
                localStorage.removeItem(i);
            }
        }
        $(this).parent().parent().parent().parent().remove();
    });

    $("#save").click(function() {
        //Проверяем есть ли у блока кнопок класс active, если есть, то...
        if (($(".buttons").hasClass("active"))) {
            //...Удаляем запись из localStorage с индексом родителя кнопки edit...
            localStorage.removeItem(parentOfButton.index()-1);
            //...Записываем в localStorage с индексом родителя кнопки edit...
            localStorage.setItem(parentOfButton.index()-1, JSON.stringify(getNote()));
            $(".note__body__menu").removeClass("active");
            $(".buttons").removeClass("active");
        }
        //...иначе записываем данные из полей редактора и создаем новую миниатюру (она создается при обновлении страницы)
        else {
            localStorage.setItem(list__item.length, JSON.stringify(getNote()));
        }
        $(".notepad").removeClass("active");
    });
})