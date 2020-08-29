// Custom Scripts for Fold Template //

jQuery(function($) {
    "use strict";


        // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
        var mainbottom = $('#main').offset().top;

        // on scroll,
        $(window).on('scroll',function(){

        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $('.navbar').addClass('past-main');
            $('.navbar').addClass('effect-main')
        } else {
            $('.navbar').removeClass('past-main');
       }

      });


  // Collapse navbar on click

   $(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
    $(this).removeClass('in').addClass('collapse');
   }
  });



    /*-----------------------------------
    ----------- Scroll To Top -----------
    ------------------------------------*/

    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 1000) {
          $('#back-top').fadeIn();
      } else {
          $('#back-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#back-top').on('click', function () {
      $('#back-top').tooltip('hide');
      $('body,html').animate({
          scrollTop: 0
      }, 1500);
      return false;
    });


  /*-------- Owl Carousel ---------- */
    $(".review-cards").owlCarousel({
    slideSpeed : 200,
    items: 1,
    singleItem: true,
    autoPlay : true,
    pagination : false
    });


    /* ------ jQuery for Easing min -- */

      // Smooth scrolling using jQuery easing
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 54)
            }, 1000, "easeInOutExpo");
            return false;
          }
        }
      });


/* --------- Wow Init ------ */

  new WOW().init();


  /* ------ Countdown ----- */


/*----- Preloader ----- */

    $(window).load(function() {
  		setTimeout(function() {
        $('#loading').fadeOut('slow', function() {
        });
      }, 3000);
    });


    /*----- Subscription Form ----- */

});
$(function(){ 
 
show_time(); 
 
}); 
 
function show_time(){ 
var time_start = new Date("2017/10/01 00:00:00").getTime();//设定开始时间 
var time_end = new Date().getTime(); //设定结束时间(等于系统当前时间) 
//计算时间差 
var time_distance = time_end - time_start; 
if(time_distance > 0){ 
// 天时分秒换算 
var int_day = Math.floor(time_distance/86400000) 
time_distance -= int_day * 86400000; 
 
var int_hour = Math.floor(time_distance/3600000) 
time_distance -= int_hour * 3600000; 
 
var int_minute = Math.floor(time_distance/60000) 
time_distance -= int_minute * 60000; 
 
var int_second = Math.floor(time_distance/1000) 
// 时分秒为单数时、前面加零 
if(int_day < 10){ 
int_day = "0" + int_day; 
} 
if(int_hour < 10){ 
int_hour = "0" + int_hour; 
} 
if(int_minute < 10){ 
int_minute = "0" + int_minute; 
} 
if(int_second < 10){ 
int_second = "0" + int_second; 
} 
// 显示时间 
$("#days").html(int_day); 
$("#hours").html(int_hour); 
$("#minutes").html(int_minute); 
$("#seconds").html(int_second); 
 
setTimeout("show_time()",1000); 
 
}else{ 
$("#days").html('00'); 
$("#hours").html('00'); 
$("#minutes").html('00'); 
$("#seconds").html('00'); 
 
} 
} 