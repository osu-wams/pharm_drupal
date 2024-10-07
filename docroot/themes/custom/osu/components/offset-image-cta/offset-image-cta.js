/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.offsetImageCta = {
    calculateOffsetImageCta: (element) => {
      // calculate height of texts and offset image that much
      let ctaHeight = element.querySelector('.offset-image-cta__content').offsetHeight;
      let textHeight = element.querySelector('.offset-image-cta__text').offsetHeight;
      let buttonHeight = element.querySelector('.offset-image-cta__link').offsetHeight;
      let offset = 40;
      if (window.innerWidth > 767) {
        offset = 70;
      }
      let totalHeight = ctaHeight - textHeight - buttonHeight - offset;
      element.querySelector('.offset-image-cta__content').style.transform = `translateY(-${totalHeight}px)`;
    },
    attach: function (context) {
      once('offset-image', '.offset-image-cta', context).forEach(function (element) {
        Drupal.behaviors.offsetImageCta.calculateOffsetImageCta(element);

        window.addEventListener('resize', function () {
          Drupal.behaviors.offsetImageCta.calculateOffsetImageCta(element);
        });
      });
    }
  };

})(Drupal, once);
