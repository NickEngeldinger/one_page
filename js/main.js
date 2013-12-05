// SIDEBAR
var sidebarToggle = function() {
    var
        menuClose  = document.getElementById('menu-close'),
        menuToggle = document.getElementById('menu-toggle'),
        sidebar    = document.getElementbyid('sidebar-wrapper');

    menuClose.on('click',function(e) {
        e.preventDefault();
        sidebar.toggleClass('active');
    });

    menuToggle.on('click',function(e) {
        e.preventDefault();
        sidebar.toggleClass('active');
    });
}
sidebarToggle();
      
// SMOOTH SCROLLING
var pageScroll = $(function() {
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
}
pageScroll();

// COPYRIGHT YEAR
var insertCurrentYear = function() {
    var now = new Date;
    var theYear = now.getYear();
    if ( theYear < 1900 ) {
        theYear = theYear + 1900;
    }

    var yearEl = document.getElementById('currentYear');

    yearEl.appendChild(theYear);
}
insertCurrentYear();

// FORM VALIDATION
var checkInputs = function() {
    
    var 
        name     = document.getElementById('contact_name'),
        email    = document.getElementById('contact_email'),
        msg      = document.getElmenetById('contact_msg'),
        ne       = document.getElementByClassName('name_error'),
        ng       = document.getElementByClassName('name_group'),
	ee       = document.getElementByClassName('email_error'),
        eg       = document.getElementByClassName('email_group'),
        ae       = document.getElementByClassName('address_error'),
        me       = document.getElementByClassName('msg_error'),        
	mg       = document.getElementByClassName('msg_group'),
	se       = document.getElementByClassName('submit_error'),
	errClass = 'has-error'; 

    // Could I combine these functions into a loop that
    // takes the few differences as parameters? Lot of
    // repetition here
    var checkName = function() {
        if ( name.val.length < 1 ) {
            ne.show();
            ng.addClass(errClass);
        }
        else {
            ne.hide();
            ng.removeClass(errClass);
            return true;
        }
    }

    var checkEmail = function() {
	if ( email.val.length < 1 ) {
            ee.show();
            eg.addClass(errClass);
        }
        else {
            ee.hide();
            eg.removeClass(errClass);
            return true;
        }
    }

    var checkAddress = function(email_address) {
        var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        return re.test(email_address);
    }
   
    if ( !checkAddress(email.val()) ) {
        ae.show();
        eg.addClass(errClass);
    }
    else {
        ae.hide();
        eg.removeClass(errClass);
    }

    var checkMsg = function() {
        if ( msg.val.length < 1 ) {
            me.show();
            mg.addClass(errClass);
        }
        else {
            me.hide();
            mg.removeClass(errClass);
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
                name.val('');
                email.val('');
                msg.val('');

                //Remove error message if previously displayed
                se.hide();
            }

            var failureCallback = function() {
            se.show();

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

var validateForm = function() {
    var formSubmit = document.getElementById('send_form');

    formSubmit.on('click',function() {
        checkInputs();
    });
}
validateForm();

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

var artistGallery = function() {
    
    var
        $artist1 = $('.artist_1'),
        $artist2 = $('.artist_2');

    $artist1.on('click',function(e) {
        e.preventDefault();
        var gallery = blueimp.Gallery([
            'img/artist1/tat1.jpg',
            'img/artist1/tat2.jpg',
            'img/artist1/tat3.jpg'
        ]);
    });

    $artist2.on('click',function(e) {
        e.preventDefault();
        var gallery = blueimp.Gallery([
            'img/artist2/tat4.jpg',
            'img/artist2/tat5.jpg',
            'img/artist2/tat6.jpg'
	]);
    });
}
artistGallery();
