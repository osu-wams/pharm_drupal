/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.toggleDirectory = {
    attach: function (context) {
      once('toggleDirectory', '.directory', context).forEach(function (element) {
        if (!element || window.innerWidth > 768) {
          return;
        }

        let toggleDirectoryButton = element.querySelector('.toggle-directory__button');
        let directoryContactWrapper = element.querySelector('.directory__contact-wrapper');
        let directoryResearchWrapper = element.querySelector('.directory__research-wrapper');
        toggleDirectoryButton.addEventListener('click', function (e) {
          e.preventDefault();
          toggleDirectoryButton.classList.toggle('expanded');
          directoryContactWrapper.classList.toggle('expanded');
          directoryResearchWrapper.classList.toggle('expanded');
          if (toggleDirectoryButton.classList.contains('expanded')) {
            directoryContactWrapper.style.height = directoryContactWrapper.scrollHeight + 'px';
            directoryResearchWrapper.style.height = directoryResearchWrapper.scrollHeight + 'px';
          }
          else {
            directoryContactWrapper.style.height = '1px';
            directoryResearchWrapper.style.height = '1px';
          }
        });
      });
    }
  };

})(Drupal, once);