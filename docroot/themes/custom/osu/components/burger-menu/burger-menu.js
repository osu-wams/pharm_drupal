/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.burgerMenu = {
    attach: function (context) {
      once('burgerMenu', '.burger-menu', context).forEach(function (element) {
        let toggle = context.querySelector('#superfish-main-toggle');
        if (toggle) {
          toggle.click();
        }
        let menuButton = element.querySelector('.burger-menu__menu-trigger');
        menuButton.addEventListener('change', function () {
          let menuOpen = this.checked;
          if (menuOpen) {
            context.querySelector('.site-header__menus').classList.add('is-open');
          }
          else {
            context.querySelector('.site-header__menus').classList.remove('is-open');
          }
        });
      });
    }
  };

})(Drupal, once);
