/**
 * Kisan Kart - Agricultural Guidance & Consultation Workflow
 * 
 * Validates consultation requests, handles photo selection previews,
 * verifies date and contact parameters, and generates advisory reference receipts.
 */

document.addEventListener("DOMContentLoaded", function() {
    initConsultationForm();
});

function initConsultationForm() {
    var form = document.getElementById("consultationForm");
    if (!form) return;

    // Minimum date set to today
    var dateInput = document.getElementById("appointmentDate");
    if (dateInput) {
        var today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }

    // Consultation Type URL query parameter handling & breakdown toggle
    var typeOnlineRadio = document.getElementById("typeOnlineRadio");
    var typeFieldRadio = document.getElementById("typeFieldRadio");
    var fieldBreakdownBox = document.getElementById("formFieldVisitBreakdown");

    function updateBreakdownVisibility() {
        if (fieldBreakdownBox) {
            fieldBreakdownBox.style.display = (typeFieldRadio && typeFieldRadio.checked) ? "block" : "none";
        }
    }

    try {
        var urlParams = new URLSearchParams(window.location.search);
        var reqType = urlParams.get("type");
        if (reqType === "field" && typeFieldRadio) {
            typeFieldRadio.checked = true;
            if (typeOnlineRadio) typeOnlineRadio.checked = false;
        } else if (reqType === "online" && typeOnlineRadio) {
            typeOnlineRadio.checked = true;
            if (typeFieldRadio) typeFieldRadio.checked = false;
        }
    } catch (e) {}

    updateBreakdownVisibility();

    if (typeOnlineRadio) {
        typeOnlineRadio.addEventListener("change", updateBreakdownVisibility);
    }
    if (typeFieldRadio) {
        typeFieldRadio.addEventListener("change", updateBreakdownVisibility);
    }

    // Photo selection handling
    var photoInput = document.getElementById("cropPhotos");
    var photoList = document.getElementById("photoFileList");
    var uploadedFiles = [];

    if (photoInput && photoList) {
        photoInput.addEventListener("change", function(e) {
            var files = Array.from(e.target.files);
            var validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
            var maxSize = 10 * 1024 * 1024; // 10MB

            files.forEach(function(file) {
                if (validTypes.indexOf(file.type) === -1) {
                    if (window.KisanCart) {
                        window.KisanCart.showToast('"' + file.name + '" is not a supported format (JPG, PNG, WebP only).', "info");
                    }
                    return;
                }
                if (file.size > maxSize) {
                    if (window.KisanCart) {
                        window.KisanCart.showToast('"' + file.name + '" exceeds the 10MB limit.', "info");
                    }
                    return;
                }
                var exists = uploadedFiles.some(function(f) {
                    return f.name === file.name && f.size === file.size;
                });
                if (!exists) {
                    uploadedFiles.push(file);
                }
            });

            renderPhotoList();
        });

        function renderPhotoList() {
            if (uploadedFiles.length === 0) {
                photoList.innerHTML = '<p class="form-label-help">No photos selected yet.</p>';
                return;
            }
            photoList.innerHTML = uploadedFiles.map(function(file, idx) {
                return '<div class="file-preview-item">' +
                    '<span>📷 ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)</span>' +
                    '<button type="button" class="btn-remove-item" data-index="' + idx + '" title="Remove photo">&times;</button>' +
                '</div>';
            }).join("");

            photoList.querySelectorAll(".btn-remove-item").forEach(function(btn) {
                btn.addEventListener("click", function() {
                    var idx = parseInt(this.getAttribute("data-index"), 10);
                    uploadedFiles.splice(idx, 1);
                    renderPhotoList();
                });
            });
        }
    }

    // Form Submission
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        var isValid = true;
        var requiredIds = [
            "farmerName", "mobileNumber", "farmState", "farmDistrict", 
            "landSize", "cropName", "cropStage", "farmingProblem",
            "appointmentDate", "appointmentTime"
        ];

        form.querySelectorAll(".is-invalid").forEach(function(el) {
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
                if (id === "mobileNumber" && val && !/^\d{10}$/.test(val.replace(/\s+/g, ""))) {
                    field.classList.add("is-invalid");
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            var firstError = form.querySelector(".is-invalid");
            if (firstError) {
                firstError.scrollIntoView({ behavior: "smooth", block: "center" });
                firstError.focus();
            }
            if (window.KisanCart) {
                window.KisanCart.showToast("Please provide all required fields accurately.", "info");
            }
            return;
        }

        // Generate Advisory Reference
        var refNumber = "KK-GUID-" + Math.floor(100000 + Math.random() * 900000);
        var farmerName = document.getElementById("farmerName").value.trim();
        var mobileNumber = document.getElementById("mobileNumber").value.trim();
        var state = document.getElementById("farmState").value.trim();
        var district = document.getElementById("farmDistrict").value.trim();
        var landSize = document.getElementById("landSize").value.trim() + " " + document.getElementById("landUnit").value;
        var soilType = document.getElementById("soilType").value;
        var cropName = document.getElementById("cropName").value.trim();
        var cropStage = document.getElementById("cropStage").value;
        var problem = document.getElementById("farmingProblem").value.trim();
        var consultPref = form.querySelector('input[name="consultationType"]:checked') 
            ? form.querySelector('input[name="consultationType"]:checked').value 
            : "Online Consultation (₹2,499)";
        var isFieldVisit = (consultPref.indexOf("Field Visit") !== -1);
        var feeSummaryHTML = isFieldVisit
            ? 'Consultation fee: ₹5,999<br><span style="color: #92400e; font-size: 0.85rem;">Travel expenses: Additional charges (Charged separately)<br>Food expenses: Additional charges (Charged separately)</span>'
            : '₹2,499 per session (Duration: 45–60 mins &bull; Travel &amp; food expenses: Not applicable)';
        var totalPayableHTML = isFieldVisit
            ? '<strong style="color: var(--color-primary-dark); font-size: 1.05rem;">₹5,999 + travel expenses + food expenses</strong>'
            : '<strong style="color: var(--color-primary-dark); font-size: 1.05rem;">₹2,499</strong>';

        var date = document.getElementById("appointmentDate").value;
        var timeSlot = document.getElementById("appointmentTime").value;

        var formWrap = document.getElementById("consultationFormContainer");
        var confirmWrap = document.getElementById("consultationConfirmationContainer");

        if (formWrap && confirmWrap) {
            formWrap.style.display = "none";
            confirmWrap.style.display = "block";
            window.scrollTo({ top: 0, behavior: "smooth" });

            confirmWrap.innerHTML = 
                '<div class="consultation-confirmation-panel">' +
                    '<div class="confirmation-icon-circle">' +
                        '<svg width="40" height="40" viewBox="0 0 20 20" fill="currentColor">' +
                            '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>' +
                        '</svg>' +
                    '</div>' +
                    '<span class="badge badge-primary">Guidance Request Confirmed</span>' +
                    '<h2 style="margin: 0.75rem 0 0.5rem 0; font-size: 2rem;">Advisory Request Received</h2>' +
                    '<p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto 1.5rem auto;">' +
                        'Thank you, <strong>' + farmerName + '</strong>. Your crop information has been registered with Kisan Kart. Our agronomy advisory specialist will connect with you during your scheduled slot.' +
                    '</p>' +
                    '<div class="confirmation-ref-box">' +
                        '<div class="ref-label">Advisory Reference Number</div>' +
                        '<div class="ref-number">' + refNumber + '</div>' +
                    '</div>' +
                    '<div class="info-notice-box" style="text-align: left; margin-bottom: 2rem;">' +
                        '<svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">' +
                            '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>' +
                        '</svg>' +
                        '<div>' +
                            '<strong>Appointment Overview:</strong>' +
                            '<p style="margin: 0.25rem 0 0 0; font-size: 0.85rem;">' +
                                'Your preferred session is set for <strong>' + date + '</strong> during <strong>' + timeSlot + '</strong>. Please keep field notes and photos handy.' +
                            '</p>' +
                        '</div>' +
                    '</div>' +
                    '<h3 style="font-size: 1.25rem; text-align: left; margin-bottom: 0.75rem;">Submitted Request Details</h3>' +
                    '<table class="summary-data-table">' +
                        '<tbody>' +
                            '<tr><th>Farmer Name</th><td>' + farmerName + '</td></tr>' +
                            '<tr><th>Contact Mobile</th><td>+91 ' + mobileNumber + '</td></tr>' +
                            '<tr><th>Farm Location</th><td>' + district + ', ' + state + '</td></tr>' +
                            '<tr><th>Land Size & Soil</th><td>' + landSize + ' • ' + soilType + '</td></tr>' +
                            '<tr><th>Crop & Growth Stage</th><td>' + cropName + ' (' + cropStage + ')</td></tr>' +
                            '<tr><th>Reported Concern</th><td>' + problem + '</td></tr>' +
                            '<tr><th>Consultation Format</th><td>' + (isFieldVisit ? "Field Visit Consultation (In-person farm visit)" : "Online Consultation (Online meeting)") + '</td></tr>' +
                            '<tr><th>Fee Breakdown</th><td>' + feeSummaryHTML + '</td></tr>' +
                            '<tr><th>Total Payable</th><td>' + totalPayableHTML + '</td></tr>' +
                            '<tr><th>Appointment Time</th><td>' + date + ' (' + timeSlot + ')</td></tr>' +
                            '<tr><th>Photographs</th><td>' + (uploadedFiles.length > 0 ? uploadedFiles.length + ' photo(s) attached' : 'None') + '</td></tr>' +
                        '</tbody>' +
                    '</table>' +
                    '<div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">' +
                        '<button type="button" class="btn btn-secondary" onclick="window.print()">' +
                            '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">' +
                                '<path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>' +
                            '</svg>' +
                            'Print Confirmation' +
                        '</button>' +
                        '<a href="products.html" class="btn btn-primary">Browse Agricultural Products</a>' +
                        '<a href="index.html" class="btn btn-secondary">Return to Homepage</a>' +
                    '</div>' +
                '</div>';
        }
    });
}
