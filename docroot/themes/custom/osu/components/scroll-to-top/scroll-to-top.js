/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.scrollToTop = {
    attach: function (context) {
      once('scrollToTop', '.scroll-to-top', context).forEach(function (element) {
        let scrollToTopButton = element.querySelector('.scroll-to-top__button');
        scrollToTopButton.addEventListener('click', function (e) {
          e.preventDefault();
          window.scrollTo({top: 0, behavior: 'smooth'});
        });
      });
    }
  };

})(Drupal, once);
