/* =========================================
   NEWSPAPER ARTICLE DATABASE
========================================= */

const newspaperArticles = {
    wanted: {
        category: "BREAKING NEWS",
        title: "WANTED DEAD OR ALIVE",
        subtitle: `The notorious outlaw returns to the Dakota territory. 
                Sheriff warns residents to stay alert.`,
        author: "JONATHAN WEST",
        readTime: "5 MIN READ",
        stamp: "SPECIAL REPORT",
        illustrationTitle: "WANTED",
        illustrationName: "THE OUTLAW",
        reward: "$5,000 REWARD",

        paragraphs: [
            {
                type: "lead",
                text: `
                    A quiet morning in the Dakota territory was interrupted yesterday when reports 
                    emerged of a notorious outlaw spotted near Dusty Creek.
                `,
            },
            {
                text: `Local residents reported seeing a lone rider approaching the settlement 
                    shortly before sunset. Witnesses described a mysterious figure wearing a dark 
                    coat and a wide-brimmed hat, traveling on a powerful black horse.`,
            },
            {
                text: `The sheriff's office has confirmed that the individual matches the 
                    description of a wanted criminal believed to be responsible for several 
                    robberies across the region.`,
            },
            {
                type: "heading",
                text: "THE SHERIFF'S WARNING",
            },
            {
                text: `Authorities are asking citizens to remain cautious and report any 
                    suspicious activity. Residents are strongly advised not to approach 
                    the suspect.`,
            },
            {
                type: "quote",
                text: `We intend to bring this individual to justice. Anyone with 
                    information should contact the sheriff's office.`,
                author: "SHERIFF WILLIAM CARTER",
            },
            {
                text: `The reward has now been increased to $5,000. Further information 
                    will be published as the investigation develops.`,
            },
        ],
    },

    piano: {
        category: "TOWN STORIES",
        title: "MYSTERY AT THE OLD PIANO",
        subtitle: `A forgotten instrument has become the center of an extraordinary 
            story in the heart of town.`,
        author: "CLARA BENNETT",
        readTime: "4 MIN READ",
        stamp: "CULTURE & LIFE",
        illustrationTitle: "THE PIANO",
        illustrationName: "AN OLD MELODY",
        reward: "A STORY REMEMBERED",

        paragraphs: [
            {
                type: "lead",
                text: `For years, the old piano stood untouched inside the abandoned 
                    town hall. Yesterday, its familiar melody returned.`,
            },
            {
                text: `Residents nearby reported hearing music coming from the building 
                    shortly after dusk. Some recognized the tune as a song once played 
                    during the town's annual celebrations.`,
            },
            {
                text: `Nobody has yet explained who opened the building or who played the instrument.`,
            },
            {
                type: "heading",
                text: "A PIECE OF HISTORY",
            },
            {
                text: `Local historians believe the piano belonged to the first music 
                    teacher in the settlement. Its story has remained part of town 
                    folklore for generations.`,
            },
            {
                type: "quote",
                text: "Some things in this town are worth remembering, even after the music stops.",
                author: "ELIZABETH MORGAN, LOCAL RESIDENT",
            },
            {
                text: `The town hall may soon reopen for a special evening dedicated 
                    to its musical history.`,
            },
        ],
    },

    sheriff: {
        category: "PUBLIC NOTICE",
        title: "THE SHERIFF ISSUES A WARNING",
        subtitle: `New safety instructions announced following reports of 
            suspicious activity around the territory.`,
        author: "THOMAS REED",
        readTime: "3 MIN READ",
        stamp: "OFFICIAL NOTICE",
        illustrationTitle: "CAUTION",
        illustrationName: "PUBLIC SAFETY",
        reward: "READ THE NOTICE",

        paragraphs: [
            {
                type: "lead",
                text: `The sheriff's office has issued a new public warning following 
                    several reports from residents across the Dakota territory.`,
            },
            {
                text: `Citizens are advised to travel in groups after sunset and keep 
                    their doors secured throughout the evening.`,
            },
            {
                text: `Anyone witnessing unusual activity should contact the nearest 
                    deputy. Residents are reminded not to attempt to investigate suspicious 
                    individuals themselves.`,
            },
            {
                type: "heading",
                text: "INFORMATION FOR RESIDENTS",
            },
            {
                text: `The sheriff's office will maintain additional patrols near the main 
                    road, the railway station, and the Dusty Creek crossing.`,
            },
            {
                type: "quote",
                text: `Your safety is our priority. Stay alert, look after your neighbors, 
                    and report anything unusual.`,
                author: "SHERIFF WILLIAM CARTER",
            },
            {
                text: "Further announcements will be published in the next edition of the Gazette.",
            },
        ],
    },
};

/* =========================================
   DYNAMIC ARTICLE RENDERER
========================================= */

function renderNewspaperArticle(articleId) {
    const article = newspaperArticles[articleId];

    if (!article) {
        console.warn(`Article "${articleId}" was not found.`);
        return false;
    }

    const dialog = document.querySelector(".article-dialog");

    if (!dialog) return false;

    const setText = (selector, value) => {
        const element = dialog.querySelector(selector);

        if (element) {
            element.textContent = value;
        }
    };

    // Update article information
    setText(".article-category", article.category);
    setText("#article-title", article.title);
    setText(".article-subtitle", article.subtitle);

    const byline = dialog.querySelector(".article-byline");

    if (byline) {
        byline.children[0].textContent = `BY ${article.author}`;
        byline.children[1].textContent = article.readTime;
    }

    // Update illustration
    setText(".illustration-stamp", article.stamp);
    setText(".illustration-wanted", article.illustrationTitle);
    setText(".illustration-name", article.illustrationName);
    setText(".illustration-reward", article.reward);

    // Rebuild article paragraphs
    const articleBody = dialog.querySelector(".article-body");

    if (!articleBody) return false;

    articleBody.replaceChildren();

    article.paragraphs.forEach((item, index) => {
        let element;

        if (item.type === "heading") {
            element = document.createElement("h3");
            element.textContent = item.text;
        } else if (item.type === "quote") {
            element = document.createElement("blockquote");
            element.textContent = item.text;

            const author = document.createElement("span");
            author.textContent = `— ${item.author}`;

            element.appendChild(author);
        } else {
            element = document.createElement("p");

            if (item.type === "lead") {
                element.classList.add("article-lead");

                const dropCap = document.createElement("span");
                dropCap.className = "drop-cap";
                dropCap.textContent = item.text.charAt(0);

                element.appendChild(dropCap);
                element.append(document.createTextNode(item.text.slice(1)));
            } else {
                element.textContent = item.text;
            }
        }

        articleBody.appendChild(element);
    });

    return true;
}

// Initialize Lenis
const lenis = new Lenis();
window.lenis = lenis;

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

    /* =========================================
        MARQUEE NAVIGATION
    ========================================= */

    const gazetteMarquee = document.querySelector(".gazette-marquee");

    gazetteMarquee?.addEventListener("click", (event) => {
        const headline = event.target.closest(".marquee-link");

        if (!headline) return;

        const targetTab = headline.dataset.tab;

        // Find the matching button in the main navigation
        const navigationButton = document.querySelector(
            `.nav-tab[data-tab="${targetTab}"]`,
        );

        // Use the existing tab system
        if (navigationButton) {
            navigationButton.click();
        }
    });

    // -------------------------------------
    // INITIALIZE
    // -------------------------------------

    initializeTabs();
});

/* =========================================
   READING PROGRESS
========================================= */

(() => {
    const progressBar = document.querySelector(".reading-progress");
    const progressFill = document.querySelector(".reading-progress-fill");

    if (!progressBar || !progressFill) return;

    let ticking = false;

    function updateReadingProgress() {
        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        // Avoid division by zero on short pages
        const progress =
            pageHeight > 0 ? Math.min(scrollTop / pageHeight, 1) : 0;

        const percentage = Math.round(progress * 100);

        progressFill.style.transform = `scaleX(${progress})`;

        progressBar.setAttribute("aria-valuenow", percentage);

        ticking = false;
    }

    function requestProgressUpdate() {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(updateReadingProgress);
    }

    // Update while scrolling
    window.addEventListener("scroll", requestProgressUpdate, {
        passive: true,
    });

    // Update after resizing
    window.addEventListener("resize", requestProgressUpdate);

    // Watch for tab panels becoming visible or hidden
    const tabObserver = new MutationObserver(requestProgressUpdate);

    document.querySelectorAll(".front-page, .tab-page").forEach((panel) => {
        tabObserver.observe(panel, {
            attributes: true,
            attributeFilter: ["hidden"],
        });
    });

    // Recalculate if the content height changes
    const newspaper = document.querySelector(".newspaper");

    if (newspaper && "ResizeObserver" in window) {
        const resizeObserver = new ResizeObserver(requestProgressUpdate);
        resizeObserver.observe(newspaper);
    }

    updateReadingProgress();
})();

/* =========================================
   NEWSPAPER ARTICLE READER
========================================= */

(() => {
    const dialog = document.querySelector(".article-dialog");

    if (!dialog) return;

    const closeButton = dialog.querySelector(".article-close");
    const card = dialog.querySelector(".article-dialog-card");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Lock background scrolling
    function lockPageScroll() {
        document.documentElement.classList.add("article-modal-open");
        document.body.classList.add("article-modal-open");

        // Stop Lenis while reading
        window.lenis?.stop();
    }

    // Restore background scrolling
    function unlockPageScroll() {
        document.documentElement.classList.remove("article-modal-open");
        document.body.classList.remove("article-modal-open");

        window.lenis?.start();
    }

    // Open article
    function openArticle(event) {
        const trigger = event.target.closest(".read-link, [data-open-article]");

        if (!trigger) return;

        event.preventDefault();

        if (dialog.open) return;

        const articleId =
            trigger.dataset.article || trigger.dataset.openArticle || "wanted";

        // Load the selected article before opening
        const articleLoaded = renderNewspaperArticle(articleId);

        if (!articleLoaded) return;

        lockPageScroll();

        dialog.showModal();

        // Start from the beginning of the article
        card.scrollTop = 0;

        window.lenis?.start();

        if (window.gsap && !reducedMotion.matches) {
            gsap.fromTo(
                card,
                {
                    y: 24,
                    opacity: 0,
                    scale: 0.98,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    pointerEvents: "auto",
                    duration: 0.45,
                    ease: "power3.out",
                },
            );
        }
    }

    // Close article
    function closeArticle() {
        if (!dialog.open) return;

        if (window.gsap && !reducedMotion.matches) {
            gsap.to(card, {
                y: 15,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    if (dialog.open) {
                        dialog.close();
                    }

                    gsap.set(card, {
                        clearProps: "all",
                    });
                },
            });
        } else {
            dialog.close();
        }
    }

    // Open from story links
    document.addEventListener("click", openArticle);

    // Close button
    closeButton?.addEventListener("click", closeArticle);

    // Close when clicking backdrop
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            closeArticle();
        }
    });

    // Restore scrolling after ANY closing method,
    // including the native Escape key.
    dialog.addEventListener("close", unlockPageScroll);
})();

/* =========================================
   ARCHIVE SEARCH & FILTER SYSTEM
========================================= */

(() => {
    const grid = document.querySelector("#archive-grid");
    const searchInput = document.querySelector("#archive-search");
    const filterButtons = document.querySelectorAll(".archive-filter");
    const countLabel = document.querySelector("#archive-count");
    const emptyState = document.querySelector("#archive-empty");
    const resetButton = document.querySelector("#archive-reset");

    if (!grid || !searchInput || !countLabel || !emptyState) return;

    const articles = Object.entries(newspaperArticles);

    let activeCategory = "all";
    let searchQuery = "";

    // Create an HTML element safely
    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }

    // Build one archive card
    function createArchiveCard(articleId, article, index) {
        const card = createElement("article", "archive-card");

        // Illustration area
        const art = createElement("div", "archive-card-art");

        const stamp = createElement(
            "span",
            "archive-card-stamp",
            article.stamp,
        );

        const symbol = createElement(
            "span",
            "archive-card-symbol",
            article.illustrationTitle,
        );

        const number = createElement(
            "span",
            "archive-card-number",
            `FILE NO. ${String(index + 1).padStart(3, "0")}`,
        );

        art.append(stamp, symbol, number);

        // Article information
        const info = createElement("div", "archive-card-info");

        const category = createElement(
            "span",
            "archive-card-category",
            article.category,
        );

        const title = createElement("h3", "", article.title);

        const description = createElement(
            "p",
            "archive-card-description",
            article.subtitle,
        );

        const bottom = createElement("div", "archive-card-bottom");

        const author = createElement(
            "span",
            "archive-card-author",
            `BY ${article.author}`,
        );

        const openButton = createElement(
            "button",
            "archive-card-open",
            "READ STORY →",
        );

        openButton.type = "button";
        openButton.dataset.openArticle = articleId;
        openButton.setAttribute("aria-label", `Read ${article.title}`);

        bottom.append(author, openButton);

        info.append(category, title, description, bottom);

        card.append(art, info);

        return card;
    }

    // Filter and search articles
    function getFilteredArticles() {
        return articles.filter(([id, article]) => {
            const matchesCategory =
                activeCategory === "all" || article.category === activeCategory;

            const searchableText = [
                id,
                article.title,
                article.subtitle,
                article.category,
                article.author,
                article.stamp,
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch = searchableText.includes(searchQuery);

            return matchesCategory && matchesSearch;
        });
    }

    // Render the archive
    function renderArchive() {
        const filteredArticles = getFilteredArticles();

        grid.replaceChildren();

        filteredArticles.forEach(([id, article]) => {
            const originalIndex = articles.findIndex(
                ([articleId]) => articleId === id,
            );

            const card = createArchiveCard(id, article, originalIndex);

            grid.appendChild(card);
        });

        const total = filteredArticles.length;

        countLabel.textContent =
            `${String(total).padStart(2, "0")} ` +
            `${total === 1 ? "ARTICLE" : "ARTICLES"} FOUND`;

        emptyState.hidden = total !== 0;
        grid.hidden = total === 0;
    }

    // Search
    searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        renderArchive();
    });

    // Category filters
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.filter;

            filterButtons.forEach((filter) => {
                const isActive = filter === button;

                filter.classList.toggle("is-active", isActive);
                filter.setAttribute("aria-pressed", String(isActive));
            });

            renderArchive();
        });
    });

    // Reset everything
    resetButton?.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        activeCategory = "all";

        filterButtons.forEach((button) => {
            const isActive = button.dataset.filter === "all";

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        renderArchive();
    });

    // Initial render
    renderArchive();
})();
