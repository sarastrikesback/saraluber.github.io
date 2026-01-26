document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // Mobile nav toggle
  // ----------------------------
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  const closeNav = () => {
    if (!navToggle || !nav) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");
  };

  const openNav = () => {
    if (!navToggle || !nav) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");
  };

  if (navToggle && nav) {
    const mobileQuery = window.matchMedia("(max-width: 640px)");

    const syncNavState = () => {
      // On desktop, nav is always visible
      if (!mobileQuery.matches) {
        nav.removeAttribute("aria-hidden");
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        return;
      }

      // On mobile, reflect open/closed in aria-hidden
      const isOpen = nav.classList.contains("is-open");
      nav.setAttribute("aria-hidden", String(!isOpen));
    };

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      if (isOpen) closeNav();
      else openNav();
    });

    // Close when clicking outside the nav (mobile only)
    document.addEventListener("click", (e) => {
      if (!mobileQuery.matches) return;
      if (!nav.classList.contains("is-open")) return;
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const clickedInside = nav.contains(target) || navToggle.contains(target);
      if (!clickedInside) closeNav();
    });

    // Close menu after clicking a link (mobile only)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileQuery.matches) closeNav();
      });
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    mobileQuery.addEventListener("change", syncNavState);
    syncNavState();
  }

  // ----------------------------
  // Tabs (optional)
  // Requires: .tab-link[data-tab="sectionId"] and .tab-section#sectionId
  // ----------------------------
  const tabs = document.querySelectorAll(".tab-link");
  const sections = document.querySelectorAll(".tab-section");

  if (tabs.length && sections.length) {
    sections.forEach((section) => section.classList.remove("active"));

    // Default: first tab’s target (or first section)
    const firstTabTarget = tabs[0]?.getAttribute("data-tab");
    const defaultSection =
      (firstTabTarget && document.getElementById(firstTabTarget)) || sections[0];

    if (defaultSection) defaultSection.classList.add("active");

    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        const targetTab = tab.getAttribute("data-tab");
        if (!targetTab) return;

        sections.forEach((section) => section.classList.remove("active"));
        const targetSection = document.getElementById(targetTab);
        if (targetSection) targetSection.classList.add("active");
      });
    });
  }

  // ----------------------------
  // Focus panels (optional)
  // Requires: .focus-toggle[data-focus="panelId"] and .focus-panel#panelId
  // ----------------------------
  const focusToggles = document.querySelectorAll(".focus-toggle");
  const focusPanels = document.querySelectorAll(".focus-panel");

  if (focusToggles.length && focusPanels.length) {
    const activatePanel = (targetId, trigger) => {
      focusToggles.forEach((btn) => {
        const isActive = btn === trigger;
        btn.setAttribute("aria-selected", String(isActive));
        btn.classList.toggle("is-active", isActive);
      });

      focusPanels.forEach((panel) => {
        const isMatch = panel.id === targetId;
        panel.classList.toggle("is-active", isMatch);
        panel.toggleAttribute("hidden", !isMatch);

        if (isMatch) {
          panel.setAttribute("tabindex", "0");
        } else {
          panel.removeAttribute("tabindex");
        }
      });
    };

    focusToggles.forEach((toggle) => {
      const handler = () => {
        const targetId = toggle.getAttribute("data-focus");
        if (targetId) activatePanel(targetId, toggle);
      };

      toggle.addEventListener("click", handler);
      toggle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handler();
        }
      });
    });
  }

  // ----------------------------
  // Reveal on scroll (for [data-animate])
  // ----------------------------
  const animatedItems = document.querySelectorAll("[data-animate]");
  if (animatedItems.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      animatedItems.forEach((item) => observer.observe(item));
    } else {
      animatedItems.forEach((item) => item.classList.add("is-visible"));
    }
  }

  // ----------------------------
  // Contact form (optional)
  // Requires: <form id="contact-form" action="https://..."> + .success-message/.error-message
  // ----------------------------
  const form = document.getElementById("contact-form");
  const successMessage = document.querySelector(".success-message");
  let errorMessage = document.querySelector(".error-message");

  if (form) {
    if (!errorMessage) {
      errorMessage = document.createElement("p");
      errorMessage.className = "error-message";
      errorMessage.style.display = "none";
      errorMessage.textContent =
        "There was an error sending your message. Please try again.";
      form.appendChild(errorMessage);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const action = form.getAttribute("action");
      if (!action) {
        errorMessage.style.display = "block";
        if (successMessage) successMessage.style.display = "none";
        return;
      }

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
            if (successMessage) successMessage.style.display = "block";
            if (errorMessage) errorMessage.style.display = "none";
          } else {
            if (errorMessage) errorMessage.style.display = "block";
            if (successMessage) successMessage.style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error!", error);
          if (errorMessage) errorMessage.style.display = "block";
          if (successMessage) successMessage.style.display = "none";
        });
    });
  }
});
