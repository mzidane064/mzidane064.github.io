(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER + SCROLL PROGRESS
    ========================== */
    const header = $("#siteHeader");
    const progress = $("#scrollProgress");
    const backTop = $("#backTop");

    const updateScrollUI = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = total > 0 ? (scrollTop / total) * 100 : 0;

      progress.style.width = `${percentage}%`;

      if (header) {
        header.classList.toggle("scrolled", scrollTop > 30);
      }

      if (backTop) {
        backTop.classList.toggle("show", scrollTop > 650);
      }
    };

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    /* =========================
       MOBILE NAVIGATION
    ========================== */
    const navToggle = $("#navToggle");
    const navMenu = $("#navMenu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
      });

      $$(".nav-link", navMenu).forEach(link => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* =========================
       DARK / LIGHT MODE
    ========================== */
    const themeToggle = $("#themeToggle");
    const themeIcon = $("#themeIcon");

    const applyTheme = (theme) => {
      document.body.classList.toggle("dark", theme === "dark");
      if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀" : "☾";
      if (themeToggle) {
        themeToggle.setAttribute(
          "aria-label",
          theme === "dark" ? "Gunakan mode terang" : "Gunakan mode gelap"
        );
      }
    };

    const savedTheme = localStorage.getItem("mz-theme") || "light";
    applyTheme(savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const next = document.body.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem("mz-theme", next);
        applyTheme(next);
      });
    }

    /* =========================
       ACTIVE NAVIGATION
    ========================== */
    const navLinks = $$(".nav-link");
    const sections = $$("main section[id]");

    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(section => navObserver.observe(section));

    /* =========================
       REVEAL ANIMATION
    ========================== */
    const revealItems = $$(".reveal");

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );

      revealItems.forEach(item => revealObserver.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add("visible"));
    }

    /* =========================
       PROJECT FILTER
    ========================== */
    const filterButtons = $$(".filter-btn");
    const projectCards = $$(".project-card");

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        projectCards.forEach(card => {
          const categories = (card.dataset.category || "").split(" ");
          const show = filter === "all" || categories.includes(filter);
          card.classList.toggle("is-hidden", !show);
        });
      });
    });

    /* =========================
       TRANSCRIPT SEMESTER FILTER
    ========================== */
    const semesterTabs = $$(".semester-tab");
    const transcriptRows = $$(".transcript-table tbody tr");

    semesterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const semester = tab.dataset.semester;

        semesterTabs.forEach(item => item.classList.remove("active"));
        tab.classList.add("active");

        transcriptRows.forEach(row => {
          const rowSemester = row.dataset.semester;
          row.style.display =
            semester === "all" || rowSemester === semester ? "" : "none";
        });
      });
    });

    /* =========================
       LIGHTBOX FOR DOCUMENTATION
    ========================== */
    const lightbox = $("#lightbox");
    const lightboxImage = $("#lightboxImage");
    const lightboxCaption = $("#lightboxCaption");
    const lightboxClose = $("#lightboxClose");

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    $$(".doc-image img").forEach(img => {
      img.style.cursor = "zoom-in";

      img.addEventListener("click", () => {
        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || "";
        if (lightboxCaption) lightboxCaption.textContent = img.alt || "";

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
      lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
      });
    }

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeLightbox();
    });

    /* =========================
       BACK TO TOP
    ========================== */
    if (backTop) {
      backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* =========================
       SMOOTH ANCHOR OFFSET
    ========================== */
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", event => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;

        const target = document.querySelector(id);
        if (!target) return;

        event.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          12;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth"
        });
      });
    });

    /* =========================
       CURRENT YEAR
    ========================== */
    const currentYear = $("#currentYear");
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }

    /* =========================
       BROKEN IMAGE SAFETY
       Prevent ugly broken-image icons if a future
       documentation file is removed/renamed.
    ========================== */
    $$(".doc-image img, .portrait-frame img").forEach(img => {
      img.addEventListener("error", () => {
        img.style.display = "none";
        const parent = img.parentElement;

        if (parent && !parent.querySelector(".image-error")) {
          const message = document.createElement("div");
          message.className = "image-error";
          message.textContent = "Dokumentasi belum tersedia";
          message.style.cssText = `
            min-height:100%;
            display:grid;
            place-items:center;
            padding:30px;
            text-align:center;
            color:#788797;
            font:500 .68rem "DM Mono",monospace;
            background:#e7edf1;
          `;
          parent.appendChild(message);
        }
      });
    });

  });
})();
