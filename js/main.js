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
    // takes the few differences as parameters? Lot of
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