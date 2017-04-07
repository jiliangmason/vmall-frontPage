/**
 * Created by Administrator on 2017/3/30 0030.
 */
$(document).ready( function () {
    var aside = document.getElementsByClassName('aside-li');
    var banner = document.getElementsByClassName('select');
    var olist = document.getElementById('list-banner');
    var container = document.getElementById('container');
    var oli = document.getElementsByClassName('banner-li');
    var op_li = document.getElementById('option-li');
    var out_li = document.getElementById('option-li-list');
    var op_li_sec = document.getElementsByClassName('options-li2');

    var index = 1;
    var timer = null;
    var interval = 10;
    var time = 600;

    var $ = function (id) {
        return document.getElementById(id);
    };

    function hasClass(obj, cls) {
        return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            obj.className = obj.className.replace(reg, "");
        }
    }

    function addClass(obj, cls) {
        if (!hasClass(obj,cls)) {
            obj.className += " " + cls;
        }
    }


    /****************************下拉菜单*******************************/
    op_li.onmouseover = function () {
        out_li.style.display = 'block';
    };

    op_li.onmouseout = function () {
        out_li.style.display = 'none';
    };

    var no_bk = document.getElementById('no-bk');
    var options_menu1 = document.getElementsByClassName('options-ul2-menu1')[0];
    var options_menu2 = document.getElementsByClassName('options-ul2-menu2')[0];
    //var options_li21 = document.getElementById('options-li21');
    //var options_li22 = document.getElementById('options-li22');
    //var arrow1 = options_li21.getElementsByTagName('span')[0];
    //var arrow2 = options_li22.getElementsByTagName('span')[0];

    for (var i = 0; i < op_li_sec.length; i++)
    {
        (function (args) {

            op_li_sec[i].onmouseover = function () {
                this.className = "options-li2-hover";
                this.getElementsByTagName('span')[0].className = "arrow arrow-up";
                no_bk.className = 'options-second-a';
                if (args == 0) {
                    options_menu1.style.display = 'block';
                }
                else {
                    options_menu2.style.display = 'block';
                }

                //debugger;
            };

            op_li_sec[i].onmouseout = function () {
                this.className = "options-li2";
                this.getElementsByTagName('span')[0].className = "arrow";
                no_bk.className = "";
                if (args == 0) {
                    options_menu1.style.display = 'none';
                }
                else {
                    options_menu2.style.display = 'none';
                }
            }
        })(i);
    }
    /****************************下拉菜单*******************************/


    /****************************顶部搜索****************************/
    var logo_search = document.getElementsByClassName('logo-input')[0];
    var input_text = document.getElementsByClassName('logo-input-text')[0];
    var logo_point = document.getElementById('shop-pointer');
    var logo_shop = document.getElementsByClassName('logo-shop')[0];
    var logo_shop_menu = document.getElementsByClassName('logo-menu')[0];

    logo_search.onfocus = function () {
        input_text.style.display = 'none';
    };

    logo_search.onblur = function () {
        input_text.style.display = 'block';
    };

    function getItemsNumber(items) {
        logo_point.textContent = items || 0;
        var empty_menu = document.createElement('div');
        addClass(empty_menu, 'empty-menu');

        var empty_notes = document.createElement('span');
        empty_notes.innerText = "您的购物车是空的，赶紧选购吧~";
        addClass(empty_notes, 'empty-notes');
        empty_menu.appendChild(empty_notes);

        return empty_menu;

    }

    var shopMessage = getItemsNumber();

    logo_shop.onmouseover = function () {
        logo_shop_menu.appendChild(shopMessage);
        logo_shop_menu.style.display = 'block';
    };

    logo_shop.onmouseout = function () {
        logo_shop_menu.style.display = 'none';
    };

    /****************************顶部搜索****************************/


    /***************************公告轮播****************************/
    var timer_s;
    var notes = document.getElementById('notes-slider');
    var notes_list = document.getElementById('all-list');
    var note_time = 600;
    var note_interval = 300;

    notes.onmouseover = function () {
        clearInterval(timer_s);
    };

    timer_s = setInterval(function () {
        timeSlider(-48);
        }, 1000);

    notes.onmouseout = function () {
        timer_s = setInterval(function () {
        timeSlider(-48);
        }, 1000);
    };
    //JS

    var noteSlider = function (offset) {

        var target = parseInt(notes_list.style.top) + offset;
            notes_list.style.top = target + 'px';

        if (parseInt(notes_list.style.top) == -240)
            {
                notes_list.style.top = -48 + 'px';
            }
        };

    var timeSlider = function (offset) {
        var speed = offset/(note_time/note_interval);
        var target = parseInt(notes_list.style.top) + offset;

        if (speed < 0 && parseInt(notes_list.style.top) + speed > target)
        {
            notes_list.style.top = parseInt(notes_list.style.top) + speed + 'px';
            setTimeout(timeSlider, note_interval);
        }
        else {
            notes_list.style.top = target + 'px';

            if (parseInt(notes_list.style.top) < -264) //264 = 240 + 24(到下一行字的距离)
            {
                notes_list.style.top = -48 + 'px';
            }
        }
    };
    //JQuery
    /*var querySlider = function (offset) {

        var target = parseInt(notes_list.css('top')) + offset;
        offset = '-=' + Math.abs(offset);

        notes_list.animate({'top': offset}, 200, function () {
            if (target < -240) {
                notes_list.css('top', -48);
            }
        })
    };

    var autoPlay = function () {
        timer_s = setTimeout(function () {
            querySlider(-48);
            autoPlay();
        }, 3000);
    };

    autoPlay();*/

    /**********************侧边栏+轮播图***************************/


    function slash(offset) {

        var speed = offset/(time/interval);
        var target = parseInt(olist.style.top) + offset;

        var go = function () {
            if ((speed > 0 && parseInt(olist.style.top) < target) || (speed < 0 && parseInt(olist.style.top) > target))
            {
                olist.style.top = parseInt(olist.style.top) + speed + 'px';
                setTimeout(go(offset), interval);
            }
            else  {
                olist.style.top = target + 'px';

                if (parseInt(olist.style.top) > -450)
                {
                    olist.style.top = -2700 + 'px';
                }

                if (parseInt(olist.style.top) < -2700)
                {
                    olist.style.top = -450 + 'px';
                }
                return;
            }
        };

        go();
    }


    function animate(offset) {
        var distance = parseInt(olist.style.top) + offset;
        olist.style.top = distance + 'px';

        if (distance > -450)
        {
            distance = -2700;
            olist.style.top = distance + 'px';
        }

        if (distance < -2700)
        {
            distance = -450;
            olist.style.top = distance + 'px';
        }

        showSpan();
        //return distance;
    }

    function showSpan() {
        var len = banner.length;
        for (var i = 0; i < len; i++)
        {
            banner[i].className = 'select';
        }
        banner[index - 1].className = 'select current';
    }

    function turnSlide() {
        animate(-450);
        index++;
        if (index > 6)
        {
            index = 1;
        }
        showSpan();
    }

    for (var i = 0; i < aside.length; i++)
    {
        var id;
        var index;
        (function (args) {
            aside[i].onmouseover = function () {
                index = args + 1;
                id = 'item-list' + index;
                $(id).style.display = 'block';
            };

            aside[i].onmouseout = function () {
                index = args + 1;
                id = 'item-list' + index;
                $(id).style.display = 'none';
            }
        })(i);
    }
    
    for (var j = 0; j < banner.length; j++)
    {
        banner[j].onmouseover = function () {
            var myIndex = this.getAttribute('index');
            var offset = -450*(myIndex - index);
            slash(offset);
            index = myIndex;
            showSpan();
        };

    }

    container.onmouseout = function () {
        timer = setInterval(function () {
            turnSlide();
        }, 3000);
    };

    container.onmouseover = function () {
        clearInterval(timer);
    };

    /**********************侧边栏+轮播图***************************/

});