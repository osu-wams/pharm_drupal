/* eslint-disable camelcase, no-undef, max-len */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.articleHeights = {
    resizeArticle: () => {
      if (window.innerWidth < 768) {
        return
      }

      let articles = document.querySelectorAll('.article');
      articles.forEach(article => {
        article.style.height = '100%';
        let articleHeight = article.offsetHeight - 40;
        article.style.height = articleHeight + 'px';
      });

    },
    attach: function (context) {
      once('articleHeight', '.article', context).forEach(function () {
        Drupal.behaviors.articleHeights.resizeArticle();
        window.addEventListener('resize', () => {
          Drupal.behaviors.articleHeights.resizeArticle();
        })
      });
    }
  };

})(Drupal, once);
