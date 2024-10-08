/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.fourColumnCardBackground = {
    attach: function (context) {
      once('fourColumnCardBackground', '.four-column-card-background__cards', context).forEach(function (element) {
        element.querySelector('.text-overlay-teaser').classList.add('is-active');
        let teasers = element.querySelectorAll('.text-overlay-teaser');
        teasers.forEach(function (el, i) {
          let teaser = el;
          teaser.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
              return;
            }
            e.preventDefault();
            element.querySelectorAll('.is-active').forEach(function (el) {
              el.classList.remove('is-active');
            });
            this.classList.add('is-active');
          });
          if (i === 0) {
            teaser.classList.add('is-active');
          }
        });
      });
    }
  };

})(Drupal, once);
