/* route-c.js — breath-paced reveal. Progressive enhancement only:
   without JS, .breathe elements are revealed by the no-JS fallback below.
   Honors prefers-reduced-motion (handled in CSS). */
(function () {
  'use strict';
  var els = document.querySelectorAll('.breathe');
  if (!('IntersectionObserver' in window) || !els.length) {
    Array.prototype.forEach.call(els, function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  Array.prototype.forEach.call(els, function (el) { io.observe(el); });
})();
