/* ===============================
   Abdulhannan Portfolio JS
   =============================== */

(function () {

  /* ===== Footer Year ===== */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===== Theme Toggle (Dark / Light) ===== */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      root.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  /* ===== Mobile Menu Toggle ===== */
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.style.display === "block";
      mobileMenu.style.display = isOpen ? "none" : "block";
      mobileMenu.setAttribute("aria-hidden", isOpen ? "true" : "false");
    });

    // Close menu when link clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  /* ===== Reveal on Scroll Animation ===== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ===== Accordion (Modules Page) ===== */
  document.querySelectorAll(".accordion__btn").forEach(button => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!expanded));

      if (panel) {
        panel.classList.toggle("is-open");
        const icon = button.querySelector("span");
        if (icon) {
          icon.textContent = panel.classList.contains("is-open") ? "−" : "+";
        }
      }
    });
  });

  /* ===== Module Filter Buttons ===== */
  const filterButtons = document.querySelectorAll(".filterBtn");
  const moduleCards = document.querySelectorAll(".moduleCard");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      const filter = button.dataset.filter;

      moduleCards.forEach(card => {
        const tags = card.dataset.tags || "";
        if (filter === "all" || tags.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

})();
