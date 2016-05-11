/*
 * Slippery slider main script
 * Uses slick - http://kenwheeler.github.io/slick/
 * 
 * @author aschmelyun
 */

var attributes;
var currentImage;

function positionElement(item, pos_top, pos_left) {
    var elementPosition = {};
    
    if($(window).width() < 960 && $(window).width() > 767) {
        if(pos_left > 0) {
            elementPosition = {
                top: (pos_top * 0.8) + 'px',
                left: (pos_left * 0.8) + 'px'
            };
        } else {
            elementPosition = {
                top: (pos_top * 0.8) + 'px',
                left: pos_left + 'px'
            };
        }
        
    } else {
        elementPosition = {
            top: pos_top + 'px',
            left: pos_left + 'px'
        };
    }
    
    
    item.css(elementPosition);
}

function fadeInLeft(item, time_length, time_delay) {
	item.show();
	if(typeof time_delay !== typeof undefined && time_delay !== 'false' && time_delay !== 0) {
	    //console.log(time_delay + ' ' + time_length);
        item.delay(time_delay * 1000).animate({ opacity: "1.0", left: "+=20" }, time_length * 1000);
	} else {
        item.animate({ opacity: "1.0", left: "+=20" }, time_length * 1000);
	}
	
}

function fadeInLeftReset(item) {
	item.hide();
	item.animate({ opacity: "0.0", left: "-=20" });
}

function fadeInTop(item, time_length, time_delay) {
    item.show();
    if(typeof time_delay !== typeof undefined && time_delay !== 'false' && time_delay !== 0) {
        item.delay(time_delay * 1000).animate({ opacity: "1.0", top: "+=20" }, time_length * 1000);
    } else {
        item.animate({ opacity: "1.0", top: "+=20" }, time_length * 1000);
    }
}

function fadeInTopReset(item) {
    item.hide();
    item.animate({ opacity: "0.0", top: "-=20" });
}

function fadeIn(item, time_length, time_delay) {
    item.show();
    if(typeof time_delay !== typeof undefined && time_delay !== 'false' && time_delay !== 0) {
        item.delay(time_delay * 1000).animate({ opacity: "1.0" }, time_length * 1000);
    } else {
        item.animate({ opacity: "1.0" }, time_length * 1000);
    }
}

function fadeInReset(item) {
    item.hide();
    item.animate({ opacity: "0.0" });
}

$(document).ready(function() {
	$('.slippery-preloader').hide();
	$('.slippery-slider').fadeIn();
	$('.slippery-slider').slick({
		autoplay: true,
		autoplaySpeed: 7000,
		dots: true,
		arrows: false,
		pauseOnHover: true
	});
	
});

$('.slippery-slider').on('init', function(event, slick) {
   
   console.log("Slippery Initiated");
   
   $('.slide.slick-slide .slippery-elements').children().each(function(index) {
        //console.log($(this).attr('class'));
        
        // A check to see if attributes have been defined for an element through data-slippery-attributes.
        if(typeof $(this).attr('data-slippery-attributes') !== typeof undefined && $(this).attr('data-slippery-attributes') !== false) {
            
            // Split each of the attributes apart, giving them their own tag elements. (e.g. data-slippery-animate)
            attributes = $(this).attr('data-slippery-attributes').split(',');
            currentImage = $(this);
            
            $.each(attributes, function(index, value) {
                var values = attributes[index].split(':');
                currentImage.attr('data-slippery-' + values[0], values[1]);
                currentImage.attr('data-slippery-attributes', 'Parsed');
            });
            
        }
        
    });
   
   var currentSlide = $(slick.$slides[0]).attr('id');
   
   $('#' + currentSlide + ' .slippery-elements').children().each(function() {
       
      if(typeof $(this).attr('data-slippery-attributes') !== typeof undefined && $(this).attr('data-slippery-attributes') !== false) {
          if(typeof $(this).attr('data-slippery-mobile-top') !== typeof undefined && $(this).attr('data-slippery-mobile-top') !== false && typeof $(this).attr('data-slippery-mobile-left') !== typeof undefined && $(this).attr('data-slippery-mobile-left') !== false && $(window).width() <= 767) {
            positionElement($(this), $(this).attr('data-slippery-mobile-top'), $(this).attr('data-slippery-mobile-left'));
          } else {
            positionElement($(this), $(this).attr('data-slippery-top'), $(this).attr('data-slippery-left'));
          }
          window[$(this).attr('data-slippery-animate')]($(this), $(this).attr('data-slippery-time'), $(this).attr('data-slippery-delay'));
      }
       
   });
    
});

$('.slippery-slider').on('afterChange', function(event, slick, currentSlide) {
		
	var activeSlide = $(slick.$slides.get(currentSlide)).attr('id');
	var previousSlide = $(slick.$slides.get(currentSlide-1)).attr('id');
	var nextSlide = $(slick.$slides.get(currentSlide+1)).attr('id');
			
	$('#' + activeSlide + ' .slippery-elements').children().each(function() {
		    
		//console.log($(this).attr('data-slippery-attributes'));			
		// A precaution, if there's no data-slippery-attributes defined for an element, we don't go through them.
		if(typeof $(this).attr('data-slippery-attributes') !== typeof undefined && $(this).attr('data-slippery-attributes') !== false) {
		    if(typeof $(this).attr('data-slippery-mobile-top') !== typeof undefined && $(this).attr('data-slippery-mobile-top') !== false && typeof $(this).attr('data-slippery-mobile-left') !== typeof undefined && $(this).attr('data-slippery-mobile-left') !== false && $(window).width() <= 767) {
		      positionElement($(this), $(this).attr('data-slippery-mobile-top'), $(this).attr('data-slippery-mobile-left'));
		    } else {
		      positionElement($(this), $(this).attr('data-slippery-top'), $(this).attr('data-slippery-left'));
		    }
			window[$(this).attr('data-slippery-animate')]($(this), $(this).attr('data-slippery-time'), $(this).attr('data-slippery-delay'));
		}
				
	});
			
	$('#' + previousSlide + ' .slippery-elements').children().each(function() {
			
		if(typeof $(this).attr('data-slippery-attributes') !== typeof undefined && $(this).attr('data-slippery-attributes') !== false) {
			window[$(this).attr('data-slippery-animate') + 'Reset']($(this));
		}
			
	});
			
});

$('img.trackers-blackfriday').click(function(e) {
    e.preventDefault();
    var clickX = e.pageX - ($(this).offset().left);
    
    if(clickX > ($(this).width() / 2)) {
        window.location.href = "/product/core-c200";
    } else {
        window.location.href = "/product/move-c300";
    }
});

$('img.banner-blackfriday').click(function(e) {
    e.preventDefault();
    var clickX = e.pageX - ($(this).offset().left);
    var clickY = e.pageY - ($(this).offset().top);
    
    if(clickY > ($(this).height() - 32)) {
        
        if(clickX > ($(this).width() / 2)) {
            window.location.href = "/product/move-c300";
        } else {
            window.location.href = "/product/core-c200";
        }
    }
});

$('img.banner-cybermonday').click(function(e) {
   e.preventDefault();
    var clickX = e.pageX - ($(this).offset().left);
    var clickY = e.pageY - ($(this).offset().top);
    
    if(clickY > ($(this).height() - 32)) {
        if($(document).width() < 768) {
            if(clickX <= 24) {
                window.location.href = "https://www.facebook.com/LifeTrak/";
            } else if(clickX > 24 && clickX <= 48) {
                window.location.href = "https://twitter.com/mylifetrak";
            } else if(clickX > 48 && clickX <= 72) {
                window.location.href = "https://www.instagram.com/mylifetrak/";
            }
        } else {
            if(clickX <= 40) {
                window.location.href = "https://www.facebook.com/LifeTrak/";
            } else if(clickX > 40 && clickX <= 80) {
                window.location.href = "https://twitter.com/mylifetrak";
            } else if(clickX > 80 && clickX <= 120) {
                window.location.href = "https://www.instagram.com/mylifetrak/";
            }
        }
        
    }
});

$('img.button-glitter').click(function(e) {
    window.location.href = "https://lifetrakusa.com/store";
});

