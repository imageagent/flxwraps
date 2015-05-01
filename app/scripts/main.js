'use strict';

$(document).ready(function(){
  // Document Loaded

  // Unslider
  $(function() {
    $('.banner').unslider({
      dots: true,
      autoplay: false
    });
  });

  var unslider = $('.banner').unslider();
    
  $('.unslider-arrow').click(function() {
    event.preventDefault();
    var fn = this.className.split(' ')[1];
    
    //  Either do unslider.data('unslider').next() or .prev() depending on the className
    unslider.data('unslider')[fn]();
  });

  // SmoothScroll
  function smoothScroll(x) {
    $(x+' a[href*=#]').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  }

  var scrollItems = [
    '.nav',
    '.footer',
    '.about-content',
    '.contact-content'
  ];

  for ( var i = 0; i < scrollItems.length; i++ ) {
    smoothScroll(scrollItems[i]);
  }


  // Price Incrementer

  function increasePrice(tar, numEnd){
    $({someValue: 0.01}).animate({someValue: numEnd}, {
      duration: 1750,
      easing:'swing', // can be anything
      step: function() { // called on every step
        // Update the element's text with rounded-up value:
        $(tar).text('$' + Math.round((this.someValue)*100) / 100);
      }
    });
  }

  // Heat Gauges

  var $window = $(window);
  var winHeightPadded = $window.height() * 1.1;
  // var isTouch = Modernizr.touch;

  function scrollAction() {
    var scrolled = $window.scrollTop();
    $('.heat-gauge:not(.active)').each(function(){
      var $this = $(this);
      var offsetTop = $this.offset().top;

      if (scrolled + winHeightPadded > offsetTop) {
        if($this.data('timeout')) {
          window.setTimeout(function(){
            $this.addClass('active ' + $this.data('animation')),
            increasePrice('#hg-price-low', 0.77),
            increasePrice('#hg-price-med', 17.78),
            increasePrice('#hg-price-hi', 22.95);
          }, parseInt($this.data('timeout'),10));
        } else {
          $this.addClass('active ' + $this.data('animation')),
          increasePrice('#hg-price-low', 0.77),
          increasePrice('#hg-price-med', 17.78),
          increasePrice('#hg-price-hi', 22.95);
        }
      }
    });
  }

  $window.on('scroll', scrollAction);

});