/* ============================================
   MEHENDI ARTIST — Luxury Brand Website
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navOverlay = document.getElementById('navOverlay');

  if (hamburger && nav && navOverlay) {
    function openNav() {
      hamburger.classList.add('hamburger--active');
      nav.classList.add('nav--open');
      navOverlay.classList.add('nav-overlay--visible');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      hamburger.classList.remove('hamburger--active');
      nav.classList.remove('nav--open');
      navOverlay.classList.remove('nav-overlay--visible');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (nav.classList.contains('nav--open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    navOverlay.addEventListener('click', closeNav);

    // Close on nav link click
    document.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        closeNav();
      }
    });
  }

  // ==========================================
  // ACTIVE NAV LINK
  // ==========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('nav__link--active');
    }
  });

  // ==========================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ==========================================
  const animateElements = document.querySelectorAll('.animate');

  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    animateElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all animated elements immediately
    animateElements.forEach(function (el) {
      el.classList.add('animate--visible');
    });
  }

  // ==========================================
  // GALLERY FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.gallery-filters__btn');
  const galleryItems = document.querySelectorAll('.gallery-grid__item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('gallery-filters__btn--active'); });
        btn.classList.add('gallery-filters__btn--active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          const categories = item.getAttribute('data-category');

          if (filter === '*' || categories.includes(filter)) {
            item.style.display = 'block';
            item.style.opacity = '0';
            setTimeout(function () {
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================
  // LIGHTBOX
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxClose) {
    // Open lightbox
    document.querySelectorAll('.gallery-grid__item, .js-lightbox').forEach(function (item) {
      item.addEventListener('click', function () {
        const img = this.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('lightbox--open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('lightbox--open')) {
        closeLightbox();
      }
    });
  }

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ==========================================
  // FOOTER ACCORDION (mobile)
  // ==========================================
  var accordionBtns = document.querySelectorAll('.footer__accordion-btn');
  if (accordionBtns.length > 0) {
    accordionBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var content = this.nextElementSibling;
        var isOpen = content.classList.contains('footer__accordion-content--open');

        // Close all accordion sections
        accordionBtns.forEach(function (b) {
          b.classList.remove('footer__accordion-btn--open');
          b.nextElementSibling.classList.remove('footer__accordion-content--open');
        });

        // Toggle current
        if (!isOpen) {
          this.classList.add('footer__accordion-btn--open');
          content.classList.add('footer__accordion-content--open');
        }
      });
    });
  }

});
