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
    var isOnClick = false; //图片切换时不允许点击

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
    var winSlider = document.getElementsByClassName('sec04-ul');
    var rightBtn = document.getElementsByClassName('right-btn');
    var leftBtn = document.getElementsByClassName('left-btn');
    var winTimer = null;
    var wholeTimer = null;

    var slowSlider = function (offset, speed, obj) {
        if (obj === null)
        {
            return;
        }

        isOnClick = true;
        var target = obj.offsetLeft + offset;
        winTimer = setInterval(function () {
            var newLeft = obj.offsetLeft + speed;
            if ((speed < 0 && newLeft > target) || (speed > 0 && newLeft < target)) {
                obj.style.left = newLeft + 'px';
            }
            else {
                obj.style.left = target + 'px';
                clearInterval(winTimer);
                isOnClick = false;
                return;
            }

        }, 10);
    };

    for (var i = 0; i < winSlider.length; i++)
    {
        (function (args) {
            rightBtn[args].onclick = function () {
                var _self = this;
                var _left = winSlider[args].offsetLeft;
                var speed = -20;
                var offset = -760;
                console.log(_left);
                if (_left <= -760) {
                    removeClass(_self, 'allowed');
                    addClass(_self, 'forbidden');
                    return;
                }
                else {
                    slowSlider(offset, speed, winSlider[args]);
                    removeClass(_self, 'forbidden');
                    addClass(_self, 'allowed');
                }
            };

            rightBtn[args].onmouseover = function () {
                var _self = this;
                var _left = winSlider[args].offsetLeft;

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

            leftBtn[args].onmouseover = function () {
                var _self = this;
                var _left = winSlider[args].offsetLeft;
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

            leftBtn[args].onclick = function () {
                var _self = this;
                var _left = winSlider[args].offsetLeft;
                var speed = 20;
                var offset = 760;
                console.log(_left);
                if (_left >= 0) {
                    removeClass(_self, 'allowed');
                    addClass(_self, 'forbidden');
                    return;
                }
                else {
                    slowSlider(offset, speed, winSlider[args]);
                    removeClass(_self, 'forbidden');
                    addClass(_self, 'allowed');
                }
            };

        })(i);
    }

    /**********************中间无缝轮播***************************/

    /**********************淡入淡出轮播***************************/
    (function () {
        var fadeWindow = document.getElementsByClassName('sec05-img-area');
        var fadeSlider = document.getElementsByClassName('sec05-ul');
        //var fadeBtns = document.getElementById('sec05-btn').getElementsByTagName('span');
        var fadeBg = document.getElementsByClassName('sec05-bg');
        var fadeBtns = document.getElementsByClassName('sec05-btn');
        var nowBtn = 1;
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

        var imgSlide = function (offset, obj, bg) {
            var distance = obj.offsetTop + offset;
            obj.style.top = distance + 'px';

            if (distance > -120) {
                distance = -480;
                obj.style.top = distance + 'px';
            }

            if (distance < -600) {
                distance = -120;
                obj.style.top = distance + 'px';
            }

            fadeIn(800, bg);

        };

        var fadeIn = function (dur, obj) {

            var bgInterval = 100;
            var speed = bgInterval / dur;
            var fadeTimer = null;  //这个timer不可以写到全局

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

        var autoPlay = function () {
            nowBtn++;
            if (nowBtn > 4) {
                nowBtn = 1;
            }
            for (i = 0; i < fadeSlider.length; i++)
            {
                (function (args) {
                    var _fadeAutoUl = fadeSlider[i];
                    var _fadeAutoBg = fadeBg[i];
                    var _fadeBtnChilds = fadeBtns[args].getElementsByTagName('span');

                    imgSlide(-120, _fadeAutoUl, _fadeAutoBg);
                    showBtn(_fadeBtnChilds);
                })(i);
            }
        };


        for (var j = 0; j < fadeSlider.length; j++) {

           (function (args) {
               var _fadeUl = fadeSlider[j];
               var _fadeBg = fadeBg[j];
               var fadeBtnChilds = fadeBtns[args].getElementsByTagName('span');

               for (var i = 0; i < fadeBtnChilds.length; i++) {
                   var _btns = fadeBtnChilds[i];
                   _btns.onmouseover = function () {
                        if (fadeinFlag) {
                            return;
                        }
                        var nowIndex = this.getAttribute('index');
                        var offset = -120 * (nowIndex - nowBtn);
                        imgSlide(offset, _fadeUl, _fadeBg);
                        nowBtn = nowIndex;
                        showBtn(fadeBtnChilds);
                     }
                 }
             })(j);
         }


        for (var k = 0; k < fadeSlider.length; k++) {
            (function (args) {
                var _autoBtnChilds = fadeBtns[args].getElementsByTagName('span');
                var _autoWindow = fadeWindow[args];
                showBtn(_autoBtnChilds);
                _autoWindow.onmouseover = function () {
                    clearInterval(wholeTimer);
                };

                _autoWindow.onmouseout = function () {
                    wholeTimer = setInterval(function () {
                        autoPlay();
                    }, 3000);
                }
            })(k);
        }

        wholeTimer = setInterval(function () {
            autoPlay();
        }, 3000);

    })();

    /**********************淡入淡出轮播***************************/

    /**********************友情链接***************************/
    (function () {
        var linksList = document.getElementById('links-slider');
        var linksLeftBtn = document.getElementById('links-front');
        var linksRightBtn = document.getElementById('links-back');

        linksRightBtn.onclick = function () {
            var _self = this;
            var _left = linksList.offsetLeft;
            var speed = -5;
            var offset = -100;

            if (isOnClick) {
                return;
            }

            if (_left <= -700) {
                removeClass(_self, 'allowed');
                addClass(_self, 'forbidden');
                return;
            }
            else {
                removeClass(_self, 'forbidden');
                addClass(_self, 'allowed');
                slowSlider(offset, speed, linksList);
            }
        };

        linksRightBtn.onmouseover = function () {
            var _self = this;
            var _left = linksList.offsetLeft;

            if (_left <= -700) {
                removeClass(_self, 'allowed');
                addClass(_self, 'forbidden');
                return;
            }
            else {
                removeClass(_self, 'forbidden');
                addClass(_self, 'allowed');
            }
        };

        linksLeftBtn.onclick = function () {
            var _self = this;
            var _left = linksList.offsetLeft;
            var speed = 5;
            var offset = 100;

            if (isOnClick) {
                return;
            }

            if (_left >= 0) {
                removeClass(_self, 'allowed');
                addClass(_self, 'forbidden');
                return;
            }
            else {
                removeClass(_self, 'forbidden');
                addClass(_self, 'allowed');
                slowSlider(offset, speed, linksList);
            }
        };

        linksLeftBtn.onmouseover = function () {
            var _self = this;
            var _left = linksList.offsetLeft;
            if (_left >= 0) {
                removeClass(_self, 'allowed');
                addClass(_self, 'forbidden');
                return;
            }
            else {
                removeClass(_self, 'forbidden');
                addClass(_self, 'allowed');
            }
        };

    })();

};