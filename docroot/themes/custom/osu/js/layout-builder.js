/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.isIos = {
    isIos: function () {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
  };

  Drupal.behaviors.breakOut = {
    calculateBreakOut: function (element) {
      let container = element.closest('.container-wrapper');
      let containerPaddingLeft = window.getComputedStyle(container).paddingLeft;
      let containerPaddingRight = window.getComputedStyle(container).paddingRight;
      let paddingLeft = parseInt(containerPaddingLeft, 10);
      let paddingRight = parseInt(containerPaddingRight, 10);

      let layout = element.closest('.layout-builder__layout');
      let layoutPaddingLeft = window.getComputedStyle(layout).paddingLeft;
      let layoutPaddingRight = window.getComputedStyle(layout).paddingRight;
      let layoutLeft = parseInt(layoutPaddingLeft, 10);
      let layoutRight = parseInt(layoutPaddingRight, 10);

      let overflowWidth = 32;
      if (window.innerWidth < 900) {
        overflowWidth = 20;
      }
      if (window.innerWidth < 600) {
        overflowWidth = 0;
      }

      // If iOS device, remove 15px to the overflowWidth.
      if (Drupal.behaviors.isIos.isIos()) {
        overflowWidth = overflowWidth - 10;
      }
      let totalPaddingLeft = paddingLeft + layoutLeft + overflowWidth;
      let totalPaddingRight = paddingRight + layoutRight + overflowWidth;

      element.style.marginLeft = '-' + totalPaddingLeft + 'px';
      element.style.marginRight = '-' + totalPaddingRight + 'px';
    },
    attach: function (context) {
      once('breakOut', '.breakout', context).forEach(function (element) {
        Drupal.behaviors.breakOut.calculateBreakOut(element);

        window.addEventListener('resize', function () {
          Drupal.behaviors.breakOut.calculateBreakOut(element);
        });
      });
    }
  };

  /**
   * Make elements in different layout builder columns the same height.
   */
  Drupal.behaviors.matchHeight = {
    matchHeight: () => {
      let containers = Array.from(document.getElementsByClassName('match-heights'));
      let heights = [];
      containers.forEach(container => {
        heights.push(container.clientHeight);
      });
      let minHeight = Math.max(...heights) + 5;
      containers.forEach(container => {
        container.style.height = minHeight + 'px';
      });
    },
    attach: (context) => {
      if (window.innerWidth > 767) {
        once('matchHeight', '.match-heights', context).forEach(function () {
          Drupal.behaviors.matchHeight.matchHeight();
        });

        window.addEventListener('resize', () => {
          Drupal.behaviors.matchHeight.matchHeight();
        });
      }
    }
  };

  /**
   * Make titles in different layout builder columns the same height regardless of text wrapping.
   */
  Drupal.behaviors.matchTitleHeight = {
    matchTitleHeight: () => {
      let containers = Array.from(document.getElementsByClassName('gray-box-button__content__title'));
      let heights = [];
      containers.forEach(container => {
        heights.push(container.clientHeight);
      });
      let minHeight = Math.max(...heights) + 5;
      containers.forEach(container => {
        container.style.height = minHeight + 'px';
      });
    },
    attach: (context) => {
      if (window.innerWidth > 767) {
        once('matchTitleHeight', '.gray-box-button__content__title', context).forEach(function () {
          Drupal.behaviors.matchTitleHeight.matchTitleHeight();
        });
      }
    }
  };

  /**
   * Make labels for responsive columns in Layout Builder update when click.
   */
  Drupal.behaviors.layoutResponsiveButtons = {
    attach: function (context) {
      once('layoutResponsive', '.blb_breakpoint_cols .glb-form-radios', context).forEach(function (element) {
        element.addEventListener('click', function (event) {
          if (event.target.tagName === 'LABEL') {
            let inputs = event.target.parentElement.querySelectorAll('input');
            inputs.forEach(input => {
              input.checked = false;
            });
            let input = event.target.previousElementSibling;
            input.checked = true;
          }
        });
      });
    }
  };

  /**
   * If page was built with Layout Builder, and they didn't add padding classes add it for them.
   */
  Drupal.behaviors.textTouchingEdge = {
    textTouchingEdge: (element) => {
      function isTextTouchingLeftEdge(element) {
        const rect = element.getBoundingClientRect();
        const touchingLeftEdge = rect.left <= 0;
        return touchingLeftEdge;
      }
      function isTextTouchingRightEdge(element) {
        const rect = element.getBoundingClientRect();
        const touchingRightEdge = rect.right >= window.innerWidth;
        return touchingRightEdge;
      }

      if (isTextTouchingLeftEdge(element)) {
        element.classList.add('padding-left-one');
        if (element.classList.contains('padding-zero-important')) {
          element.querySelector('.field--name-body').classList.add('padding-horizontal-one-important');
        }
      }
      if (isTextTouchingRightEdge(element)) {
        element.classList.add('padding-right-one');
        if (element.classList.contains('padding-zero-important')) {
          element.querySelector('.field--name-body').classList.add('padding-horizontal-one-important');
        }
      }
    },
    attach: function (context) {
      once('checkTextTouchingEdge', '.block-inline-blockbasic', context).forEach(function (element) {
        Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);

        window.addEventListener('resize', function () {
          Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);
        });
      });
      once('checkPhotoLeftTextTouchingEdge', '.photo-left-text', context).forEach(function (element) {
        Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);

        window.addEventListener('resize', function () {
          Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);
        });
      });
      once('checkbodyTouchingEdge', '.field--name-body', context).forEach(function (element) {
        Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);

        window.addEventListener('resize', function () {
          Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);
        });
      });
      once('checkbodyTouchingEdge', '.stats', context).forEach(function (element) {
        Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);

        window.addEventListener('resize', function () {
          Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);
        });
      });
      once('checkSidebarTouchingEdge', '.region-sidebar-first', context).forEach(function (element) {
        Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);

        window.addEventListener('resize', function () {
          Drupal.behaviors.textTouchingEdge.textTouchingEdge(element);
        });
      });

    }
  };

  /**
   * Wrap the last word in a tertiary link with a span to attach icon there.
   */
  Drupal.behaviors.tertiaryIconNoWrap = {
    tertiaryIconNoWrap: () => {
      let links = Array.from(document.getElementsByClassName('tertiary'));
      links.forEach(link => {
        link.innerText = link.innerText.trim();
        let words = link.innerText.split(' ');
        let lastWord = words.pop();
        words.push('<span class="icon-nowrap">' + lastWord + '</span>');
        link.innerHTML = words.join(' ');
      })

    },
    attach: () => {
      Drupal.behaviors.tertiaryIconNoWrap.tertiaryIconNoWrap();
    }
  };

  /**
   * Hide duplicate breadcrumbs.
   */
  Drupal.behaviors.hideDuplicateBreadcrumbs = {
    hideDuplicateBreadcrumbs: () => {
      let breadcrumbs = Array.from(document.querySelectorAll('.breadcrumb__inner a'));
      breadcrumbs.forEach(crumb => {
        // Check if the last element of the path is "/search" and hide it if it does.
        let finalPath = crumb.getAttribute('href').split('/').pop();
        if (finalPath === 'search') {
          crumb.parentNode.style.display = 'none';
        }
      });
    },
    attach: () => {
      Drupal.behaviors.hideDuplicateBreadcrumbs.hideDuplicateBreadcrumbs();
    }
  };

})(Drupal, once);
