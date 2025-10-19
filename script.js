document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (navToggle && nav) {
    const mobileQuery = window.matchMedia("(max-width: 980px)");

    const syncNavState = () => {
      const shouldHide = mobileQuery.matches && !nav.classList.contains("is-open");
      nav.setAttribute("aria-hidden", shouldHide ? "true" : "false");
      if (!mobileQuery.matches) {
        navToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    };

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      nav.setAttribute("aria-hidden", String(!isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
          nav.setAttribute("aria-hidden", "true");
        }
      });
    });

    mobileQuery.addEventListener("change", syncNavState);
    syncNavState();
  }

  const tabs = document.querySelectorAll(".tab-link");
  const sections = document.querySelectorAll(".tab-section");

  if (tabs.length && sections.length) {
    sections.forEach((section) => section.classList.remove("active"));
    const defaultSection = document.getElementById("about");
    if (defaultSection) defaultSection.classList.add("active");

    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        const targetTab = tab.getAttribute("data-tab");

        sections.forEach((section) => section.classList.remove("active"));
        const targetSection = document.getElementById(targetTab);
        if (targetSection) targetSection.classList.add("active");
      });
    });
  }

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
          panel.classList.add("is-visible");
        } else {
          panel.removeAttribute("tabindex");
        }
      });
    };

    focusToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const targetId = toggle.getAttribute("data-focus");
        if (targetId) activatePanel(targetId, toggle);
      });

      toggle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const targetId = toggle.getAttribute("data-focus");
          if (targetId) activatePanel(targetId, toggle);
        }
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const animatedItems = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    animatedItems.forEach((item) => observer.observe(item));
  } else {
    document
      .querySelectorAll("[data-animate]")
      .forEach((item) => item.classList.add("is-visible"));
  }

  const form = document.getElementById("contact-form");
  const successMessage = document.querySelector(".success-message");
  let errorMessage = document.querySelector(".error-message");

  // If errorMessage element doesn't exist, create it dynamically
  if (!errorMessage && form) {
    errorMessage = document.createElement("p");
    errorMessage.className = "error-message";
    errorMessage.style.display = "none";
    errorMessage.textContent =
      "There was an error sending your message. Please try again.";
    form.appendChild(errorMessage);
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
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
