jQuery(document).ready(function(){
           function openPromoPopup() {
               setTimeout(function(){
               jQuery('a[href="#promo-popup-inner"]').trigger("click");
               }, 1000)
           }
  
           function setCookie(cname, cvalue, exdays) {
               var d = new Date();
               d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
               var expires = "expires=" + d.toUTCString();
               document.cookie = cname + "=" + cvalue + "; " + expires;
           }
  
           function getCookie(cname) {
               var name = cname + "=";
               var ca = document.cookie.split(';');
               for (var i = 0; i < ca.length; i++) {
                   var c = ca[i];
                   while (c.charAt(0) == ' ') c = c.substring(1);
                   if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
               }
               return "";
           }
    
           function getURLParameter(name) {
               return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
           }
  
           function checkURLParameter(name) {
               return (!new RegExp("[?&]" + name).test(location.search)) ? false : true;
           }
  
           jQuery('#test-btn').click(function (e) {
               openPromoPopup();
           });
  
           var promoPopupCookie = getCookie("promoPopupCookie");
  
           if ((promoPopupCookie != 1 && promoPopupCookie != null) || (checkURLParameter("ripenpromotest"))) {
               openPromoPopup();
               setCookie("promoPopupCookie", 1, 1);
           }
       });
