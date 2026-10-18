/**
 * Kisan Kart - Shared Navigation & UI Core
 * 
 * Provides global navigation, responsive drawer controls, search redirection,
 * and unified product card generation across pages.
 * Supports direct file:// opening with relative linking and storage fallback.
 */

document.addEventListener("DOMContentLoaded", function() {
    initNavigation();
    initGlobalSearch();
    initFooterYear();
});

/**
 * Mobile navigation and active page highlighting
 */
function initNavigation() {
    var navToggle = document.getElementById("mobileNavToggle");
    var mainNav = document.getElementById("mainNav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", function() {
            var isOpen = mainNav.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Close when clicking outside
        document.addEventListener("click", function(e) {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target) && mainNav.classList.contains("is-open")) {
                mainNav.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Identify active page
    var currentPath = window.location.pathname.split("/").pop() || "index.html";
    if (currentPath === "") currentPath = "index.html";

    var navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function(link) {
        var href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/**
 * Global search input handler
 */
function initGlobalSearch() {
    var searchForm = document.getElementById("headerSearchForm");
    var searchInput = document.getElementById("headerSearchInput");

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var term = searchInput.value.trim();
            if (term) {
                // Store in session as well for file:// fallback
                try {
                    sessionStorage.setItem("kisan_search_query", term);
                } catch (err) {}
                window.location.href = "products.html?search=" + encodeURIComponent(term);
            } else {
                window.location.href = "products.html";
            }
        });
    }
}

/**
 * Footer copyright year
 */
function initFooterYear() {
    var yearEl = document.getElementById("currentYear");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/**
 * Product detail navigation with query param and storage fallback
 */
function viewProductDetails(productId) {
    if (!productId) return;
    try {
        localStorage.setItem("kisan_selected_product_id", productId);
    } catch (e) {}
    window.location.href = "product-details.html?id=" + encodeURIComponent(productId);
}

/**
 * Unified Product Card HTML Generator
 * Ensures identical layout, image preservation, and price-confirmation display
 * across Homepage, Catalogue, and Related Products sections.
 */
function createProductCardHTML(product) {
    if (!product) return "";

    var priceDisplay = "";
    if (typeof product.price === "number") {
        var bagNote = product.bagSize ? (" / " + product.bagSize + " bag") : " / bag";
        var noteTag = product.priceNote ? (' <small style="font-size: 0.75rem; color: var(--color-text-subtle);">' + product.priceNote + '</small>') : '';
        priceDisplay = 
            '<div style="display: flex; align-items: baseline; gap: 0.35rem;">' +
                '<span style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary-dark); font-family: var(--font-heading);">' +
                    '₹' + product.price.toLocaleString("en-IN") +
                '</span>' +
                '<span style="font-size: 0.8125rem; color: var(--color-text-muted); font-weight: 500;">' + bagNote + noteTag + '</span>' +
            '</div>';
    } else {
        priceDisplay = '<span class="price-status-label">' +
            '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">' +
                '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>' +
            '</svg>' +
            (product.priceStatus || "Price to be confirmed") +
        '</span>';
    }

    var manufacturerText = (product.manufacturer && product.manufacturer !== product.brand)
        ? '<span style="font-size: 0.75rem; color: var(--color-text-subtle);"> • ' + product.manufacturer + '</span>'
        : '';

    var formText = "Granules";
    if (product.physicalForm) {
        if (product.physicalForm.indexOf("Granul") !== -1) {
            formText = "Granules";
        } else if (product.physicalForm.indexOf("Verify") !== -1) {
            formText = "Granular Form";
        } else {
            formText = product.physicalForm;
        }
    }

    var nutrientText = product.grade || product.nitrogenContent || "Standard Grade";
    var bagBadge = product.bagSize ? (product.bagSize + " Bag") : "50 kg Bag";

    return '' +
        '<article class="product-card" data-product-id="' + product.id + '" data-category="' + product.category + '" data-brand="' + product.brand + '">' +
            '<div class="product-card-media">' +
                '<div class="product-card-badges">' +
                    '<span class="badge badge-brand">' + product.brand + '</span>' +
                    '<span class="badge badge-verified">' + bagBadge + '</span>' +
                '</div>' +
                '<img src="' + product.image + '" ' +
                     'alt="' + (product.imageAlt || product.name) + '" ' +
                     'class="product-card-img" ' +
                     'loading="lazy" ' +
                     'onerror="this.src=\'assets/images/kisan-kart-logo.png\'">' +
            '</div>' +
            '<div class="product-card-body">' +
                '<div class="product-brand-line">' +
                    '<span class="product-brand-name">' + product.brand + manufacturerText + '</span>' +
                    '<span class="spec-chip">' + (product.fertilizerType || product.category) + '</span>' +
                '</div>' +
                '<h3 class="product-card-title">' +
                    '<a href="javascript:void(0)" onclick="viewProductDetails(\'' + product.id + '\')">' + product.name + '</a>' +
                '</h3>' +
                '<p style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 0.75rem; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' +
                    (product.shortDescription || "") +
                '</p>' +
                '<div class="product-spec-row">' +
                    '<span class="spec-chip">Type: ' + (product.fertilizerType || "Fertilizer") + '</span>' +
                    '<span class="spec-chip">Form: ' + formText + '</span>' +
                    '<span class="spec-chip">Grade: ' + nutrientText + '</span>' +
                '</div>' +
                '<div class="product-price-box">' +
                    priceDisplay +
                    (product.availability ? '<div style="font-size: 0.75rem; color: var(--color-text-subtle); margin-top: 0.25rem;">' + product.availability + '</div>' : '') +
                '</div>' +
                '<div class="product-card-actions">' +
                    '<button type="button" class="btn btn-secondary btn-sm" onclick="viewProductDetails(\'' + product.id + '\')">' +
                        'View Details' +
                    '</button>' +
                    '<button type="button" class="btn btn-primary btn-sm btn-add-cart" data-id="' + product.id + '">' +
                        '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">' +
                            '<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.24-1a1 1 0 00-.986-.78H3z"/>' +
                        '</svg>' +
                        'Add to Cart' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</article>';
}

// Global click listener for Add to Cart buttons
document.addEventListener("click", function(e) {
    var addBtn = e.target.closest(".btn-add-cart");
    if (addBtn) {
        e.preventDefault();
        var productId = addBtn.getAttribute("data-id");
        if (productId && window.KisanCart) {
            window.KisanCart.addItem(productId, 1);
        }
    }
});

// Expose globally
window.viewProductDetails = viewProductDetails;
window.createProductCardHTML = createProductCardHTML;
