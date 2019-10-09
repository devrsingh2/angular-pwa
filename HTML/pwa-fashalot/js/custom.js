// vidit js

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

// harshad js

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