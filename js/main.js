//SIDEBAR FUNCTIONALITY
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
      
//SMOOTH SCROLLING
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
            
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

//COPYRIGHT YEAR
var insertCurrentYear = function() {
    var now = new Date;
    var theYear = now.getYear();
    if ( theYear < 1900 ) {
        theYear = theYear + 1900;
    }

    $('#currentYear').append(theYear);
    console.log("THIS IS THE CURRENT YEAR",theYear)
}
insertCurrentYear();