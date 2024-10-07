/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once, $) {
  'use strict';

  Drupal.behaviors.newsSlider = {
    initializeSlick: function (element) {
      if ($(window).width() < 1025) {
        if (!$(element).hasClass('slick-initialized')) {
          $(element).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            arrows: false,
            adaptiveHeight: true
          });
        }
      }
      else if ($(element).hasClass('slick-initialized')) {
        $(element).slick('unslick');
      }
    },
    attach: function (context) {
      once('newsSlider', '.view-latest-news .view-content', context).forEach(function (element) {
        $(window).on('resize', function () {
          Drupal.behaviors.newsSlider.initializeSlick(element);
        });
        Drupal.behaviors.newsSlider.initializeSlick(element);
      });
    }
  };

})(Drupal, once, jQuery);
