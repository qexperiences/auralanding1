/* VALIDATING FORM SCRIPT */

jQuery(document).ready(function() {
	
	var select_persons_text = jQuery(document).find("#select-persons option:first").text();
    var select_persons_val = jQuery(document).find("#select-persons option:first").val();
    $("body").on("click", ".niceselect.select-persons .value-wrapper .values", function (t) {
        if ($(this).find("input").val() == select_persons_val) {
            $(this).closest("div.select-style").addClass("error");
            return false;
        } else {
            $(this).closest("div.select-style").removeClass("error");
        }
    });
	
    formvalidate = jQuery("#main-form");
    formvalidate.validate({
        rules: {
            name: {required: true},
            email: {required: true, email:true},
            'departure-date': {required: true},
			'arrival-date': {required: true},
			'select-persons': {required: true},
            phone: {required: true, number:true },
			zipcode: {required: true},
			comments: {required: true},
        }
    });
    jQuery(formvalidate).submit(function(e) {
		
		return_status = true;
        if (jQuery(document).find("div.niceselect.select-persons p").text() == select_persons_text) {
            jQuery(document).find("div.niceselect.select-persons").closest("div.select-style").addClass("error");
            if (return_status) {
                return_status = false;
            }
        } else {
            jQuery(document).find("div.niceselect.select-persons").closest("div.select-style").removeClass("error");
        }
       
        if (!return_status) {
            return false;
        }
		
        e.preventDefault();
        if (formvalidate.valid()) {
            $('#submit').val('LOADING...');

            $.ajax({type: 'post', url: "mail/email-mailer.php", data: jQuery(formvalidate).serialize(), success: function(result) {
                    var $response = jQuery.parseJSON(result);
                    $('#submit').val('Find Tours');
                    if ($response.success) {
                        $('.error-msg').remove();
                        $('.success-msg').remove();
                        $('<p class="success-msg">' + $response.message + '</p>').insertAfter('#submit');
                        $(formvalidate[0]).find("input[type=text], textarea, select").val("");
                    } else {
                        $('.error-msg').remove();
                        $('.success-msg').remove();
                        $('<p class="error-msg">' + $response.message + '</p>').insertAfter('#submit');
                    }
                }});
        }
        return false;
    });
});


/* SCROLL BUTTON SCRIPT */

$('body').prepend('<a href="javascript:void(0)" class="back-to-top"><i class="fa fa-angle-up"></i></a>');
var amountScrolled = 300;
$(window).scroll(function() {
    if ($(window).scrollTop() > amountScrolled) {
        $('a.back-to-top').fadeIn('slow');
    }
    else {
        $('a.back-to-top').fadeOut('slow');
    }
});
$('a.back-to-top, a.simple-back-to-top').click(function() {
    $('html, body').animate({scrollTop: 0}, 700);
    return false;
});


/* DATEPICKER SCRIPT */

$(function() {
    $("#departure-date").datepicker();
	$("#arrival-date").datepicker();
	
	$('#departure-icon').click(function() {
      $('#departure-date').datepicker('show');
});

	$('#arrival-icon').click(function() {
      $('#arrival-date').datepicker('show');
});

});


/* ANIMATION SCRIPT */

new WOW().init();


/* TESTIMONIALS SLIDER SCRIPT */

$('.owl-carousel').owlCarousel({
    margin: 0,
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
	autoHeight:true,
	nav: true,
    //navigationText: ["<img src='myprevimage.png'>","<img src='mynextimage.png'>"]
    
});
	

/* IMAGE HOVER SCRIPT */

$(document).ready(function() {

    $('.section-two-inner').hover(
            function() {
                $(this).find('.caption').slideDown(250);
            },
            function() {
                $(this).find('.caption').slideUp(250);
            }
    );
	
});

/* LIGHT SLIDER SCRIPT */
$(window).load( function(){	
	$('.lightSlider').lightSlider({
		gallery: true,
		item: 1,
		loop:true,
		slideMargin: 0,
		thumbMargin: 0,
		thumbItem: 3
	});
});



/* SELECT SCRIPT */

$('document').ready(function(){ 
	$('.change').niceselect(); 
})


