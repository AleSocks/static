;(function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                var stringifiedAttributes = '';

                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }


            if (!key) {
                result = {};
            }
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (!this.json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));

var _beforeUnload_time = 0, _gap_time = 0;
var is_fireFox = navigator.userAgent.indexOf("Firefox")>-1;
window.onunload = function (){
    _gap_time = new Date().getTime() - _beforeUnload_time;
    if(_gap_time <= 5){
        localStorage.removeItem('md5');
    }
}
window.onbeforeunload = function (){
    _beforeUnload_time = new Date().getTime();
    if(is_fireFox){
        localStorage.removeItem('md5');
    }
};

function get(key,exp){
    var data = localStorage.getItem(key);
    if (data == '' || data == null || data == undefined || data == 'error') {
        return '';
    }
    var dataObj = JSON.parse(data);
    if (dataObj == '' || dataObj == null || dataObj == undefined){
        return  '';
    }

    if ((new Date().getTime() - dataObj.time)>exp) {
        return '';
    }else{
        var dataObjDatatoJson = dataObj.data;
        return dataObjDatatoJson;
    }
}
/*
var getsultsucess = get('md5',1000*60*60*24);
var host = window.location.host;

$(function getsult(){
    if (getsultsucess == null || getsultsucess == "undefined" || getsultsucess == "null" || getsultsucess == ""){
        $.ajax({
            type: "POST",
            url: "https://www.czssr.top/checkin",
            dataType: "json",
            data: {
                host,
                md5
            },
            success: function (data) {
                if (data.ret) {
                    var curTime = new Date().getTime();
                    localStorage.setItem('md5',JSON.stringify({data:data.msg,time:curTime}));
                    return "success";
                } else {
                    window.location.href = "/404";
                }
            },
            error: function (e) {
                window.location.href = "/404";
            }
        });
    }else{
        return "sucess";
    }
});
*/
'use strict';
$(function Layout() {
    function pinSidenav() {
        $('.sidenav-toggler').addClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-unpin');
        $('body').removeClass('g-sidenav-hidden').addClass('g-sidenav-show g-sidenav-pinned');
        $('body').append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target='+$('#sidenav-main').data('target')+' />');

        Cookies.set('sidenav-state', 'pinned');
    }

    function unpinSidenav() {
        $('.sidenav-toggler').removeClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-pin');
        $('body').removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden');
        $('body').find('.backdrop').remove();

        Cookies.set('sidenav-state', 'unpinned');
    }


    var $sidenavState = Cookies.get('sidenav-state') ? Cookies.get('sidenav-state') : 'pinned';

    if($(window).width() > 1200) {
        if($sidenavState == 'pinned') {
            pinSidenav()
        }

        if(Cookies.get('sidenav-state') == 'unpinned') {
            unpinSidenav()
        }
    }

    $("body").on("click", "[data-action]", function(e) {

        e.preventDefault();

        var $this = $(this);
        var action = $this.data('action');
        var target = $this.data('target');
        switch (action) {
            case 'sidenav-pin':
                pinSidenav();
                break;

            case 'sidenav-unpin':
                unpinSidenav();
                break;

            case 'search-show':
                target = $this.data('target');
                $('body').removeClass('g-navbar-search-show').addClass('g-navbar-search-showing');

                setTimeout(function() {
                    $('body').removeClass('g-navbar-search-showing').addClass('g-navbar-search-show');
                }, 150);

                setTimeout(function() {
                    $('body').addClass('g-navbar-search-shown');
                }, 300)
                break;

            case 'search-close':
                target = $this.data('target');
                $('body').removeClass('g-navbar-search-shown');

                setTimeout(function() {
                    $('body').removeClass('g-navbar-search-show').addClass('g-navbar-search-hiding');
                }, 150);

                setTimeout(function() {
                    $('body').removeClass('g-navbar-search-hiding').addClass('g-navbar-search-hidden');
                }, 300);

                setTimeout(function() {
                    $('body').removeClass('g-navbar-search-hidden');
                }, 500);
                break;
        }
    });

    $('.sidenav').on('mouseenter', function() {
        if(! $('body').hasClass('g-sidenav-pinned')) {
            $('body').removeClass('g-sidenav-hide').removeClass('g-sidenav-hidden').addClass('g-sidenav-show');
        }
    });

    $('.sidenav').on('mouseleave', function() {
        if(! $('body').hasClass('g-sidenav-pinned')) {
            $('body').removeClass('g-sidenav-show').addClass('g-sidenav-hide');

            setTimeout(function() {
                $('body').removeClass('g-sidenav-hide').addClass('g-sidenav-hidden');
            }, 300);
        }
    });

    $(window).on('load resize', function() {
        if($('body').height() < 800) {
            $('body').css('min-height', '100vh');
            $('#footer-main').addClass('footer-auto-bottom')
        }
    })

});

if($('.headroom')[0]) {
    var headroom  = new Headroom(document.querySelector("#navbar-main"), {
        offset: 300,
        tolerance : {
            up : 30,
            down : 30
        },
    });
    headroom.init();
}


$(function Navbar() {

    var $nav = $('.navbar-nav, .navbar-nav .nav');
    var $collapse = $('.navbar .collapse');
    var $dropdown = $('.navbar .dropdown');
    function accordion($this) {
        $this.closest($nav).find($collapse).not($this).collapse('hide');
    }

    function closeDropdown($this) {
        var $dropdownMenu = $this.find('.dropdown-menu');

        $dropdownMenu.addClass('close');

        setTimeout(function() {
            $dropdownMenu.removeClass('close');
        }, 200);
    }
    $collapse.on({
        'show.bs.collapse': function() {
            accordion($(this));
        }
    })

    $dropdown.on({
        'hide.bs.dropdown': function() {
            closeDropdown($(this));
        }
    })

});



$(function NavbarCollapse() {
    var $nav = $('.navbar-nav'),
        $collapse = $('.navbar .navbar-custom-collapse');

    function hideNavbarCollapse($this) {
        $this.addClass('collapsing-out');
    }

    function hiddenNavbarCollapse($this) {
        $this.removeClass('collapsing-out');
    }
    if ($collapse.length) {
        $collapse.on({
            'hide.bs.collapse': function() {
                hideNavbarCollapse($collapse);
            }
        });

        $collapse.on({
            'hidden.bs.collapse': function() {
                hiddenNavbarCollapse($collapse);
            }
        })
    }

});
$('.navbar-nav').find('li > a', 'li > ul > li > a').each(function () {
    if (this.href == document.location.href || document.location.href.search(this.href) >= 0) {

        if ($(this).closest('div.collapse').closest('li.nav-item').children('a.has-dropdown').find('aria-controls') !== 'navbar-dashboards') {
            $('a.has-dropdown1').removeClass('active').attr("aria-expanded", !1);
            $("a.has-dropdown1").parent('li').find('div.collapse').removeClass('show').find('a.nav-link').removeClass('active');
        }

        $(this).closest('div.collapse').closest('li.nav-item').children('a.has-dropdown').addClass('active').attr("aria-expanded", !0);
        $(this).closest('div.collapse').addClass('show');
        $(this).addClass('active');

    }
});

$(function ScrollTo() {
    // Variables
    var $scrollTo = $('.scroll-me, [data-scroll-to], .toc-entry a');
    function scrollTo($this) {
        var $el = $this.attr('href');
        var offset = $this.data('scroll-to-offset') ? $this.data('scroll-to-offset') : 0;
        var options = {
            scrollTop: $($el).offset().top - offset
        };

        $('html, body').stop(true, true).animate(options, 600);

        event.preventDefault();
    }
    if ($scrollTo.length) {
        $scrollTo.on('click', function(event) {
            scrollTo($(this));
        });
    }

});


$(function Checklist() {
    var $list = $('[data-toggle="checklist"]')
    function init($this) {
        var $checkboxes = $this.find('.checklist-entry input[type="checkbox"]');

        $checkboxes.each(function() {
            checkEntry($(this));
        });

    }
    function checkEntry($checkbox) {
        if($checkbox.is(':checked')) {
            $checkbox.closest('.checklist-item').addClass('checklist-item-checked');
        } else {
            $checkbox.closest('.checklist-item').removeClass('checklist-item-checked');
        }
    }
    if ($list.length) {
        $list.each(function() {
            init($(this));
        });

        $list.find('input[type="checkbox"]').on('change', function() {
            checkEntry($(this));
        });
    }

});


$(function FormControl() {
    var $input = $('.form-control');
    function init($this) {
        $this.on('focus blur', function(e) {
            $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus'));
        }).trigger('blur');
    }
    if ($input.length) {
        init($input);
    }

});

$(function Scrollbar() {
    var $scrollbar = $('.scrollbar-inner');
    function init() {
        $scrollbar.scrollbar().scrollLock()
    }
    if ($scrollbar.length) {
        init();
    }

});


$(function SortList() {
    var $lists = $('[data-toggle="list"]');
    var $listsSort = $('[data-sort]');
    function init($list) {
        new List($list.get(0), getOptions($list));
    }

    function getOptions($list) {
        var options = {
            valueNames: $list.data('list-values'),
            listClass: $list.data('list-class') ? $list.data('list-class') : 'list'
        }

        return options;
    }

    if ($lists.length) {
        $lists.each(function() {
            init($(this));
        });
    }


    $listsSort.on('click', function() {
        return;
    });

});






$(function Notify() {

    var $notifyBtn = $('[data-toggle="notify"]');
    function notify(placement, align, icon, type, animIn, animOut) {
        $.notify({
            icon: icon,
            title: ' Bootstrap Notify',
            message: 'Turning standard Bootstrap alerts into awesome notifications',
            url: ''
        }, {
            element: 'body',
            type: type,
            allow_dismiss: true,
            placement: {
                from: placement,
                align: align
            },
            offset: {
                x: 15,
                y: 15
            },
            spacing: 10,
            z_index: 1080,
            delay: 2500,
            timer: 25000,
            url_target: '_blank',
            mouse_over: false,
            animate: {


                enter: animIn,
                exit: animOut
            },
            template: '<div data-notify="container" class="alert alert-dismissible alert-{0} alert-notify" role="alert">' +
                '<span class="alert-icon" data-notify="icon"></span> ' +
                '<div class="alert-text"</div> ' +
                '<span class="alert-title" data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '</div>' +
                '<button type="button" class="close" data-notify="dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '</div>'
        });
    }
    if ($notifyBtn.length) {
        $notifyBtn.on('click', function(e) {
            e.preventDefault();

            var placement = $(this).attr('data-placement');
            var align = $(this).attr('data-align');
            var icon = $(this).attr('data-icon');
            var type = $(this).attr('data-type');
            var animIn = $(this).attr('data-animation-in');
            var animOut = $(this).attr('data-animation-out');

            notify(placement, align, icon, type, animIn, animOut);
        });
    }

});






$(function Tags() {

    var $tags = $('[data-toggle="tags"]');
    function init($this) {
        var options = {
            tagClass: 'badge badge-primary'
        };
        $this.tagsinput(options);
    }
    if ($tags.length) {
        $tags.each(function() {
            init($(this));
        });
    }

});

$.fn.modal.Constructor.prototype._enforceFocus = function() {};
$(".copy-text").click(function () {
    var clipboard = new ClipboardJS(".copy-text");
    clipboard.on("success",function (e) {
        swal('复制成功','粘帖到订阅地址栏即可更新～～','success');
        e.clearSelection();
    });
    clipboard.on("error",function (e) {
        swal('复制成功','部分手机请长按复制 ～～','success');
    });

});


var checkedmsgGE = '<button type="button" class="btn btn-outline-default disabled" >您今日已签到</button>';
$(document).ready(function () {
    $("#checkin").click(function () {
        $.ajax({
            type: "POST",
            url: "/user/checkin",
            dataType: "json",
            success: function (data) {
                if (data.ret) {
                    $("#checkin-msg").html(data.msg);
                    document.getElementById("checkin").className='btn btn-outline-default disabled';
                    document.getElementById("checkin").innerText='您今日已签到';
                    swal({
                        title: "签到成功！",
                        text: data.msg,
                        type:"success"
                    });

                } else {
                    swal('Oops...',data.msg,'warning');
                }
            },
            error: function (e) {
                swal('Oops...','发生错误：'+e.status,'error');
            }
        });
    });
});

$(document).ready(function () {
    $("#get_node_class").click(function () {
        $.ajax({
            type: "POST",
            url: "/user/get_node_class",
            data: {
                node_class: $("#node_class").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.ret) {
                    document.getElementById("sub_node_class").style.display="block";
                    document.getElementById("sub_node_ssr").value=data.ssr;
                    document.getElementById("sub_node_v2ray").value=data.v2ray;
                    $("#node_class_ssr_copy").attr("data-clipboard-text",data.ssr);
                    $("#node_class_v2ray_copy").attr("data-clipboard-text",data.v2ray);
                    swal({
                        title: "订阅获取成功",
                        type:"success"
                    });

                } else {
                    swal('Oops...',data.msg,'warning');
                }
            },
            error: function (e) {
                swal('Oops...','发生错误：'+e.status,'error');
            }
        });
    });
});


$(document).ready(function () {
    $("#kill").click(function () {
        $.ajax({
            type: "POST",
            url: "kill",
            dataType: "json",
            data: {
                passwd: $('#passwd').val()
            },
            success: (data) => {
                if (data.ret) {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                    window.setTimeout("location.href='/'", 2000);
                } else {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});



$('#change_class').click(function () {
    $.ajax({
        type: "POST",
        url: "invite/change_class",
        dataType: "json",
        data: {
            ref_class: $("#ref_class").val()
        },
        success: data => {
            if (data.ret) {
                swal({
                    title: data.msg,
                    type:"success"
                });
            } else {
                swal({
                    title: data.msg,
                    type:"error"
                });
            }
            window.setTimeout("location.href=window.location.href", 1500);
        },
        error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
    });

});

$(document).ready(function () {
    var e = document.querySelector("#tx_image");
    $('#tx_image').click(function () {
        e.addEventListener('change', function() {
            if (null != e.files && null != e.files[0]) {
                $('#up_result').html(e.files[0].name);
                var formData = new FormData();
                formData.append('avatar', e.files[0]);
                console.log(formData.get('avatar'));
                $.ajax({
                    url: 'upload/invite',
                    type: 'POST',
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    traditional: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if (res.ret == 0) {
                            $('#result').modal();
                            $('#msg').html(res.msg);
                            return;
                        }
                        console.log(res);
                        document.getElementById('up_re').innerHTML = '<div class="bg-secondary"><input id="up_res" type="text" class="form-control" disabled required></div>';
                        document.getElementById('up_res').value = res;
                    }
                });
            }
        });
    });
});

function valiEmail(value){
    var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi;
    if (pattern.test(value)) {
        return true;
    }else{
        return false;
    }
}

$("#ref_acc_update").click(function () {
    if(!valiEmail($("#ref_acc").val())) {
        swal('Oops...', "账号不合法,请检查后输入",'error');
        return false;
    }
    if($("#ref_acc").val()==null){
        swal('Oops...', "账号不能为空！",'error');
        return;
    }
    if($("#up_res").val()==null){
        swal('Oops...', "请先上传你的收款二维码",'error');
        return;
    }
    $.ajax({
        type: "POST",
        url: "invite/ref_acc",
        dataType: "json",
        data: {
            ref_accid: $("#dist_accid").val(),
            ref_acc: $("#ref_acc").val(),
            tx_image: $("#up_res").val()
        },
        success: data => {
            if (data.ret) {
                swal({
                    title: data.msg,
                    type:"success"
                });
            } else {
                swal({
                    title: data.msg,
                    type:"error"
                });
            }
            window.setTimeout("location.href=window.location.href", 1500);
        },
        error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
    });

});


function validateRefmoney(value){
    var pattern = /^(0|[1-9][0-9]*)$/;
    if (pattern.test(value)) {
        return true;
    }else{
        return false;
    }
}

$("#aff_check_in").click(function () {
    if(!validateRefmoney($("#check_in_val").val())) {
        swal('Oops...', "金额输入不合法,请检查后输入",'error');
        return false;
    }
    if($("#check_in_val").val()==null || $("#check_in_val").val()=='0'){
        swal('Oops...', "金额输入不合法！",'error');
        return;
    }
    $.ajax({
        type: "POST",
        url: "invite/ref_money",
        dataType: "json",
        data: {
            ref_money: $("#check_in_val").val()
        },
        success: data => {
            if (data.ret) {
                swal({
                    title: data.msg,
                    type:"success"
                });
            } else {
                swal({
                    title: data.msg,
                    type:"error"
                });
            }
            window.setTimeout("location.href=window.location.href", 1500);
        },
        error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
    });

});


$("#aff_check_out").click(function () {
    if(!validateRefmoney($("#check_out_val").val())) {
        swal('Oops...', "金额输入不合法,请检查后输入",'error');
        return false;
    }
    if($("#check_out_val").val()==null || $("#check_out_val").val()=='0'){
        swal('Oops...', "金额输入不合法！",'error');
        return;
    }
    $.ajax({
        type: "POST",
        url: "invite/tx_money",
        dataType: "json",
        data: {
            tx_money: $("#check_out_val").val()
        },
        success: data => {
            if (data.ret) {
                swal({
                    title: data.msg,
                    type:"success"
                });
            } else {
                swal({
                    title: data.msg,
                    type:"error"
                });
            }
            window.setTimeout("location.href=window.location.href", 1500);
        },
        error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
    });

});


$("#buy-invite").click(function () {
    $.ajax({
        type: "POST",
        url: "/user/buy_invite",
        dataType: "json",
        data: {
            num: $("#buy-invite-num").val(),
        },
        success: function (data) {
            if (data.ret) {
                swal({
                    title: data.msg,
                    type:"success"
                });
                window.setTimeout("location.href='/user/invite'", 2000);
            } else {
                swal({
                    title: data.msg,
                    type:"error"
                });
            }
        },
        error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
    })
});

$("#custom-invite-confirm").click(function () {
    $.ajax({
        type: "POST",
        url: "/user/custom_invite",
        dataType: "json",
        data: {
            customcode: $("#custom-invite-link").val(),
        },
        success: function (data) {
            if (data.ret) {
                swal({
                    title: data.msg,
                    type:"success"
                });
                window.setTimeout("location.href='/user/invite'", 2000);
            } else {
                swal({
                    title: data.msg,
                    type:"error"
                });
            }
        },
        error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
    })
});


$("#user_input").click(function () {
    $.ajax({
        type: "POST",
        url: "agentbuy",
        dataType: "json",
        data: {
            shopid: $("#shop_id").val(),
            userid: userid
        },
        success: function (data) {
            if (data.ret) {
                swal({
                    title: data.msg,
                    text: "赶快刷新下本页的客户记录查看吧~!",
                    type:"success"
                });
                window.setTimeout("location.href=window.location.href", 2000);
            } else {
                swal('Oops...',data.msg,'error');
            }
        },
        error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
    });
});



var DatatableBasic = (function() {
    var $dtBasic = $('#datatable-basic');
    function init($this) {
        var options = {
            keys: !0,
            select: {
                style: "multi"
            },
            language: {
                paginate: {
                    previous: "<i class='fa fa-angle-left'>",
                    next: "<i class='fa fa-angle-right'>"
                }
            },
        };
        var table = $this.on( 'init.dt', function () {
            $('div.dataTables_length select').removeClass('custom-select custom-select-sm');

        }).DataTable(options);
    }
    if ($dtBasic.length) {
        init($dtBasic);
    }
})();

$("#ali_pay").click(function () {
    if ($("#amount").val() < 1) {
        $("#result").modal();
        $("#msg").html("输入金额最低1元,请检查");
        return;
    }
    $("#readytopay").modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            type: "POST",
            url: "/user/payment_a/purchase",
            dataType: "json",
            data: {
                amount: $("#amount").val()
            },
            success: function (data) {
                if (data.ret) {
                    pid = data.pid;
                    $("#ali_qrarea").html('<div class="text-center"><p>请使用支付宝APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机点击二维码可唤起支付宝</p></div>');
                    $("#readytopay").modal('hide');
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: encodeURI(data.qrcode)
                    });
                    $('#qrcode').attr('href',data.qrcode);
                    setTimeout(ali_f(pid), 1000);
                } else {
                    $("#readytopay").modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e) {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#wx_pay_ym").click(function () {
    if ($("#price").val() < 1) {
        $("#result").modal();
        $("#msg").html("输入金额最低1元,请检查");
        return;
    }
    $("#readytopay").modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            type: "POST",
            url: "/user/payment_b/purchase",
            dataType: "json",
            data: {
                price: $("#price").val()
            },
            success: function (data) {
                if (data.ret) {
                    pid = data.pid;
                    $("#wx_qrarea").html('<div class="text-center"><p>请使用微信APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机截图保存到相册扫码</p></div>');
                    $("#readytopay").modal('hide');
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: encodeURI(data.qrcode)
                    });
                    $('#qrcode').attr('href',data.qrcode);
                    setTimeout(wx_f(pid), 1000);
                } else {
                    $("#readytopay").modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e) {
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#wx_payjs").click(function () {
    var price = parseFloat($("#price").val());
    if (isNaN(price)) {
        $("#readytopay").modal('hide');
        $("#result").modal();
        $("#msg").html("非法的金额！");
        return;
    }
    $('#readytopay').modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            url: "/user/payment_b/purchase",
            data: {
                price
            },
            dataType: 'json',
            type: "POST",
            success:function(data){
                var jump_link = data.url;
                if(data.code==0){
                    pid = data.pid;
                    $('#readytopay').modal('hide');
                    $("#payresult").modal();
                    window.setTimeout('location.href="'+jump_link+'"', 2000);
                }else{
                    $('#readytopay').modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.errmsg);
                }
            },
            error: function (e) {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#ali_pay_ma").click(function () {
    var type = 1;
    var price = parseFloat($("#amount").val());
    if (isNaN(price)) {
        $("#readytopay").modal('hide');
        $("#result").modal();
        $("#msg").html("非法的金额！");
        return;
    }
    $('#readytopay').modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            url: "/user/payment_a/purchase",
            data: {
                price,
                type
            },
            dataType: 'json',
            type: "POST",
            success:function(data){
                var jump_link = data.url;
                if(data.code==0){
                    pid = data.pid;
                    $("#ali_qrarea").html('<div class="text-center"><p>请使用支付宝APP扫描二维码支付</p>'+jump_link+'<p>请在5分钟内完成支付</p></div>');
                    $("#readytopay").modal('hide');
                    setTimeout(ali_f(pid), 1000);
                }else{
                    $('#readytopay').modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.errmsg);
                }
            },
            error: function (e) {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#wx_pay_ma").click(function () {
    var type = 3;
    var price = parseFloat($("#price").val());
    if (isNaN(price)) {
        $("#readytopay").modal('hide');
        $("#result").modal();
        $("#msg").html("非法的金额！");
        return;
    }
    $('#readytopay').modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            url: "/user/payment_b/purchase",
            data: {
                price,
                type
            },
            dataType: 'json',
            type: "POST",
            success:function(data){
                var jump_link = data.url;
                if(data.code==0){
                    pid = data.pid;
                    $("#wx_qrarea").html('<div class="text-center"><p>请使用微信APP扫描二维码支付</p>'+jump_link+'<p>请在5分钟内完成支付</p></div>');
                    $("#readytopay").modal('hide');
                    setTimeout(wx_f(pid), 1000);
                }else{
                    $('#readytopay').modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.errmsg);
                }
            },
            error: function (e) {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#ali_pay_fly").click(function () {
    var type = 'alipay';
    var price = parseFloat($("#amount").val());
    if ($("#amount").val() < 3) {
        $("#result").modal();
        $("#msg").html("输入金额最低3元,请检查");
        return;
    }
    $('#readytopay').modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            url: "/user/payment_a/purchase",
            data: {
                price,
                type
            },
            dataType: 'json',
            type: "POST",
            success:function(data){
                var jump_link = data.url;
                if(data.code==0){
                    pid = data.pid;
                    $('#readytopay').modal('hide');
                    $("#ali_qrarea").html('<div class="text-center"><p>请使用支付宝APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机访问截图到相册扫码</p></div>');
                    $("#readytopay").modal('hide');
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: encodeURI(data.url)
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(ali_f(pid), 1000);
                }else{
                    $('#readytopay').modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.errmsg);
                }
            },
            error: function (e) {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#wx_pay_fly").click(function () {
    var type = 'wxpay';
    var price = parseFloat($("#price").val());
    if ($("#price").val() < 3) {
        $("#result").modal();
        $("#msg").html("输入金额最低3元,请检查");
        return;
    }
    $('#readytopay').modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            url: "/user/payment_b/purchase",
            data: {
                price,
                type
            },
            dataType: 'json',
            type: "POST",
            success:function(data){
                var jump_link = data.url;
                if(data.code==0){
                    pid = data.pid;
                    $('#readytopay').modal('hide');
                    $("#wx_qrarea").html('<div class="text-center"><p>请使用微信APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机截图保存到相册扫码</p></div>');
                    $("#readytopay").modal('hide');
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: encodeURI(data.url)
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(wx_f(pid), 1000);
                }else{
                    $('#readytopay').modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.errmsg);
                }
            },
            error: function (e) {
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#ali_pay_to").click(function () {
    var type = 'alipay';
    var price = parseFloat($("#amount").val());
    if ($("#amount").val() < 1) {
        $("#result").modal();
        $("#msg").html("输入金额最低1元,请检查");
        return;
    }
    $('#readytopay').modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            url: "/user/payment_a/purchase",
            data: {
                price,
                type
            },
            dataType: 'json',
            type: "POST",
            success:function(data){
                var jump_link = data.url;
                if(data.code==0){
                    pid = data.pid;
                    $('#readytopay').modal('hide');
                    $("#ali_qrarea").html('<div class="text-center"><p>请使用支付宝APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机保存到相册扫码</p></div>');
                    $("#readytopay").modal('hide');
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: encodeURI(data.url)
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(ali_f(pid), 1000);
                }else{
                    $('#readytopay').modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.errmsg);
                }
            },
            error: function (e) {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#wx_pay_to").click(function () {
    var type = 'wxpay';
    var price = parseFloat($("#price").val());
    if ($("#price").val() < 1) {
        $("#result").modal();
        $("#msg").html("输入金额最低1元,请检查");
        return;
    }
    $('#readytopay').modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            url: "/user/payment_b/purchase",
            data: {
                price,
                type
            },
            dataType: 'json',
            type: "POST",
            success:function(data){
                var jump_link = data.url;
                if(data.code==0){
                    pid = data.pid;
                    $('#readytopay').modal('hide');
                    $("#wx_qrarea").html('<div class="text-center"><p>请使用微信APP扫描二维码支付</p>'+jump_link+'<p>请在5分钟内完成支付</p></div>');
                    $("#readytopay").modal('hide');
                    setTimeout(wx_f(pid), 1000);
                }else{
                    $('#readytopay').modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.errmsg);
                }
            },
            error: function (e) {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#ali_pay_idt").click(function () {
    var type = 'alipay';
    var price = parseFloat($("#amount").val());
    if ($("#amount").val() < 1) {
        $("#result").modal();
        $("#msg").html("输入金额最低1元,请检查");
        return;
    }
    $("#readytopay").modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            type: "POST",
            url: "/user/payment_a/purchase",
            dataType: "json",
            data: {
                price,
                type
            },
            success: function (data) {
                if (data.ret) {
                    pid = data.pid;
                    $("#ali_qrarea").html('<div class="text-center"><p>请使用支付宝APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机截图相册到支付宝扫码</p></div>');
                    $("#readytopay").modal('hide');
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: encodeURI(data.qrcode)
                    });
                    $('#qrcode').attr('href',data.qrcode);
                    setTimeout(ali_f(pid), 1000);
                } else {
                    $("#readytopay").modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e) {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#wx_pay_idt").click(function () {
    var type = 'wxpay';
    var price = parseFloat($("#price").val());
    if ($("#price").val() < 1) {
        $("#result").modal();
        $("#msg").html("输入金额最低1元,请检查");
        return;
    }
    $("#readytopay").modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            type: "POST",
            url: "/user/payment_b/purchase",
            dataType: "json",
            data: {
                price,
                type
            },
            success: function (data) {
                if (data.ret) {
                    pid = data.pid;
                    $("#wx_qrarea").html('<div class="text-center"><p>请使用微信APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机截图相册到微信扫码</p></div>');
                    $("#readytopay").modal('hide');
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: encodeURI(data.qrcode)
                    });
                    $('#qrcode').attr('href',data.qrcode);
                    setTimeout(wx_f(pid), 1000);
                } else {
                    $("#readytopay").modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e) {
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"  发生了错误。");
            }
        });
    });
});


$("#bitpaySubmit").click(function () {
    var price = parseFloat($('#bitpayamount').val());
    var type = "Crypto";
    if ($("#bitpayamount").val() < 5) {
        $("#result").modal();
        $("#msg").html("输入金额最低5元,请检查");
        return;
    }
    if (isNaN(price)) {
        $("#readytopay").modal('hide');
        $("#result").modal();
        $('#msg').html('请输入正确的金额!');
        return;
    }
    $('#readytopay').modal();
    $("#readytopay").on('shown.bs.modal', function () {
        $.ajax({
            url: "/user/payment/bitpay/purchase",
            dataType: 'json',
            type: "POST",
            data: {
                price,
                type
            },
            success: (data) => {
                var jump_link = data.url;
                if (data.errcode === 0) {
                    pid = data.pid;
                    $('#readytopay').modal('hide');
                    $("#payresult").modal();
                    window.setTimeout('location.href="'+jump_link+'"', 2000);
                } else {
                    $("#readytopay").modal('hide');
                    $("#result").modal();
                    $('#msg').html(data.errmsg);
                }
            },
            error: (e) => {
                console.log(e);
                $("#readytopay").modal('hide');
                $("#result").modal();
                $("#msg").html(e+"发生了错误");
            }
        });
    });
});

function ali_f(pid){
    $.ajax({
        type: "POST",
        url: "/payment_a/status",
        dataType: "json",
        data: {
            pid:pid
        },
        success: function (data) {
            if (data.result) {
                $("#result").modal();
                $("#msg").html("充值成功！");
                window.setTimeout("location.href=window.location.href", 2000);
            }else{
                tid = setTimeout(function(){ali_f(pid);}, 1000);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function wx_f(pid){
    $.ajax({
        type: "POST",
        url: "/payment_b/status",
        dataType: "json",
        data: {
            pid:pid
        },
        success: function (data) {
            if (data.result) {
                $("#result").modal();
                $("#msg").html("充值成功！");
                window.setTimeout("location.href=window.location.href", 2000);
            }else{
                tid = setTimeout(function(){wx_f(pid);}, 1000);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}


$(document).ready(function () {
    $("#hide-update").click(function () {
        $.ajax({
            type: "POST",
            url: "hide",
            dataType: "json",
            data: {
                hide: $$getValue('hide')
            },
            success: (data) => {
                $("#result").modal();
                $("#msg").html(data.msg);
                window.setTimeout("location.href='/user/donate'", 2000);
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});




$(document).ready(function () {
    $("#portreset").click(function () {
        $.ajax({
            type: "POST",
            url: "resetport",
            dataType: "json",
            data: {
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
                    $("#ajax-user-port").html(data.msg);
                    $("#msg").html("设置成功，新端口是 "+data.msg);

                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$(document).ready(function () {
    $("#portspecify").click(function () {
        $.ajax({
            type: "POST",
            url: "specifyport",
            dataType: "json",
            data: {
                port: $("#port-specify").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
                    $("#ajax-user-port").html($("#port-specify").val());
                    $("#msg").html(data.msg);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$(document).ready(function () {
    $("#ssr-update").click(function () {
        $.ajax({
            type: "POST",
            url: "ssr",
            dataType: "json",
            data: {
                protocol: $("#protocol").val(),
                obfs: $("#obfs").val(),
                obfs_param: $("#obfs-param").val()
            },
            success: (data) => {
                if (data.ret) {
                    $("#result").modal();
                    $('#ajax-user-protocol').innerHTML = $("#protocol").val();
                    $('#ajax-user-obfs').innerHTML = $("#obfs").val();
                    $('#ajax-user-obfs-param').innerHTML = $("#obfs-param").val();
                    $("#msg").html(data.msg);
                    window.setTimeout("location.href='/user/edit'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$(document).ready(function () {
    let newsspwd = Math.random().toString(36).substr(2);
    $("#ss-pwd-update").click(function () {
        $.ajax({
            type: "POST",
            url: "sspwd",
            dataType: "json",
            data: {
                sspwd: newsspwd
            },
            success: (data) => {
                if (data.ret) {
                    $("#result").modal();
                    $('#ajax-user-passwd').innerHTML = newsspwd;
                    $("#msg").html("修改成功!");
                    window.setTimeout("location.href='/user/edit'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html("修改失败!");
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$(document).ready(function () {
    $("#method-update").click(function () {
        $.ajax({
            type: "POST",
            url: "method",
            dataType: "json",
            data: {
                method: $$getValue('method')
            },
            success: (data) => {
                $('#ajax-user-method').innerHTML = $('#method').val();
                if (data.ret) {
                    $("#result").modal();
                    $("#msg").html('修改成功');
                    window.setTimeout("location.href='/user/edit'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});




$(document).ready(function () {
    $("#pwd-update").click(function () {
        $.ajax({
            type: "POST",
            url: "password",
            dataType: "json",
            data: {
                oldpwd: $("#oldpwd").val(),
                pwd: $("#pwd").val(),
                repwd: $("#repwd").val()
            },
            success: (data) => {
                $("#result").modal();
                $("#msg").html(data.msg);
                window.setTimeout("location.href='/user/profile'", 2000);
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$(document).ready(function () {
    $("#wechat-update").click(function () {
        $.ajax({
            type: "POST",
            url: "wechat",
            dataType: "json",
            data: {
                wechat: $("#wechat").val(),
                imtype: $("#imtype").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                    window.setTimeout("location.href='/user/profile'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$(document).ready(function () {
    $("#theme-update").click(function () {
        $.ajax({
            type: "POST",
            url: "theme",
            dataType: "json",
            data: {
                theme: $("#theme").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                    window.setTimeout("location.href='/user/profile'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$(document).ready(function () {
    $("#mail-update").click(function () {
        $.ajax({
            type: "POST",
            url: "mail",
            dataType: "json",
            data: {
                mail: $("#mail").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                    window.setTimeout("location.href='/user/profile'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$(document).ready(function () {
    $("#unblock").click(function () {
        $.ajax({
            type: "POST",
            url: "unblock",
            dataType: "json",
            data: {
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
                    $("#ajax-block").html("IP: "+data.msg+" 没有被封");
                    $("#msg").html("发送解封命令解封 "+data.msg+" 成功");
                    window.setTimeout("location.href='/user/profile'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});



$(document).ready(function(){
    $("#shop_refund").click(function(){
        $.ajax({
            type:"POST",
            url:"/user/shop_refund",
            dataType:"json",
            success:function(data){
                if(data.ret){
                    swal({
                        title: data.msg,
                        type:"success"
                    });
                    window.setTimeout("location.href=window.location.href", 2000);
                }else{
                    swal('Oops...',data.msg,'error');
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    });
});

$("#buy_tra1").on("click", function() {
    if(document.getElementById("pay_code1").checked=true){
        $.ajax({
            type: "POST",
            url: "buy_traffic",
            dataType: "json",
            data: {
                traffic: $('#traffics').val(),
                price: $('#traffic_price').val()
            },
            success: (data) => {
                if (data.ret) {
                    $('#buy_traffic').modal('hide');
                    $("#result").modal();
                    $("#msg").html(data.msg);
                    window.setTimeout("location.href='/user'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: (e) => {
                $('#buy_traffic').modal('hide');
                $("#result").modal();
                $("#msg").html("发生错误了: " + e.status);
            }
        });
    }
});
$("#coupon_input").click(function () {
    $.ajax({
        type: "POST",
        url: "coupon_check",
        dataType: "json",
        data: {
            coupon: $("#coupon").val(),
            shop
        },
        success: (data) => {
            if (data.ret) {
                $("#name").html("商品名称: "+data.name);
                $("#credit").html("优惠额度: "+data.credit);
                $("#total").html("总金额: "+data.total+"元");
                $("#coupon_modal").modal('hide');
                document.getElementById("amount").value=Number(data.total);

                if (Number(data.total) > $('#user_money').val()) {
                    document.getElementById("pay_code").disabled=true;
                    $('#pay_text').html("<del>余额不足 <a href='/user/code'>请先充值</a>.</del>");
                    document.getElementById("pay_online").checked=true;
                }else {
                    document.getElementById("pay_code").checked=true;
                }

                document.getElementById('mytab').style.display = "none";
                document.getElementById('myTabContent').style.display = "none";
                document.getElementById('paycontent').style.display = "";
            } else {
                $("#result").modal();
                $("#msg").html(data.msg);
            }
        },
        error: (e) => {
            $("#coupon_modal").modal('hide');
            $("#result").modal();
            $("#msg").html("发生错误了: " + e.status);
        }
    });
});
$("#order_input").click(function () {
    if(document.getElementById('pay_online').checked){
        pay_online();
    }else if(document.getElementById('wx_pay').checked){
        wx_pay();
    }else{
        pay_code();
    }
});


$(document).ready(function () {
    $("#code-update").click(function () {
        $.ajax({
            type: "POST",
            url: "code",
            dataType: "json",
            data: {
                code: $("#code").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                    window.setTimeout("location.href=window.location.href", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                    window.setTimeout("location.href=window.location.href", 2000);
                }
            },
            error: function (e) {
                $("#result").modal();
                $("#msg").html("发生错误：" + e.status);
            }
        });
    });
});


$('#invite').click(function (){
    $.ajax({
        type: "POST",
        url: "/admin/invite",
        dataType: "json",
        data: {
            prefix: $$getValue('invite'),
            uid: $$getValue('uid'),
            num: $$getValue('num'),
        },
        success: function (data) {
            if (data.ret) {
                $("#result").modal();
                $("#msg").html(data.msg);
                window.setTimeout("location.href='/admin/invite'", 2000 );
            } else {
                $("#result").modal();
                $("#msg").html(data.msg);
            }
        },
        error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
    });
});



$(document).ready(function () {
    function addclass_h () {
        var class_h = $$.getElementById("class_h").value;
        if (class_h <= 0) {
            $("#result").modal();
            $("#msg").html("输入有误, 请检查后提交.");
            return;
        }
        if ($$.getElementById('class_exprice').checked) {
            var change_class=1;
        } else {
            var change_class=0;
        }
        $.ajax({
            type: "POST",
            url: "/admin/user/addclass",
            dataType: "json",
            data: {
                vip: $('#vip').val(),
                change_class,
                class_h: $('#class_h').val()
            },
            success: data => {
                if (data.ret) {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                    window.setTimeout("location.href=window.location.href", 2000);
                } else {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    }
    $("#addclass_h").on('click',addclass_h);
});

$(document).ready(function () {
    function addTraffic () {
        var user_traffic = $$.getElementById("user_traffic").value;
        if (user_traffic <= 0) {
            $("#result").modal();
            $("#msg").html("输入有误, 请检查后提交.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/admin/user/addtraffic",
            dataType: "json",
            data: {
                vip: $('#vip_traffic').val(),
                user_traffic: $('#user_traffic').val()
            },
            success: data => {
                if (data.ret) {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                    window.setTimeout("location.href=window.location.href", 2000);
                } else {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    }
    $("#addTraffic").on('click',addTraffic);
});

$(document).ready(function () {
    function addMoney () {
        var user_money = $$.getElementById("user_money").value;
        if (user_money <= 0) {
            $("#result").modal();
            $("#msg").html("输入有误, 请检查后提交.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/admin/user/addmoney",
            dataType: "json",
            data: {
                vip: $('#vip_money').val(),
                user_money: $('#user_money').val()
            },
            success: data => {
                if (data.ret) {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                    window.setTimeout("location.href=window.location.href", 2000);
                } else {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                }
            },
            error: function (e){
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    }
    $("#addMoney").on('click',addMoney);
});

$(document).ready(function () {
    function send_email (page = -1) {
        if ($$.getElementById('class_email').checked) {
            var change_expire=1;
        } else {
            var change_expire=0;
        }
        if ($$.getElementById('overdue_no').checked) {
            var overdue=1;
        } else {
            var overdue=0;
        }
        if (page === -1) {
            sedPage = 1;
        } else {
            sedPage = page;
        }
        $("#sendemail_modal").modal();
        $.ajax({
            type: "POST",
            url: "/admin/user/sendemail",
            dataType: "json",
            data: {
                change_expire,
                overdue,
                page: sedPage
            },
            success: data => {
                if (data.ret = 1) {
                    $("#sendemail_modal").modal('hide');
                    $("#result").modal();
                    $('#msg').html(data.msg);
                    window.setTimeout("location.href=window.location.href", 2000);
                } else if (data.ret = 2) {
                    $("#sendemail_modal").modal('hide');
                    submit(data.msg+' 页已发送');
                } else {
                    $("#sendemail_modal").modal('hide');
                    $("#result").modal();
                    $('#msg').html(data.msg);
                }
            },
            error:function (e) {
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    }
    $("#send_email").click(function () {
        send_email();
    });
});



$(document).ready(function () {
    function check_nodes () {
        var type=0;
        if ($$.getElementById('check_node_all').checked) {
             type=1;
        }

        $("#check_nodes_modal").modal();
        $.ajax({
            type: "POST",
            url: "/admin/node/check_nodes_gfw",
            dataType: "json",
            data: {
                check_ip: $('#check_ip').val(),
                check_port: $('#check_port').val(),
                type
            },
            success: function (data) {
                if (data.res.ret == 1) {
                    var html='';
                    $("#check_nodes_modal").modal('hide');
                    $("#result").modal();
                    $('#msg').html(data.res.msg);
                    for(var i=0;i<data.nodes.length;i++) {
                        var ls = data.nodes[i];
                        html += "<tr><td>#" + ls.id + "</td><td>" + ls.name + "</td><td>" + ls.ip + "</td><td>" + ls.port + "</td><td>" + ls.result + "</td></tr>";
                    }
                    $("#result").modal('hide');
                    $("#checkResult").html(html);
                } else {
                    $("#check_nodes_modal").modal('hide');
                    $("#result").modal();
                    $('#msg').html(data.res.msg);
                }
            },
            error: function (e) {
                $("#result").modal();
                $('#msg').html("发生错误："+e.status);
            }
        });
    }
    $("#check_nodes").click(function () {
        check_nodes();
    });
});
