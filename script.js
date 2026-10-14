
/* ==========================================
   DAFA ALDIANSYAH — WEBSITE INTERACTIONS
   File: script.js
========================================== */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // 1. MOBILE NAVIGATION
  // ========================================

  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!menuButton || !navLinks) return;

    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰ Menu";
  }

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.textContent = isOpen
        ? "✕ Tutup"
        : "☰ Menu";
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when switching back to desktop layout
    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }

  // ========================================
  // 2. TYPING EFFECT
  // Uses the existing hero introduction paragraph
  // No HTML changes required
  // ========================================

  const introText = document.querySelector(".hero-copy > p");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (introText && !prefersReducedMotion) {
    const originalText = introText.textContent.trim();

    if (originalText.length > 0) {
      // Preserve the complete text for assistive technology
      introText.setAttribute("aria-label", originalText);
      introText.setAttribute("aria-busy", "true");
      introText.classList.add("typing-active");
      introText.textContent = "";

      let index = 0;
      const typingSpeed = 32;

      function typeNextCharacter() {
        if (index < originalText.length) {
          introText.textContent += originalText.charAt(index);
          index++;

          window.setTimeout(
            typeNextCharacter,
            typingSpeed
          );
        } else {
          introText.classList.remove("typing-active");
          introText.setAttribute("aria-busy", "false");
        }
      }

      // Start typing shortly after the page loads
      window.setTimeout(typeNextCharacter, 450);
    }
  }

  // ========================================
  // 3. SCROLL REVEAL ANIMATION
  // Automatically adds classes to existing elements
  // ========================================

  const revealSelectors = [
    ".stats-grid",
    ".stat",
    ".section-head",
    ".feature-panel",
    ".about-copy",
    ".exp-card",
    ".project",
    ".info-card",
    ".small-note",
    ".contact-link",
    ".contact-panel"
  ];

  const revealElements = document.querySelectorAll(
    revealSelectors.join(",")
  );

  // Accessibility: show everything without animation
  // if the visitor prefers reduced motion.
  if (prefersReducedMotion) {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Animate each element only once
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // ========================================
  // 4. AUTOMATIC FOOTER YEAR
  // ========================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================
  // 5. PROFILE PHOTO FALLBACK
  // ========================================

  const profilePhoto = document.getElementById("profilePhoto");
  const photoPlaceholder = document.getElementById(
    "photoPlaceholder"
  );

  if (profilePhoto && photoPlaceholder) {
    function showPlaceholder() {
      profilePhoto.style.display = "none";
      photoPlaceholder.style.display = "grid";
    }

    function showPhoto() {
      profilePhoto.style.display = "block";
      photoPlaceholder.style.display = "none";
    }

    profilePhoto.addEventListener("load", showPhoto);
    profilePhoto.addEventListener("error", showPlaceholder);

    // Handle images that loaded before the script ran
    if (profilePhoto.complete) {
      if (profilePhoto.naturalWidth > 0) {
        showPhoto();
      } else {
        showPlaceholder();
      }
    }
  }
});
