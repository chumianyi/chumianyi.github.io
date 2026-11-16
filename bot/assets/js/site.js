(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var menuBtn = document.querySelector('.menu-btn');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('open') ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  function showAll() { reveals.forEach(function (el) { el.classList.add('in'); }); }
  if ('IntersectionObserver' in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px 15% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
    var checkReveal = function () {
      reveals.forEach(function (el) {
        if (el.classList.contains('in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 240 && r.bottom > -240) {
          el.classList.add('in');
          ro.unobserve(el);
        }
      });
    };
    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('resize', checkReveal);
    checkReveal();
    setTimeout(showAll, 3000);
  } else {
    showAll();
  }

  var navLinks = document.querySelectorAll('.nav-links a[data-section]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var sections = [];
    navLinks.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('data-section'));
      if (el) sections.push({ id: a.getAttribute('data-section'), el: el });
    });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('data-section') === e.target.id);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (s) { so.observe(s.el); });
  }

  var tocLinks = document.querySelectorAll('.toc a');
  if ('IntersectionObserver' in window && tocLinks.length) {
    var targets = [];
    tocLinks.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      var el = document.querySelector(href);
      if (el) targets.push({ link: a, el: el });
    });
    var to = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('active'); });
        targets.forEach(function (t) { if (t.el === e.target) t.link.classList.add('active'); });
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    targets.forEach(function (t) { to.observe(t.el); });
  }

  var shots = [
    { src: 'assets/img/preview-login.webp', label: '令牌登录 · 128 位访问令牌' },
    { src: 'assets/img/preview-dashboard.webp', label: '概览 · 运行状态与实时指标' },
    { src: 'assets/img/preview-model.webp', label: '模型 · OpenAI 兼容接口与人设' },
    { src: 'assets/img/preview-plugins.webp', label: '插件 · 上传、启停与休眠管理' },
    { src: 'assets/img/preview-docs.webp', label: '开发文档 · 插件规范与接入说明' }
  ];
  var tabs = document.querySelectorAll('.tab');
  var shotImg = document.getElementById('shotImg');
  var shotCaption = document.getElementById('shotCaption');
  var shot = document.getElementById('shot');
  var current = 0;

  function setShot(i) {
    current = (i + shots.length) % shots.length;
    if (shotImg) {
      shotImg.style.opacity = '0';
      var img = new Image();
      img.onload = function () {
        shotImg.src = shots[current].src;
        shotImg.style.opacity = '1';
      };
      img.src = shots[current].src;
    }
    if (shotCaption) shotCaption.textContent = shots[current].label;
    tabs.forEach(function (t) { t.classList.toggle('active', Number(t.getAttribute('data-index')) === current); });
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { setShot(Number(t.getAttribute('data-index'))); });
  });

  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbLabel = document.getElementById('lbLabel');
  function openLb(i) {
    if (!lb) return;
    current = (i + shots.length) % shots.length;
    lbImg.src = shots[current].src;
    lbImg.alt = shots[current].label;
    lbLabel.textContent = (current + 1) + ' / ' + shots.length + ' · ' + shots[current].label;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (shot) shot.addEventListener('click', function () { openLb(current); });
  var lbClose = document.querySelector('.lb-close');
  var lbPrev = document.querySelector('.lb-prev');
  var lbNext = document.querySelector('.lb-next');
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lbPrev) lbPrev.addEventListener('click', function (e) { e.stopPropagation(); openLb(current - 1); });
  if (lbNext) lbNext.addEventListener('click', function (e) { e.stopPropagation(); openLb(current + 1); });
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') openLb(current - 1);
    if (e.key === 'ArrowRight') openLb(current + 1);
  });

  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('.codebox');
      var pre = box ? box.querySelector('pre') : null;
      if (!pre) return;
      var text = pre.innerText;
      var done = function () {
        var old = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg> 已复制';
        setTimeout(function () { btn.innerHTML = old; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
      } else {
        fallback(text, done);
      }
    });
  });
  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(ta);
  }

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
