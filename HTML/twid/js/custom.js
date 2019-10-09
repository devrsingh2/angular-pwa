// vidit js-----------------------------

// enter value button show js

$(".show_hide").hide();
$('#icon_telephone').keyup(function() {

// If value is not empty
if ($(this).val() >= 500) {
	$(".show_hide").show();
	$(".sub-text p").css('color','#787878');
} else {
// Otherwise hide it
$(".show_hide").hide();
$(".sub-text p").css('color','red');
}
});

// enter one value show button

$(".swipping-button-addcard, .swipping-button-addbrand").hide();
$('#bank-cnum, #cnum, #imp-num').keyup(function() {
	if ($(this).val() > 0) {
		$(".swipping-button-addcard, .swipping-button-addbrand").show();
	} else{
		$(".swipping-button-addcard, .swipping-button-addbrand").hide();
	}
});


// offer page carousel 

var instance = M.Carousel.init({
	fullWidth: true
  });
  // Or with jQuery
  $('.carousel.carousel-slider').carousel({
	fullWidth: true
  });

// dropdown choose bank items

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.modal').modal();
  });


// credit card patteren design js
$('#cnum, #bank-cnum').on('keypress change blur', function () {
    $(this).val(function (index, value) {
        return value.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ');
    });
});

$('#cnum, #bank-cnum').on('copy cut paste', function () {
    setTimeout(function () {
        $('#cnum, #bank-cnum').trigger("change");
    });
});


  // mobile number and card number show on click js

$(document).ready(function(){	
	$('.mobno').click(function(){
		$('.payment-options').toggleClass('disp-mob');
	});
});



// Harshad JavaScript

//for open menu bar
document.addEventListener('DOMContentLoaded', function() {
    var menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
});
//fon banner slider
document.addEventListener('DOMContentLoaded', function() {
    var bannerslider = document.querySelectorAll('#banner-slider');
    M.Carousel.init(bannerslider, {fullWidth: true});
});
//service slider
document.addEventListener('DOMContentLoaded', function() {
    var servslider = document.querySelectorAll('#service-slider');
    M.Carousel.init(servslider, {Carousel: true});
});
//tabs jquery
    $('.tabs').tabs();
//swip button js
var initialMouse = 0;
var slideMovementTotal = 0;
var mouseIsDown = false;
var slider = $('#slider');

slider.on('mousedown touchstart', function(event){
	mouseIsDown = true;
	slideMovementTotal = $('#button-background').width() - $(this).width() + 10;
	initialMouse = event.clientX || event.originalEvent.touches[0].pageX;
});

$(document.body, '#slider').on('mouseup touchend', function (event) {
	if (!mouseIsDown)
		return;
	mouseIsDown = false;
	var currentMouse = event.clientX || event.changedTouches[0].pageX;
	var relativeMouse = currentMouse - initialMouse;

	if (relativeMouse < slideMovementTotal) {
		$('.slide-text').fadeTo(300, 1);
		slider.animate({
			left: "2px"
		}, 300);
		return;
	}
	slider.addClass('unlocked');
	$('#locker').text('lock_outline');
	setTimeout(function(){
		slider.on('click tap', function(event){
			if (!slider.hasClass('unlocked'))
				return;
			slider.removeClass('unlocked');
			$('#locker').text('lock_open');
			slider.off('click tap');
		});
	}, 0);
});

$(document.body).on('mousemove touchmove', function(event){
	if (!mouseIsDown)
		return;

	var currentMouse = event.clientX || event.originalEvent.touches[0].pageX;
	var relativeMouse = currentMouse - initialMouse;
	var slidePercent = 1 - (relativeMouse / slideMovementTotal);
	
	$('.slide-text').fadeTo(0, slidePercent);

	if (relativeMouse <= 0) {
		slider.css({'left': '-2px'});
		return;
	}
	if (relativeMouse >= slideMovementTotal + 10) {
		slider.css({'left': slideMovementTotal + 'px'});
		return;
	}
	slider.css({'left': relativeMouse - 10});
});
//modal js 
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals, open);
});
$(document).ready(function () {
	$('.transaction-cards').click(function(){
		$(this).toggleClass('active');
	});
	//for add padding to the section
	setTimeout(function(){
		var heights = $('.fixed-top-block').height();
		$('.app-wrapper.header-fixed-top').css('padding-top', heights + 10 + 'px');
	},800);
	//tooltip js
	$('.tooltipped').tooltip();
	//add and remove quantity with add remove button
	$('.op-plus').click(function () {
		if ($(this).prev().val() < 1000 ) {
    		$(this).prev().val(+$(this).prev().val() + 1);
		}
	});
	$('.op-minus').click(function () {
		if ($(this).next().val() > 1) {
			if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
		}
		else {
			alert('This is the minimum quantity')
		}
	});
	//custom accordion code
	$('.accordion-li .click-point-cursor').click(function(){
		$(this).siblings('.hj-collapser').slideToggle();
	});
	//amount selector select 
	$('.amount-selector-ul li').click(function(){
		$('.amount-selector-ul li').removeClass('active');
		$(this).addClass('active');
	});
	$('.amount-selector-ul li, #plus-btn').click(function(){
		$('body').addClass('show-gift-transaction-table');
	});
});