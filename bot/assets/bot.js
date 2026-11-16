/* YueWuBot · 官方机器人官网交互（纯前端，无网络请求） */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");

  function onScroll() {
    if (nav) nav.classList.toggle("solid", window.scrollY > 10);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

})();
