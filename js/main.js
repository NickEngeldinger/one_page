// SIDEBAR FUNCTIONALITY
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
      
// SMOOTH SCROLLING
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

// COPYRIGHT YEAR
var insertCurrentYear = function() {
    var now = new Date;
    var theYear = now.getYear();
    if ( theYear < 1900 ) {
        theYear = theYear + 1900;
    }

    $('#currentYear').append(theYear);
}
insertCurrentYear();

// FORM VALIDATION
var checkInputs = function() {
    var name  = $('#contact_name').val();
    var email = $('#contact_email').val();
    var msg   = $('#contact_msg').val();

    // Could I combine these functions into a loop that
    // takes the few differences as parameters? Lots of
    // repetition here
    var checkName = function() {
        if ( name.length < 1 ) {
            $('.name_error').show();
            $('.name_group').addClass('has-error');
        }
        else {
            $('.name_error').hide();
            $('.name_group').removeClass('has-error');
            return true;
        }
    }

    var checkEmail = function() {
        if ( email.length < 1 ) {
            $('.email_error').show();
            $('.email_group').addClass('has-error');
        }
        else {
            $('.email_error').hide();
            $('.email_group').removeClass('.has-error');
            return true;
        }
    }

    var checkAddress = function(email_address) {
        var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        return re.test(email_address);
    }
    
    if ( !checkAddress(email) ) {
        $('.address_error').show();
        $('.email_group').addClass('has-error');
    }
    else {
        $('.address_error').hide();
        $('.email_group').removeClass('has-error');
    }

    var checkMsg = function() {
        if ( msg.length < 1 ) {
            $('.msg_error').show();
            $('.msg_group').addClass('has-error');
        }
        else {
            $('.msg_error').hide();
            $('.msg_group').removeClass('has-error');
            return true;
        }
    }

    var combined_validation = function() {
    
        var ajax_call = function() {
            // TODO: ADD EMAIL AJAX SUBMISSION FUNCTION

            var successCallback = function() {
                //Fire modal thanking for messge
                $('#form_modal').modal('show')
            
                //Blank form
                $('#contact_name').val('');
                $('#contact_email').val('');
                $('#contact_msg').val('');

                //Remove error message if previously displayed
                $('.submit_error').hide();
            }

            var failureCallback = function() {
            $('.submit_error').show();

            }
            //Dummy response for development
            successCallback();
        }

        if ( checkName() & checkEmail() & checkAddress(email) & checkMsg() ) {
            //TODO: ADD AJAX EMAIL SEND FUCNTION CALL
            ajax_call();
        }
    }

    checkName();
    checkEmail();
    checkMsg();
    combined_validation();
}

$('#send_form').click(function() {
    checkInputs();
});

// CUSTOM GOOGLE MAP //
google.maps.event.addDomListener(window, 'load', init);

function init() {
    var myLatLng = new google.maps.LatLng(44.954467, -122.983671);
    var mapOptions = {
        zoom : 14,
        center : myLatLng,
        disableDefaultUI : true,
        styles : [
                    {
                        "featureType" : "water",
                        "elementType" : "geometry",
                        "stylers" : [
                            {
                                "color" : "#a2daf2"
                            }
                        ]
                    },
                    {
                        "featureType" : "landscape.man_made",
                        "elementType" : "geometry",
                        "stylers" : [
                            {
                                "color" : "#f7f1df"
                            }
                        ]
                    },
                    {
                        "featureType" : "landscape.natural",
                        "elementType" : "geometry",
                        "stylers" : [
                            {
                                "color" : "#d0e3b4"
                            }
                        ]
                    },
                    {
                        "featureType" : "landscape.natural.terrain",
                        "elementType" : "geometry",
                        "stylers" : [
                            {
                                "visibility" : "off"
                            }
                        ]
                    },
                    {
                        "featureType" : "poi.park",
                        "elementType" : "geometry",
                        "stylers": [
                            {
                                "color" : "#bde6ab"
                            }
                        ]
                    },
                    {
                        "featureType" : "poi",
                        "elementType" : "labels",
                        "stylers" : [
                            {
                                "visibility" : "off"
                            }
                        ]
                    },
                    {
                        "featureType" : "poi.medical",
                        "elementType" : "geometry",
                        "stylers" : [
                            {
                                "color" : "#fbd3da"
                            }
                        ]
                    },
                    {
                        "featureType" : "poi.business",
                        "stylers" : [
                            {
                                "visibility" : "off"
                            }
                        ]
                    },
                    {
                        "featureType" : "road",
                        "elementType" : "geometry.stroke",
                        "stylers" : [
                            {
                                "visibility" : "off"
                            }
                        ]
                    },
                    {
                        "featureType" : "road.highway",
                        "elementType" : "geometry.fill",
                        "stylers" : [
                            {
                                "color" : "#ffe15f"
                            }
                        ]
                    },
                    {
                        "featureType" : "road.highway",
                        "elementType" : "geometry.stroke",
                        "stylers": [
                            {
                                "color" : "#efd151"
                            }
                        ]
                    },
                    {
                        "featureType" : "road.arterial",
                        "elementType" : "geometry.fill",
                        "stylers" : [
                            {
                                "color" : "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType" : "road.local",
                        "elementType" : "geometry.fill",
                        "stylers" : [
                            {
                                "color" : "black"
                            }
                        ]
                    },
                    {
                        "featureType" : "transit.station.airport",
                        "elementType" : "geometry.fill",
                        "stylers" : [
                            {
                                "color" : "#cfb2db"
                            }
                        ]
                    }
        ]
    };
    var mapElement = document.getElementById('location');
    
    var map = new google.maps.Map(mapElement, mapOptions);
 
    var iconImage = {
        url : 'img/map_icon.png',
        size : new google.maps.Size(186, 72),
        origin : new google.maps.Point(0, 0),
        anchor : new google.maps.Point(88, 72)
    }

    var marker = new google.maps.Marker({
        position : myLatLng,
        map : map,
        icon : iconImage,
        clickable : false
    });
}

$('.artist_1').click(function(event) {
    event.preventDefault();
    var gallery = blueimp.Gallery([
        {    
            title : 'Tat Title 1',
            href  : 'img/artist1/tat1.jpg',
            type  : 'image/jpeg'
        },
        {
            title : 'Tat Title 2',
            href  : 'img/artist1/tat2.jpg',
            type  : 'image/jpeg'
        },
        {
            title : 'Tat Title 3',
            href  : 'img/artist1/tat3.jpg',
            type  : 'image/jpeg'
        }
    ]);   
});

$('.artist_2').click(function(event) {
    event.preventDefault();
    var gallery = blueimp.Gallery([
        {
            title : 'Tat Title 3',
            href  : 'img/artist2/tat4.jpg',
            type  : 'image/jpeg'
        },
        {
            title : 'Tat Title 4',
            href  : 'img/artist2/tat5.jpg',
            type  : 'image/jpeg'
        },
        {
            title : 'Tat Title 5',
            href  : 'img/artist2/tat6.jpg',
            type  : 'image/jpeg'
        }
    ]);
});

$('artist_3').click(function(event) {
    event.preventDefault();
});

$('artist_4').click(function(event) {
    event.preventDefault()
});