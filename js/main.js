//load
$(window).on('load', function () {
	function funload() {
		$preloader = $('#loader'),
		$loader = $preloader.find('#cube-loader');
		$loader.fadeOut();
		$preloader.delay(350).fadeOut('slow');
	}
	setTimeout(funload, 1000);

});


/*MENU*/
$(document).on("ready", function () {
    $("#menu .cd-nav-trigger").click(function () {
        $("#menu").toggleClass("menu-open");
		$(".nav-bar").toggleClass("open-menu");
		$('#menu .bar').toggleClass('animate');
		$("body").toggleClass("open-menu");
    });
	
});




//scroll
$(document).ready(function(){
    $(".scroll").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
			$(this).parent().addClass('hide-scroll');
        $('body,html').animate({scrollTop: top - 0 }, 600);
    });
});

//load
$(window).on('load', function () {
	function funscr() {
		$('.first-scroll').addClass('active');
	}
	setTimeout(funscr, 3000);

});


//	accordion
$(document).on("ready", function () {
	$(".faq-accordion .item").click(function () {
		$(".faq-accordion .item").removeClass('active');
		$(".faq-accordion .item .panel").hide("slow");
		$(this).addClass('active');
		
		$(".faq-accordion .item.active .panel").show("slow");
		
	});
});	

//TOP
$(function() { 
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},800);
	});
});


//parallax
(function() {
  window.addEventListener('scroll', function(event) {
    var depth, i, layer, layers, len, movement, topDistance, translate3d;
    topDistance = this.pageYOffset;
    
	layers = document.querySelectorAll("[data-type='parallax']");
    for (i = 0, len = layers.length; i < len; i++) {
      layer = layers[i];
      depth = layer.getAttribute('data-depth');
      //movement = -(topDistance * depth);
	  movement = (topDistance * depth);
      translate3d = 'translate3d(0, ' + movement + 'px, 0)';
      layer.style['-webkit-transform'] = translate3d;
      layer.style['-moz-transform'] = translate3d;
      layer.style['-ms-transform'] = translate3d;
      layer.style['-o-transform'] = translate3d;
      layer.style.transform = translate3d;
	  
	  
    }
	//layers 2
	layerstop = document.querySelectorAll("[data-type='parallaxtop']");
    for (i = 0, len = layerstop.length; i < len; i++) {
      layertop = layerstop[i];
      depthtop = layertop.getAttribute('data-depth-top');
	  movementtop = -(topDistance * depthtop);
      translate3dtop = 'translate3d(0, ' + movementtop + 'px, 0)';
      layertop.style['-webkit-transform'] = translate3dtop;
      layertop.style['-moz-transform'] = translate3dtop;
      layertop.style['-ms-transform'] = translate3dtop;
      layertop.style['-o-transform'] = translate3dtop;
      layertop.style.transform = translate3dtop;
    }
	
  });

}).call(this);

//modal
$('.modal-block').on('click', function(){
	var	id =  this.id;
  $(".modal[data-id='#"+id+"']").toggleClass('open');
  $(".modal-ov").show("slow");
  $("body").addClass("open-hidden");
  
});

$(".close").click(function () {
	$(".modal-content").addClass('zoom');
	$(".modal-content.zoom").css({'transform':'translateY(-100%)'});
	$(".modal-ov").hide("slow");
	$("#profit-calculator .sel-tree").removeClass('none');
	function func() {
		$(".modal").removeClass("open");
		$("body").removeClass("open-hidden");
		$(".modal-content").removeClass('zoom');
		$(".modal-content").css({'transform':'translateY(0)'});
	}
	setTimeout(func, 300);
	
});

$(document).scroll(function () {
	var WinTop = $(window).scrollTop();
	var docHeight = $(window).height();

	$('.fadeEl').each(function () {
		var topIn = $(this).offset().top -docHeight * 0.80 ; 
		if (WinTop > topIn) {
			$(this).addClass('anim');
		}
	});
	
	$('.js-animation').each(function () {
		var topIn = $(this).offset().top -docHeight * 0.80 ; 
		if (WinTop > topIn) {
			$(this).addClass('start-animation');
		}
	});
});
	


//calculator
$(document).on("ready", function () {
    $("#header-slider .modal-block").click(function () {
        $("#profit-calculator").removeClass();
		var treeid = $(this).attr('data-id');
		$("#profit-calculator").addClass(treeid);
    });
});

$('#c-input').on('change',function(){
	$('#profit').html($('#c-input').prop("value"));
});

$(document).on("ready", function () {
    $("#currency-block span").click(function () {
        $("#currency-block").removeClass();
		$("#currency-block span").removeClass('active');
		var treecurrency = $(this).attr('id');
		$(this).addClass('active');
		$("#currency-block").addClass(treecurrency);
    });
});



