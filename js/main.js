/**
 * Traditional Website - Smooth Scrolling, Header Behavior & Mobile Menu
 */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
      }
    });
  }

  // --- Smooth scrolling for anchor links (only on same page) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Header scroll behavior ---
  const header = document.getElementById('site-header');
  
  if (header) {
    function handleScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }

  // --- Contact Form Handler ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // In a real application, you would send the form data to a server
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

})();
