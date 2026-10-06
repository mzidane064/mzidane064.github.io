/* =====================================================
   MUHAMMAD ZIDANE
   ACADEMIC PORTFOLIO
===================================================== */


/* =====================================================
   ELEMENT REFERENCES
===================================================== */

const navbar =
    document.getElementById("navbar");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const themeToggle =
    document.getElementById("themeToggle");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const currentYear =
    document.getElementById("currentYear");


/* =====================================================
   IMAGE ERROR HANDLER
===================================================== */

function handleImageError(image) {

    const parent =
        image.parentElement;

    image.style.display = "none";

    if (parent) {

        parent.classList.add(
            "image-placeholder"
        );

    }
}


/* =====================================================
   NAVBAR SCROLL
===================================================== */

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }
}

window.addEventListener(
    "scroll",
    updateNavbar
);

updateNavbar();


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle(
                    "active"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

}


/* =====================================================
   DARK MODE
===================================================== */

if (themeToggle) {

    const savedTheme =
        localStorage.getItem(
            "mz-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );

        themeToggle.textContent = "☀";

    } else {

        themeToggle.textContent = "◐";

    }


    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "mz-theme",
                isDark
                    ? "dark"
                    : "light"
            );


            themeToggle.textContent =
                isDark
                    ? "☀"
                    : "◐";

        }
    );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.1
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =====================================================
   LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img"
    );


function openLightbox(image) {

    if (
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt;


    lightbox.classList.add(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


galleryImages.forEach(
    image => {

        image.addEventListener(
            "click",
            () => {

                if (
                    image.style.display ===
                    "none"
                ) {
                    return;
                }

                openLightbox(
                    image
                );

            }
        );

    }
);


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);


/* =====================================================
   CURRENT YEAR
===================================================== */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   SMOOTH ANCHOR OFFSET
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        anchor => {

            anchor.addEventListener(
                "click",
                function(event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


/* =====================================================
   PREVENT BROKEN PLACEHOLDER LINKS
===================================================== */

document
    .querySelectorAll(
        'a[href="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                }
            );

        }
    );


/* =====================================================
   PAGE READY
===================================================== */

document.body.classList.add(
    "js-ready"
);
