// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", () => {
    const tabs = [...document.querySelectorAll(".nav-tab")];
    const panels = [...document.querySelectorAll(".tab-page, .front-page")];

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    let activeTab = "front-page";
    let isAnimating = false;

    const hasGSAP = typeof gsap !== "undefined";

    // -------------------------------------
    // INITIAL STATE
    // -------------------------------------

    function initializeTabs() {
        panels.forEach((panel) => {
            const isActive = panel.id === activeTab;

            panel.hidden = !isActive;
            panel.setAttribute("aria-hidden", String(!isActive));
        });

        tabs.forEach((tab) => {
            const isActive = tab.dataset.tab === activeTab;

            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
            tab.tabIndex = isActive ? 0 : -1;
        });

        if (hasGSAP && !prefersReducedMotion) {
            gsap.from(".masthead, .newspaper-nav, .breaking-news", {
                opacity: 0,
                y: 15,
                duration: 0.8,
                stagger: 0.12,
                ease: "power2.out",
            });
        }
    }

    // -------------------------------------
    // UPDATE NAVIGATION
    // -------------------------------------

    function updateNavigation(targetId) {
        tabs.forEach((tab) => {
            const isActive = tab.dataset.tab === targetId;

            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
            tab.tabIndex = isActive ? 0 : -1;
        });
    }

    // -------------------------------------
    // SWITCH TAB
    // -------------------------------------

    function switchTab(targetId, options = {}) {
        if (isAnimating || targetId === activeTab) return;

        const currentPanel = document.getElementById(activeTab);
        const nextPanel = document.getElementById(targetId);

        if (!currentPanel || !nextPanel) return;

        if (!tabs.some((tab) => tab.dataset.tab === targetId)) return;

        isAnimating = true;

        const previousId = activeTab;
        activeTab = targetId;

        updateNavigation(targetId);

        const direction =
            panels.findIndex((panel) => panel.id === targetId) >
            panels.findIndex((panel) => panel.id === previousId)
                ? 1
                : -1;

        // Immediately remove the previous section from view.
        currentPanel.hidden = true;
        currentPanel.setAttribute("aria-hidden", "true");

        // Prepare the incoming section.
        nextPanel.hidden = false;
        nextPanel.setAttribute("aria-hidden", "false");

        if (options.focus) {
            document.querySelector(`.nav-tab[data-tab="${targetId}"]`)?.focus();
        }

        // No animation if GSAP is unavailable or reduced motion is enabled.
        if (!hasGSAP || prefersReducedMotion) {
            isAnimating = false;
            return;
        }

        // Reset any leftover inline animation styles.
        gsap.killTweensOf(nextPanel);

        gsap.set(nextPanel, {
            opacity: 0,
            y: 12,
            x: direction * 8,
        });

        gsap.to(nextPanel, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "all",
            onComplete: () => {
                isAnimating = false;
            },
        });
    }

    // -------------------------------------
    // CLICK EVENTS
    // -------------------------------------

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            switchTab(tab.dataset.tab);
        });
    });

    // -------------------------------------
    // KEYBOARD NAVIGATION
    // -------------------------------------

    tabs.forEach((tab, index) => {
        tab.addEventListener("keydown", (event) => {
            let nextIndex = index;

            if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % tabs.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();

            const nextTab = tabs[nextIndex];

            switchTab(nextTab.dataset.tab, {
                focus: true,
            });
        });
    });

    // -------------------------------------
    // CURRENT YEAR
    // -------------------------------------

    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // -------------------------------------
    // INITIALIZE
    // -------------------------------------

    initializeTabs();
});
