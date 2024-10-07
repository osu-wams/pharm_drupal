/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.headerVideo = {
    attach: function (context) {
      once('videoPlayPause', '.component.header.has-video', context).forEach(function (element) {
        let video = element.querySelector('video');
        let playButton = element.querySelector('.header__video-play');
        let pauseButton = element.querySelector('.header__video-pause');

        if (video && playButton) {
          playButton.addEventListener('click', () => {
            let video = document.querySelector('video');
            video.play();
            let header = document.querySelector('.component.header.has-video');
            if (header) {
              header.classList.add('playing')
              header.classList.remove('paused');
            }
          });
        }
        if (video && pauseButton) {
          pauseButton.addEventListener('click', () => {
            let video = document.querySelector('video');
            video.pause();
            let header = document.querySelector('.component.header.has-video');
            if (header) {
              header.classList.add('paused')
              header.classList.remove('playing');
            }
          });
        }
      });
    }
  };

  Drupal.behaviors.headerCTA = {
    attach: function () {
      let cta = document.querySelector('.header__cta-wrapper');
      if (cta && window.innerWidth > 1024 && window.innerWidth < 1500) {
        let headerText = document.querySelector('.header__text');
        headerText.style.maxWidth = '58%';
      }
    }
  };

})(Drupal, once);
