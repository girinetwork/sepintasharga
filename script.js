/* Sticky Navigation */
$(function() {

    var sticky = $('.sticky');
    var contentOffset;
    var nav_height;
    if( sticky.length ) {
        contentOffset = sticky.offset().top;
        nav_height = sticky.height();
    }

    var scrollTop = $(window).scrollTop();
    var window_height = $(window).height();
    var doc_height = $(document).height();

    $(window).bind('resize', function() {
        scrollTop = $(window).scrollTop();
        window_height = $(window).height();
        doc_height = $(document).height();
        navHeight();
    });

    $(window).bind('load', function() {
        contentOffset = sticky.offset().top;
        scrollTop = $(window).scrollTop();
        window_height = $(window).height();
        doc_height = $(document).height();
        navHeight();
    });

    $(window).bind('scroll', function() {
        stickyNav();
        addActive();
    });

    function navHeight() {
        sticky.css('max-height', window_height + 'px');
    }

    function stickyNav() {
        scrollTop = $(window).scrollTop();
        if (scrollTop > contentOffset) {
            sticky.addClass('fixed');
        }
        else {
            sticky.removeClass('fixed');
        }
    }

    function addActive() {
        scrollPos = $(window).scrollTop();
        $('.section').each(function() {
            var top = $(this).offset().top - nav_height, bottom = top + $(this).outerHeight();
            if (scrollPos >= top && scrollPos <= bottom) {
                $('#main-menu').find('a').removeClass('active');
                $('#main-menu').find('a[href="#'+ $(this).attr('id') + '"]').addClass('active');
            }
            else if (scrollPos + window_height == doc_height) {
                if (!$('#main-menu a:last').hasClass('active')) {
                    $('#main-menu').find('a').removeClass('active');
                    $('#main-menu').find('a:last').addClass('active');
                }
            }
        });
    }

    $("a[data-role='smoothscroll']").click(function(e) {
        e.preventDefault();
        
        var position = $($(this).attr("href")).offset().top - nav_height;

        $("body, html").animate({
            scrollTop: position
        }, 1000 );
        return false;
    });
  
});

(function($) {
    $('#btn-maps').click(function(e) {
        e.preventDefault();
        var win = $('.contact-window');
        var mPos = win.offset().left;

        win.css({
            position: 'absolute',
            left: mPos + 'px'
        });
        
        $(this).parent().fadeOut();
        var dt = setTimeout(function() {
            win.removeAttr('style').addClass('full-mode').css({
                left: 0
            });
        }, 600);
        
        $('.btn-close').on('click', function() {
            win.removeClass('full-mode').css({position: 'absolute', left: mPos + 'px'});
            var lt = setTimeout(function() {
                win.removeAttr('style');
                $('.contact-content').fadeIn();
            }, 600);
        });
    });

    // Remove Loader
    $(window).on('load', function() {
        $('.loader-container').fadeOut();
    });

    // Back to top
    var backTop = $(".back-to-top");

    $(window).scroll(function() {
        if($(document).scrollTop() > 400) {
            backTop.css('visibility', 'visible');
        }
        else if($(document).scrollTop() < 400) {
            backTop.css('visibility', 'hidden');
        }
    });

    backTop.click(function() {
        $('html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    // Navigation Responsive 
    $('.nav-toggle').click(function() {
        $(this).toggleClass('active');
        $(this).next('.nav-menu').toggleClass('active').slideToggle('fast');
    });

    /*  Initiate Typed.js  */
    $("#typed").typed({
        // strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
        stringsElement: $('#typed-strings'),
        typeSpeed: 100,
        backDelay: 700,
        loop: true,
        contentType: 'html', // or text
        // defaults to false for infinite loop
        loopCount: Infinity
    });

    // Page animation
    wow = new WOW(
        {
        animateClass: 'animated',
        offset:       100,
        }
    );
    wow.init();

})(jQuery);
