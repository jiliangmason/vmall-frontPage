/**
 * Created by Administrator on 2017/3/30 0030.
 */
window.onload = function () {
    var aside = document.getElementsByClassName('aside-li');
    var banner = document.getElementsByClassName('select');
    var olist = document.getElementById('list-banner');
    var container = document.getElementById('container');
    //var oli = document.getElementsByClassName('banner-li');
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
    var timer_n;
    var notes = document.getElementById('notes-slider');
    var notes_list = document.getElementById('all-list');
    var note_time = 1500;

    notes.onmouseover = function () {
        clearInterval(timer_s);
    };

    timer_s = setInterval(function () {
        if (notes_list.offsetTop <= -288) {
            notes_list.style.top = -48 + 'px';
        }  //注意该控制语句的位置
        noteFunc(-48);
        }, note_time);

    notes.onmouseout = function () {
        timer_s = setInterval(function () {
         if (notes_list.offsetTop <= -288) {
             notes_list.style.top = -48 + 'px';
         }
        noteFunc(-48);
        }, note_time);
    };
    //JS

    var noteFunc = function (offset) {
        var interval_n = 80;
        var speed = offset/Math.floor(note_time/interval_n);
        var target = notes_list.offsetTop + offset;
        clearInterval(timer_n);

        timer_n = setInterval(function () {

            var currentPos = notes_list.offsetTop;
            if (speed < 0 && currentPos <= target) {
                clearInterval(timer_n);
                console.log(currentPos);

            }
            else {
                notes_list.style.top = currentPos + speed + 'px';
            }
        }, interval_n);
    }; //延时2
    /***************************公告轮播****************************/


    /**********************侧边栏+轮播图***************************/
    var banner_mask = document.getElementById('banner-mask');
    var fadeinFlag = false; //可以切换图片
    var bannerFade = null;

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

                if (parseInt(olist.style.top) < -3150)
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

        fadeIn(800, banner_mask);
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

    var fadeIn = function (dur, obj) {

        var bgInterval = 100;
        var speed = bgInterval / dur;

        obj.style.display = 'block';
        obj.style.opacity = '1';
        clearInterval(bannerFade);
        fadeinFlag = true; //禁止切换图片

        bannerFade = setInterval(function () {
            var curOpacity = parseInt(obj.style.opacity);
            if (curOpacity <= 0) {
                clearInterval(bannerFade);
                obj.style.display = 'none';
                fadeinFlag = false;
            }
            else {
                obj.style.opacity = curOpacity - speed;
            }

        }, bgInterval);

    };

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
            if (fadeinFlag) {
                return;
            }
            var myIndex = this.getAttribute('index');
            var offset = -450*(myIndex - index);
            animate(offset);
            index = myIndex;
            showSpan();
        };

    }

    timer = setInterval(function () {
        turnSlide();
    }, 3000);

    container.onmouseout = function () {
        timer = setInterval(function () {
            turnSlide();
        }, 3000);
    };

    container.onmouseover = function () {
        clearInterval(timer);
    };

    /**********************侧边栏+轮播图***************************/

    /**********************中间无缝轮播***************************/
    var winSlider = document.getElementById('sec04-ul');
    var rightBtn = document.getElementById('right-btn');
    var leftBtn = document.getElementById('left-btn');
    var winTimer = null;

    var slowSlider = function (offset, speed) {
        var target = winSlider.offsetLeft + offset;
        winTimer = setInterval(function () {
            var newLeft = winSlider.offsetLeft + speed;
            if ((speed < 0 && newLeft > target) || (speed > 0 && newLeft < target)) {
                winSlider.style.left = newLeft + 'px';
            }
            else {
                winSlider.style.left = target + 'px';
                clearInterval(winTimer);
                return;
            }

        }, 10);
    };

    rightBtn.onmouseover = function () {
        var _self = this;
        var _left = winSlider.offsetLeft;

        if (_left <= -760) {
            removeClass(_self, 'allowed');
            addClass(_self, 'forbidden');
            return;
        }
        else {
            removeClass(_self, 'forbidden');
            addClass(_self, 'allowed');

        }
    };

    rightBtn.onclick = function () {
        var _self = this;
        var _left = winSlider.offsetLeft;
        var speed = -20;
        var offset = -760;
        console.log(_left);
        if (_left <= -760) {
            removeClass(_self, 'allowed');
            addClass(_self, 'forbidden');
            return;
        }
        else {
            slowSlider(offset, speed);
            removeClass(_self, 'forbidden');
            addClass(_self, 'allowed');
        }
    };

    leftBtn.onmouseover = function () {
        var _self = this;
        var _left = winSlider.offsetLeft;
        if (_left >= -5) {
            removeClass(_self, 'allowed');
            addClass(_self, 'forbidden');
            return;
        }
        else {
            removeClass(_self, 'forbidden');
            addClass(_self, 'allowed');
        }
    };

    leftBtn.onclick = function () {
        var _self = this;
        var _left = winSlider.offsetLeft;
        var speed = 20;
        var offset = 760;
        console.log(_left);
        if (_left >= 0) {
            removeClass(_self, 'allowed');
            addClass(_self, 'forbidden');
            return;
        }
        else {
            slowSlider(offset, speed);
            removeClass(_self, 'forbidden');
            addClass(_self, 'allowed');
        }
    };

    /**********************中间无缝轮播***************************/

    /**********************淡入淡出轮播***************************/
    (function () {
        var fadeSlider = document.getElementById('sec05-ul');
        var fadeBtns = document.getElementById('sec05-btn').getElementsByTagName('span');
        var fadeBg = document.getElementById('sec05-bg');
        var nowBtn = 0;
        var fadeTimer = null;
        var fadeinFlag = false; //可以切换图片

        var showBtn = function (obj) {
            if (obj === null)
                return;
            for (var i = 0; i < obj.length; i++) {
                var _btn = obj[i];
                removeClass(_btn, 'current-btn');
            }

            addClass(obj[nowBtn - 1], 'current-btn');
        };

        var imgSlide = function (offset) {
            var distance = fadeSlider.offsetTop + offset;
            fadeSlider.style.top = distance + 'px';

            if (distance > -120) {
                distance = -480;
                fadeSlider.style.top = distance + 'px';
            }

            if (distance < -600) {
                distance = -120;
                fadeSlider.style.top = distance + 'px';
            }

            fadeIn(800, fadeBg);

        };

        var fadeIn = function (dur, obj) {

            var bgInterval = 100;
            var speed = bgInterval / dur;

            obj.style.display = 'block';
            obj.style.opacity = '1';
            clearInterval(fadeTimer);
            fadeinFlag = true; //禁止切换图片

            fadeTimer = setInterval(function () {
                var curOpacity = parseInt(obj.style.opacity);
                if (curOpacity <= 0) {
                    clearInterval(fadeTimer);
                    obj.style.display = 'none';
                    fadeinFlag = false;
                }
                else {
                    obj.style.opacity = curOpacity - speed;
                }

            }, bgInterval);

        };

        for (var i = 0; i < fadeBtns.length; i++) {
            var _btns = fadeBtns[i];
            _btns.onmouseover = function () {
                if (fadeinFlag) {
                    return;
                }
                var nowIndex = this.getAttribute('index');
                var offset = -120 * (nowIndex - nowBtn);
                imgSlide(offset);
                nowBtn = nowIndex;
                showBtn(fadeBtns);
            }
        }
    })();

    /**********************淡入淡出轮播***************************/


};