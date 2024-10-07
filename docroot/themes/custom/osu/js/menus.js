/* eslint-disable require-jsdoc */
!((document) => {
'use strict';

      const stickySidebar = () => {
            var sidebar = document.querySelector('.region-sidebar-first .stickit');
            let content = document.querySelector('.has-sidebar-first');
            if (sidebar && window.innerWidth > 1024) {
                  var stickyStart = sidebar.offsetTop - 40;
                  let stickyStop = document.querySelector('.site-footer').offsetTop - sidebar.offsetHeight - 40;
                  let main = document.querySelector('.has-sidebar');
                  window.onscroll = function() {
                        if (window.scrollY > stickyStart && window.scrollY < stickyStop) {
                              sidebar.classList.add('sticky');
                              content.classList.add('sticky-sidebar');
                        }
                        else {
                              sidebar.classList.remove('sticky');
                              content.classList.remove('sticky-sidebar');
                        }

                        if (window.scrollY > stickyStop) {
                              main.style.alignItems = 'flex-end';
                        }
                        else {
                              main.style.alignItems = 'flex-start';
                        }
                  };
            } else if (sidebar && window.innerWidth <= 1024) {
                  sidebar.classList.remove('sticky');
                  content.classList.remove('sticky-sidebar');
            }

            // Link to the News filters from an individual news article.
            let path = window.location.pathname.split('/')[1];
            if (document.querySelector('.views-exposed-form') && path === 'news') {
                  let $links = document.querySelectorAll('#edit-category-id a');
                  $links.forEach((link) => {
                        let param = link.name.split('[').pop().split(']')[0];
                        link.href = '/beaverxnews?category_id=' + param;
                  });
            }

            if (document.querySelector('.views-exposed-form') && path === 'events') {
                  let $links = document.querySelectorAll('#edit-event-type-id a');
                  $links.forEach((link) => {
                        let param = link.name.split('[').pop().split(']')[0];
                        let newLink = document.createElement('a');
                        newLink.href = '/events?event_type_id=' + param;
                        newLink.innerHTML = link.innerHTML;
                        link.parentNode.appendChild(newLink);
                        link.parentNode.removeChild(link);
                  });
            }
      }

      window.onresize = stickySidebar;
      window.onload = stickySidebar;

})(document);
