/**
 * Kisan Kart - Cart & Storage Management
 * 
 * Manages cart state with resilient local storage and in-memory fallback.
 * Works under direct file:// protocol, calculates totals when verified prices exist,
 * and handles price confirmation states transparently.
 */

var CART_STORAGE_KEY = "kisan_kart_cart_v1";

// In-memory fallback if file:// security policy restricts localStorage
var inMemoryCartStore = null;

var KisanCart = {
    // Safe read from storage
    getRawItems: function() {
        try {
            var data = localStorage.getItem(CART_STORAGE_KEY);
            return data ? JSON.parse(data) : (inMemoryCartStore || []);
        } catch (e) {
            return inMemoryCartStore || [];
        }
    },

    // Safe write to storage
    saveRawItems: function(items) {
        inMemoryCartStore = items;
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            // Storage restricted; in-memory store retained
        }
        this.updateBadges();

        // Dispatch update event if supported
        try {
            window.dispatchEvent(new CustomEvent("kisan_cart_updated", { detail: { items: items } }));
        } catch (e) {}
    },

    // Enriched cart items with product catalogue metadata
    getItems: function() {
        var raw = this.getRawItems();
        return raw.map(function(item) {
            var product = window.KisanProducts ? window.KisanProducts.getById(item.id) : null;
            return {
                id: item.id,
                quantity: item.quantity,
                product: product || {
                    id: item.id,
                    name: "Agricultural Product",
                    brand: "Manufacturer",
                    image: "assets/images/kisan-kart-logo.png",
                    price: null,
                    priceStatus: "Price to be confirmed"
                }
            };
        });
    },

    // Add product to cart
    addItem: function(productId, quantity) {
        if (!productId) return;
        var qty = parseInt(quantity, 10);
        if (isNaN(qty) || qty <= 0) qty = 1;

        var items = this.getRawItems();
        var existingIndex = -1;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === productId) {
                existingIndex = i;
                break;
            }
        }

        if (existingIndex > -1) {
            items[existingIndex].quantity += qty;
        } else {
            items.push({ id: productId, quantity: qty });
        }

        this.saveRawItems(items);

        var product = window.KisanProducts ? window.KisanProducts.getById(productId) : null;
        var productName = product ? product.name : "Product";
        this.showToast("Added " + qty + " × \"" + productName + "\" to cart.", "success");
    },

    // Update item quantity
    updateQuantity: function(productId, quantity) {
        var qty = parseInt(quantity, 10);
        var items = this.getRawItems();

        if (isNaN(qty) || qty <= 0) {
            this.removeItem(productId);
            return;
        }

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === productId) {
                items[i].quantity = qty;
                break;
            }
        }
        this.saveRawItems(items);
    },

    // Remove item
    removeItem: function(productId) {
        var items = this.getRawItems();
        var product = window.KisanProducts ? window.KisanProducts.getById(productId) : null;
        var productName = product ? product.name : "Product";

        items = items.filter(function(i) {
            return i.id !== productId;
        });
        this.saveRawItems(items);
        this.showToast("Removed \"" + productName + "\" from cart.", "info");
    },

    // Total bag count
    getTotalCount: function() {
        var items = this.getRawItems();
        return items.reduce(function(sum, item) {
            return sum + (item.quantity || 0);
        }, 0);
    },

    // Calculate subtotal or return confirmation status
    calculateFinancials: function() {
        var items = this.getItems();
        if (items.length === 0) {
            return {
                isCalculable: false,
                subtotal: 0,
                deliveryFee: 0,
                total: 0,
                displayStatus: "Empty Cart",
                hasPendingPrices: false
            };
        }

        var allPriced = true;
        var subtotal = 0;

        for (var i = 0; i < items.length; i++) {
            var p = items[i].product;
            if (p && typeof p.price === "number" && !isNaN(p.price) && p.price > 0) {
                subtotal += p.price * items[i].quantity;
            } else {
                allPriced = false;
            }
        }

        if (allPriced) {
            return {
                isCalculable: true,
                subtotal: subtotal,
                deliveryFee: 0,
                total: subtotal,
                displayStatus: "₹" + subtotal.toLocaleString("en-IN"),
                hasPendingPrices: false
            };
        } else {
            return {
                isCalculable: false,
                subtotal: 0,
                deliveryFee: 0,
                total: 0,
                displayStatus: "Price to be confirmed",
                hasPendingPrices: true
            };
        }
    },

    // Clear cart
    clearCart: function() {
        this.saveRawItems([]);
    },

    // Synchronize header badges across pages
    updateBadges: function() {
        var count = this.getTotalCount();
        var badges = document.querySelectorAll(".cart-count-badge");
        badges.forEach(function(badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? "inline-flex" : "none";
        });
    },

    // Client-facing notification toast
    showToast: function(message, type) {
        var toastType = type || "success";
        var container = document.getElementById("kisan-toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "kisan-toast-container";
            container.className = "kisan-toast-container";
            document.body.appendChild(container);
        }

        var toast = document.createElement("div");
        toast.className = "kisan-toast kisan-toast-" + toastType;

        var iconSvg = toastType === "success" 
            ? '<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>'
            : '<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>';

        toast.innerHTML = 
            '<div class="toast-content">' +
                iconSvg +
                '<span>' + message + '</span>' +
            '</div>' +
            '<button type="button" class="toast-close" aria-label="Close notification">&times;</button>';

        var closeBtn = toast.querySelector(".toast-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", function() {
                toast.classList.add("toast-hiding");
                setTimeout(function() { toast.remove(); }, 250);
            });
        }

        container.appendChild(toast);

        setTimeout(function() {
            if (toast.parentElement) {
                toast.classList.add("toast-hiding");
                setTimeout(function() { toast.remove(); }, 250);
            }
        }, 3600);
    }
};

// Initialize badges on DOM ready
document.addEventListener("DOMContentLoaded", function() {
    KisanCart.updateBadges();
});

// Expose globally
window.KisanCart = KisanCart;
