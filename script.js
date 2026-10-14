
/* ========================================
   DAFA ALDIANSYAH — WEBSITE INTERACTIONS
   File: script.js
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // Theme elements
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");

  // Navigation elements
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");

  // Footer year
  const yearElement = document.getElementById("year");

  // Read saved theme; default to dark mode
  function getInitialTheme() {
    try {
      const savedTheme = localStorage.getItem("dafa-theme");

      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
    } catch (error) {
      // Storage may be unavailable in some browsers.
    }

    return "dark";
  }

  // Apply theme to the page
  function applyTheme(theme) {
    const isLight = theme === "light";

    root.dataset.theme = theme;

    if (themeIcon) {
      themeIcon.textContent = isLight ? "🌙" : "☀️";
    }

    if (themeLabel) {
      themeLabel.textContent = isLight ? "Dark Mode" : "Light Mode";
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-pressed",
        String(isLight)
      );

      themeToggle.setAttribute(
        "aria-label",
        isLight
          ? "Ganti ke tema gelap"
          : "Ganti ke tema terang"
      );
    }

    // Match browser theme-color to the selected theme
    const themeColor = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        isLight ? "#0a1b34" : "#08111f"
      );
    }
  }

  // Initialize theme
  applyTheme(getInitialTheme());

  // Toggle between dark and light
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme =
        root.dataset.theme === "light" ? "light" : "dark";

      const nextTheme =
        currentTheme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);

      try {
        localStorage.setItem("dafa-theme", nextTheme);
      } catch (error) {
        // Theme still works for the current page.
      }
    });
  }

  // Mobile navigation
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

    // Close menu after selecting a navigation link
    navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰ Menu";
      });
    });

    // Close mobile menu after changing theme
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 680px)").matches) {
          navLinks.classList.remove("open");

          menuButton.setAttribute("aria-expanded", "false");
          menuButton.textContent = "☰ Menu";
        }
      });
    }
  }

  // Automatic footer year
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Profile photo fallback
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

    if (profilePhoto.complete) {
      if (
        profilePhoto.naturalWidth > 0 &&
        profilePhoto.naturalHeight > 0
      ) {
        showPhoto();
      } else {
        showPlaceholder();
      }
    }
  }
});
