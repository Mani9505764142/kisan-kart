/**
 * Kisan Kart - Checkout & Reservation Workflow
 * 
 * Renders order items, verifies delivery fields, handles pending-price notifications,
 * and records pre-order stock reservations safely across browser environments.
 */

document.addEventListener("DOMContentLoaded", function() {
    initCheckoutPage();
});

function initCheckoutPage() {
    var summaryContainer = document.getElementById("checkoutItemsList");
    var checkoutForm = document.getElementById("checkoutForm");
    
    if (!summaryContainer || !checkoutForm) return;

    var cartItems = window.KisanCart ? window.KisanCart.getItems() : [];

    if (cartItems.length === 0) {
        summaryContainer.innerHTML = 
            '<div style="text-align: center; padding: 2rem 1rem;">' +
                '<p style="color: var(--color-text-muted); margin-bottom: 1rem;">Your shopping cart is currently empty.</p>' +
                '<a href="products.html" class="btn btn-primary btn-sm">Explore Catalogue</a>' +
            '</div>';
        var submitBtn = document.getElementById("placeOrderBtn");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
            submitBtn.style.cursor = "not-allowed";
        }
        return;
    }

    var financials = window.KisanCart ? window.KisanCart.calculateFinancials() : { isCalculable: false, displayStatus: "Price to be confirmed" };
    var totalQuantity = 0;
    var itemsHTML = "";

    cartItems.forEach(function(item) {
        totalQuantity += item.quantity;
        var itemPriceText = (item.product && typeof item.product.price === "number")
            ? "₹" + (item.product.price * item.quantity).toLocaleString("en-IN") + (item.product.priceNote ? " (" + item.product.priceNote + ")" : "")
            : "Price to be confirmed";
        var itemBagText = (item.product && item.product.bagSize) ? item.product.bagSize : "50 kg";

        itemsHTML += 
            '<div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border-subtle);">' +
                '<div style="display: flex; align-items: center; gap: 0.75rem;">' +
                    '<img src="' + item.product.image + '" alt="' + item.product.name + '" style="width: 44px; height: 44px; object-fit: contain; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 2px;">' +
                    '<div>' +
                        '<div style="font-size: 0.875rem; font-weight: 700; color: var(--color-text-main);">' + item.product.name + '</div>' +
                        '<div style="font-size: 0.75rem; color: var(--color-text-muted);">' + item.product.brand + ' • ' + itemBagText + ' • Qty: ' + item.quantity + '</div>' +
                    '</div>' +
                '</div>' +
                '<div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-accent-gold);">' +
                    itemPriceText +
                '</div>' +
            '</div>';
    });

    summaryContainer.innerHTML = itemsHTML;

    var qtyDisplay = document.getElementById("checkoutTotalQty");
    if (qtyDisplay) {
        qtyDisplay.textContent = totalQuantity;
    }

    var subtotalDisplay = document.getElementById("checkoutSubtotalDisplay");
    if (subtotalDisplay) {
        subtotalDisplay.textContent = financials.displayStatus;
    }

    var totalDisplay = document.getElementById("checkoutTotalDisplay");
    if (totalDisplay) {
        totalDisplay.textContent = financials.isCalculable ? ("₹" + financials.total.toLocaleString("en-IN")) : "Pending Confirmation";
    }

    var submitBtnEl = document.getElementById("placeOrderBtn");
    if (submitBtnEl) {
        if (financials.isCalculable) {
            submitBtnEl.innerHTML = 
                '<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">' +
                    '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>' +
                '</svg>' +
                'Place Order (₹' + financials.total.toLocaleString("en-IN") + ')';
        } else {
            submitBtnEl.innerHTML = 
                '<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">' +
                    '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>' +
                '</svg>' +
                'Submit Stock Reservation Request';
        }
    }

    // Handle Form Submit
    checkoutForm.addEventListener("submit", function(e) {
        e.preventDefault();

        var isValid = true;
        var requiredIds = ["customerName", "customerPhone", "customerAddress", "customerState", "customerPin"];

        checkoutForm.querySelectorAll(".is-invalid").forEach(function(el) {
            el.classList.remove("is-invalid");
        });

        requiredIds.forEach(function(id) {
            var field = document.getElementById(id);
            if (field) {
                var val = field.value.trim();
                if (!val) {
                    field.classList.add("is-invalid");
                    isValid = false;
                }
                if (id === "customerPhone" && val && !/^\d{10}$/.test(val.replace(/\s+/g, ""))) {
                    field.classList.add("is-invalid");
                    isValid = false;
                }
                if (id === "customerPin" && val && !/^\d{6}$/.test(val.replace(/\s+/g, ""))) {
                    field.classList.add("is-invalid");
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            var firstError = checkoutForm.querySelector(".is-invalid");
            if (firstError) firstError.focus();
            if (window.KisanCart) {
                window.KisanCart.showToast("Please complete the required delivery information.", "info");
            }
            return;
        }

        // Generate Order / Reservation Reference
        var orderRef = "KK-ORD-" + Math.floor(100000 + Math.random() * 900000);
        var orderData = {
            orderRef: orderRef,
            date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            customer: {
                name: document.getElementById("customerName").value.trim(),
                phone: document.getElementById("customerPhone").value.trim(),
                address: document.getElementById("customerAddress").value.trim(),
                state: document.getElementById("customerState").value.trim(),
                pin: document.getElementById("customerPin").value.trim()
            },
            paymentMethod: checkoutForm.querySelector('input[name="paymentMethod"]:checked')
                ? checkoutForm.querySelector('input[name="paymentMethod"]:checked').value
                : "Pay on Delivery Confirmation",
            items: cartItems.map(function(item) {
                return {
                    id: item.product.id,
                    name: item.product.name,
                    brand: item.product.brand,
                    image: item.product.image,
                    quantity: item.quantity,
                    grade: item.product.grade,
                    bagSize: item.product.bagSize || "50 kg",
                    price: item.product.price,
                    priceNote: item.product.priceNote || "",
                    priceDisplay: item.product.priceDisplay || "",
                    priceStatus: item.product.priceStatus || "Price to be confirmed"
                };
            }),
            financials: financials,
            totalQuantity: totalQuantity
        };

        // Persist to safe storage for confirmation view
        try {
            localStorage.setItem("kisan_kart_last_order", JSON.stringify(orderData));
        } catch (err) {}

        if (window.KisanCart) {
            window.KisanCart.clearCart();
        }

        window.location.href = "order-confirmation.html?ref=" + encodeURIComponent(orderRef);
    });
}
