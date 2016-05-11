// Functionality to change the 3d view when the color variation is changed
(function($) {
	$(document).ready(function() {
		var startingStyle = $('.variations select#color').val();
		//console.log(startingStyle);
		if(typeof(startingStyle) === 'undefined') {
			if($('.product-3d-wrap').length > 1) {
				var productId = $('.product-3d-wrap').first().attr('id');
				var currentStyle = '#' + productId + '-' + startingStyle;
				console.log(currentStyle);
				if(currentStyle.length) {
					$('#' + productId).hide();				// Hide default 3d viewer
					$(currentStyle).show();					// Show the view for the default style variation
				}
			}
		}
		
		$('.app-screenshots img').each(function () {
			$(this).after('<span class="app-screenshot-overlay">' + $(this).attr('alt').replace($.trim($('.page-header h1').text()) + ': ', '') + '</span>');
		});
		
		var motivationId = 1;
				
		$('.page-id-2939 .gallery img').each(function() {
		    $(this).attr('id', 'motivation' + motivationId);
		    $(this).after('<a href="#" class="motivation-share motivation-twitter" id="motivation' + motivationId + 'Tweet" data-url="' + $(this).attr('src') + '" data-text="Share your Lifetrak motivation with Brite R450"><i class="fa fa-twitter"></i> &nbsp; Tweet</a>');
		    $(this).after('<a href="#" class="motivation-share motivation-facebook" id="motivation' + motivationId + 'Share"><i class="fa fa-facebook"></i> &nbsp; Share on Facebook</a>');
		    motivationId++;
		});
		
		if(window.location.hash == '#close_popup') window.close();
		
	});
	
	$(document).on('click', '.motivation-twitter', function(e) {
	    e.preventDefault();
	    
	    var tweetId = $(this).attr('id').replace('Tweet', '');
	    var tweetUrlPre = $('#' + tweetId).attr('src').replace('.png', '');
	    var tweetUrl = tweetUrlPre + '-Twitter.png';
	    
	    var width = 575,
	       height = 400,
	       left = ($(window).width() - width) / 2,
	       top = ($(window).height() - height) / 2,
	       url = 'https://twitter.com/share?url=' + tweetUrl + '&text=Let%27s%20reach%20our%20fitness%20goals!%20Motivate%20your%20fitness%20buddy%20%26%20enter%20to%20win%20a%20Brite%20R450%20at%20http://www.lifetrakusa.com/spread-the-fit',
	       opts =  'status=1'  +
	               ',width='   + width     +
	               ',height='  + height    +
	               ',top='     + top       +
	               ',left='    + left;
	               
	   window.open(url, 'twitter', opts);
	   
	   return false;
	});
	
	$(document).on('click', '.motivation-facebook', function(e) {
	   e.preventDefault();
	   
	   var shareId = $(this).attr('id').replace('Share', '');
	   var shareUrlPre = $('#' + shareId).attr('src').replace('.png', '');
	   var shareUrl = shareUrlPre + '-Facebook.png';
	   
	   var width = 575,
           height = 400,
           left = ($(window).width() - width) / 2,
           top = ($(window).height() - height) / 2,
           url = 'http://facebook.com/dialog/feed?app_id=673575719432204&link=http://lifetrakusa.com/spread-the-fit&picture=' + shareUrl + '&name=Spread%20The%20Fit&caption=Let%27s%20reach%20our%20fitness%20goals!%20Motivate%20your%20fitness%20buddy%20%26%20enter%20to%20win%20a%20Brite%20R450&redirect_uri=http%3A%2F%2Fwww.lifetrakusa.com%2Fwindow-close.php&display=popup',
           opts =  'status=1'  +
                   ',width='   + width     +
                   ',height='  + height    +
                   ',top='     + top       +
                   ',left='    + left;
                   
       window.open(url, 'facebook', opts);
       
       return false;
	});
	
	$(document).on('change','#color',function(){	//Event delegation, select box is added dynamically
		var changingStyle = $('.variations select#color').val();
		if($('.product-3d-wrap').length > 1) {
			var productId = $('.product-3d-wrap').first().attr('id');
			var newStyle = '#' + productId + '-' + changingStyle;
			console.log(newStyle);
			if(changingStyle) {
				if(newStyle.length) {
					$('.product-3d-wrap').hide();
					$(newStyle).show();
				}
			}
		}
		
	});
	
	$('li.menu-comfortfit-bands > a').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		//console.log("Clicked");
		$(this).parent().addClass('open');
		
		var menu = $(this).parent().find('ul');
		var menupos = menu.offset();
		
		if((menupos.left + menu.width()) + 30 > $(window).width()) {
			var newpost = - menu.width();
		} else {
			var newpos = $(this).parent().width();
		}
		menu.css({ left: newpos, top: 0 });
	});
	$('li.zone-c410-menu-primary > a').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		//console.log("Clicked");
		$(this).parent().addClass('open');
		
		var menu = $(this).parent().find('ul');
		var menupos = menu.offset();
		
		if((menupos.left + menu.width()) + 30 > $(window).width()) {
			var newpost = - menu.width();
		} else {
			var newpos = $(this).parent().width();
		}
		menu.css({ left: newpos, top: 0 });
	});
	
	$('#download_ios').on('click', function() {
        ga('send', 'event', 'button', 'click', 'app-download-ios');
    });
    
    $('#download_android').on('click', function() {
       ga('send', 'event', 'button', 'click', 'app-download-android'); 
    });
    
    $('#gform_submit_button_3').on('click', function() {
        ga('send', 'event', 'button', 'click', 'newsletter-signup');
    });
    
    $('#gform_submit_button_2').on('click', function() {
        ga('send', 'event', 'button', 'click', 'register-lifetrak');
    });
    
    $('body').on('click', '.bv-write-review', function() {
        ga('send', 'event', 'button', 'click', 'submit-review');
    });
    
    $('#dropbox_submit').on('click', function() {
        ga('send', 'event', 'button', 'click', 'submit-support-ticket');
    });
    
    $('.button-zoom').on('click', function() {
        ga('send', 'event', 'button', 'click', 'zoom-slider-kickstarter');
    });
    
    $('#international-retailer').change(function() {
       //console.log($(this).val());
       
       $('.international-link').hide();
       $('.international-link.' + $(this).val()).show();
    });
    
    $('#location_singapore').click(function(e) {
        e.preventDefault();
        alert("Available in-stores only");
    });
    
    $('#ltComparisonChart').click(function(e) {
        e.preventDefault();
        $('.footer-top, .footer-bottom, .store-header, .store-content').hide();
        $('#ltComparisonChartOverlay').fadeIn(250);
    });
    $('#ltComparisonChartOverlay').click(function(e) {
        $('.footer-top, .footer-bottom, .store-header, .store-content').show();
        $(this).fadeOut(250);
    });
    $(document).on("copy paste","#billing-zip",function(e) {
        e.preventDefault();
        alert("For your security, please input the billing information manually");
    });
    $(document).on("copy paste","#billing_postcode",function(e) {
    	e.preventDefault();
        alert("For your security, please input the billing information manually");    	
    });
	$(document).on("copy paste","#s4wc-card-number",function(e) {
    	e.preventDefault();
        alert("For your security, please input the billing information manually");    	
    });
	
})(jQuery);
