/**
 * Kisan Kart - Agricultural Product Catalogue Data
 * 
 * Centralized product data structure for all 6 verified agricultural inputs.
 * Contains official bag sizes, reference prices, complete descriptions,
 * packaging specifications, key features, and "Why Buy from Kisan Kart?" points.
 */

var PRODUCTS_DATA = [
    {
        id: "iffco-neem-coated-urea-46-n",
        name: "IFFCO Neem-Coated Urea — 46% Nitrogen",
        title: "IFFCO Neem-Coated Urea — 46% Nitrogen",
        formalName: "IFFCO Neem-Coated Urea Fertilizer",
        brand: "IFFCO",
        manufacturer: "IFFCO",
        soldBy: "Kisan Kart",
        category: "Nitrogen Fertilizers",
        fertilizerType: "Nitrogen Fertilizer",
        grade: "46% N",
        nitrogenContent: "46% N",
        phosphateContent: "0%",
        potashContent: "0%",
        sulphurContent: "0%",
        physicalForm: "Granules",
        bagSize: "45 kg",
        packaging: "45 kg bag (Standard Indian retail bag size).",
        suitableCrops: "Depends on crop requirements and local recommendations.",
        application: "Soil application according to recommended dosage.",
        image: "assets/images/iffco-neem-coated-urea-46-n.jpg",
        imageAlt: "IFFCO Neem-Coated Urea Fertilizer 46% N 45kg Bag",
        shortDescription: "Nitrogen fertilizer for crop nutrition and vegetative growth.",
        fullDescription: [
            "IFFCO Neem-Coated Urea is a nitrogen fertilizer used to supply nitrogen to crops.",
            "Nitrogen supports healthy vegetative growth, leaf development, and overall plant growth when applied according to crop requirements.",
            "Its neem coating is a key feature of this fertilizer. Suitable application rates depend on the crop, soil conditions, and recommended agricultural practices."
        ],
        specifications: [
            { label: "Product Name", value: "IFFCO Neem-Coated Urea Fertilizer" },
            { label: "Brand", value: "IFFCO" },
            { label: "Manufacturer", value: "IFFCO" },
            { label: "Sold By", value: "Kisan Kart" },
            { label: "Category", value: "Nitrogen Fertilizers" },
            { label: "Fertilizer Type", value: "Nitrogen Fertilizer" },
            { label: "Nitrogen Content", value: "46%" },
            { label: "Physical Form", value: "Granules" },
            { label: "Bag Size / Packaging", value: "45 kg bag (Standard Indian retail bag size)" },
            { label: "Reference Price", value: "₹242 base MRP* (45 kg bag)" },
            { label: "Suitable Crops", value: "Depends on crop requirements and local recommendations." },
            { label: "Application", value: "Soil application according to recommended dosage." }
        ],
        keyFeatures: [
            "Supplies nitrogen for crop growth.",
            "Supports leaf and vegetative development.",
            "Neem-coated formulation.",
            "Granular form for soil application.",
            "Manufactured by IFFCO."
        ],
        whyBuyPoints: [
            "Shop fertilizers from established brands.",
            "Explore different fertilizer categories in one place.",
            "View product specifications before purchasing.",
            "Convenient online ordering.",
            "Access product information to make informed purchasing decisions."
        ],
        price: 242,
        priceNote: "base MRP*",
        priceDisplay: "₹242",
        priceStatus: "₹242 base MRP* (45 kg bag)",
        detailsStatus: "* Statutory controlled base Maximum Retail Price for 45 kg bag. Subsidized agricultural supply.",
        availability: "In Stock • Dispatch Available",
        featured: true,
        inStock: true
    },
    {
        id: "iffco-dap-18-46-0",
        name: "IFFCO DAP Fertilizer (18-46-0)",
        title: "IFFCO DAP Fertilizer (18-46-0)",
        formalName: "IFFCO DAP Fertilizer",
        brand: "IFFCO",
        manufacturer: "IFFCO",
        soldBy: "Kisan Kart",
        category: "Phosphatic Fertilizers",
        fertilizerType: "Diammonium Phosphate",
        grade: "18-46-0",
        nitrogenContent: "18%",
        phosphateContent: "46% P₂O₅",
        potashContent: "0%",
        sulphurContent: "0%",
        physicalForm: "Granules",
        bagSize: "50 kg",
        packaging: "50 kg bag standard cooperative packaging.",
        suitableCrops: "Suitable for various crops, depending on their nutrient requirements.",
        application: "Soil application according to crop requirements.",
        image: "assets/images/iffco-dap-18-46-0.jpg",
        imageAlt: "IFFCO DAP Fertilizer (18-46-0) Diammonium Phosphate 50kg Bag",
        shortDescription: "Phosphatic fertilizer for root development and early crop growth.",
        fullDescription: [
            "IFFCO DAP (Diammonium Phosphate) is a phosphorus-rich fertilizer that supplies nitrogen and phosphorus to support plant growth.",
            "It helps promote root development and supports early crop establishment when applied according to recommended agricultural practices."
        ],
        specifications: [
            { label: "Product Name", value: "IFFCO DAP Fertilizer" },
            { label: "Brand", value: "IFFCO" },
            { label: "Manufacturer", value: "IFFCO" },
            { label: "Sold By", value: "Kisan Kart" },
            { label: "Category", value: "Phosphatic Fertilizers" },
            { label: "Fertilizer Type", value: "Diammonium Phosphate" },
            { label: "Nitrogen Content", value: "18%" },
            { label: "Phosphate Content", value: "46% P₂O₅" },
            { label: "Physical Form", value: "Granules" },
            { label: "Bag Size / Packaging", value: "50 kg bag" },
            { label: "Reference Price", value: "₹1,350 (50 kg bag)" },
            { label: "Application", value: "Soil application according to crop requirements." }
        ],
        keyFeatures: [
            "Supplies nitrogen and phosphorus.",
            "Supports healthy root development.",
            "Promotes early crop establishment.",
            "Supports flowering and crop development.",
            "Suitable for various crops, depending on their nutrient requirements."
        ],
        whyBuyPoints: [
            "Explore fertilizers from established brands.",
            "Convenient online ordering.",
            "View product specifications before purchasing.",
            "Find multiple fertilizer categories in one place.",
            "Access product information to make informed purchasing decisions."
        ],
        price: 1350,
        priceNote: "",
        priceDisplay: "₹1,350",
        priceStatus: "₹1,350 / bag (50 kg)",
        detailsStatus: "Subsidized cooperative reference price for 50 kg packaging.",
        availability: "In Stock • Dispatch Available",
        featured: true,
        inStock: true
    },
    {
        id: "gromor-npk-10-26-26",
        name: "Gromor NPK Fertilizer (10-26-26)",
        title: "Gromor NPK Fertilizer (10-26-26)",
        formalName: "Gromor NPK 10-26-26",
        brand: "Gromor",
        manufacturer: "Coromandel International",
        soldBy: "Kisan Kart",
        category: "NPK Fertilizers",
        fertilizerType: "Complex NPK Fertilizer",
        grade: "10-26-26",
        nitrogenContent: "10%",
        phosphateContent: "26% P₂O₅",
        potashContent: "26% K₂O",
        sulphurContent: "0%",
        physicalForm: "Granules",
        bagSize: "50 kg",
        packaging: "50 kg bag, as listed in the supplied product document.",
        suitableCrops: "Sugarcane, potato, fruits, and other crops according to nutrient requirements.",
        application: "Soil application according to crop-specific recommendations.",
        image: "assets/images/gromor-npk-10-26-26.jpg",
        imageAlt: "Gromor NPK Fertilizer (10-26-26) Coromandel International 50kg Bag",
        shortDescription: "Complex fertilizer for crop nutrition and healthy plant development.",
        fullDescription: [
            "Gromor NPK 10-26-26 is a complex fertilizer containing nitrogen, phosphorus, and potassium.",
            "It supports root development, plant growth, and crop productivity, and is particularly used for crops such as sugarcane, potatoes, and fruits."
        ],
        specifications: [
            { label: "Product Name", value: "Gromor NPK 10-26-26" },
            { label: "Brand", value: "Gromor" },
            { label: "Manufacturer", value: "Coromandel International" },
            { label: "Sold By", value: "Kisan Kart" },
            { label: "Category", value: "NPK Fertilizers" },
            { label: "Fertilizer Type", value: "Complex NPK Fertilizer" },
            { label: "Nitrogen Content", value: "10%" },
            { label: "Phosphate Content", value: "26% P₂O₅" },
            { label: "Potash Content", value: "26% K₂O" },
            { label: "Physical Form", value: "Granules" },
            { label: "Bag Size / Packaging", value: "50 kg bag" },
            { label: "Reference Price", value: "₹1,815 approx. (50 kg bag)" },
            { label: "Suitable Crops", value: "Sugarcane, potato, fruits, and other crops according to nutrient requirements." },
            { label: "Application", value: "Soil application according to crop-specific recommendations." }
        ],
        keyFeatures: [
            "Supplies three major plant nutrients: nitrogen, phosphorus, and potassium.",
            "Supports root growth and plant development.",
            "Helps improve crop vigour.",
            "Supports fruit, tuber, and grain development.",
            "Provides a balanced combination of phosphorus and potassium."
        ],
        whyBuyPoints: [
            "Explore fertilizers from established brands.",
            "Convenient online ordering.",
            "View product specifications before purchasing.",
            "Browse multiple fertilizer categories in one place.",
            "Compare products to find options suited to your farming needs."
        ],
        price: 1815,
        priceNote: "approx.",
        priceDisplay: "₹1,815",
        priceStatus: "₹1,815 approx. (50 kg bag)",
        detailsStatus: "Coromandel International approximate retail price for 50 kg packaging.",
        availability: "In Stock • Dispatch Available",
        featured: true,
        inStock: true
    },
    {
        id: "iffco-npk-12-32-16",
        name: "IFFCO NPK Fertilizer (12-32-16)",
        title: "IFFCO NPK Fertilizer (12-32-16)",
        formalName: "IFFCO NPK Fertilizer (12-32-16)",
        brand: "IFFCO",
        manufacturer: "IFFCO",
        soldBy: "Kisan Kart",
        category: "NPK Complex Fertilizers",
        fertilizerType: "Complex NPK Fertilizer",
        grade: "12-32-16",
        nitrogenContent: "12%",
        phosphateContent: "32% P₂O₅",
        potashContent: "16% K₂O",
        sulphurContent: "0%",
        physicalForm: "Granules",
        bagSize: "50 kg",
        packaging: "50 kg bag; verify actual packaging.",
        suitableCrops: "Suitable for different crops according to their nutrient requirements.",
        application: "Soil application according to crop-specific recommendations.",
        image: "assets/images/iffco-npk-12-32-16.jpg",
        imageAlt: "IFFCO NPK Fertilizer (12-32-16) Complex Fertilizer 50kg Bag",
        shortDescription: "Complex fertilizer for root development and balanced crop nutrition.",
        fullDescription: [
            "IFFCO NPK 12-32-16 is a complex fertilizer containing nitrogen, phosphorus, and potassium.",
            "It supports root development, early plant growth, and overall crop nutrition when applied according to crop requirements and recommended agricultural practices."
        ],
        specifications: [
            { label: "Product Name", value: "IFFCO NPK Fertilizer (12-32-16)" },
            { label: "Brand", value: "IFFCO" },
            { label: "Manufacturer", value: "IFFCO" },
            { label: "Sold By", value: "Kisan Kart" },
            { label: "Category", value: "NPK Complex Fertilizers" },
            { label: "Fertilizer Type", value: "Complex NPK Fertilizer" },
            { label: "Nitrogen Content", value: "12%" },
            { label: "Phosphate Content", value: "32% P₂O₅" },
            { label: "Potash Content", value: "16% K₂O" },
            { label: "Physical Form", value: "Granules" },
            { label: "Bag Size / Packaging", value: "50 kg bag" },
            { label: "Reference Price", value: "₹1,712 approx. (50 kg bag)" },
            { label: "Application", value: "Soil application according to crop-specific recommendations." }
        ],
        keyFeatures: [
            "Supplies three essential plant nutrients: nitrogen, phosphorus, and potassium.",
            "Supports root development and early plant growth.",
            "Helps maintain balanced crop nutrition.",
            "Supports healthy plant development.",
            "Suitable for different crops according to their nutrient requirements."
        ],
        whyBuyPoints: [
            "Explore fertilizers from established brands.",
            "Convenient online ordering.",
            "Review product specifications before purchasing.",
            "Browse multiple fertilizer categories in one place.",
            "Find products suited to your agricultural needs."
        ],
        price: 1712,
        priceNote: "approx.",
        priceDisplay: "₹1,712",
        priceStatus: "₹1,712 approx. (50 kg bag)",
        detailsStatus: "Cooperative reference market price for 50 kg packaging.",
        availability: "In Stock • Dispatch Available",
        featured: true,
        inStock: true
    },
    {
        id: "iffco-nps-20-20-0-13",
        name: "IFFCO NP(S) Fertilizer (20-20-0-13)",
        title: "IFFCO NP(S) Fertilizer (20-20-0-13)",
        formalName: "IFFCO NP(S) Fertilizer",
        brand: "IFFCO",
        manufacturer: "Indian Farmers Fertiliser Cooperative Limited (IFFCO)",
        soldBy: "Kisan Kart",
        category: "Nitrogen, Phosphorus & Sulphur Fertilizers",
        fertilizerType: "Complex Fertilizer",
        fertilizerGrade: "NP(S) 20-20-0-13",
        grade: "20-20-0-13",
        nitrogenContent: "20% N",
        phosphateContent: "20% P₂O₅",
        potashContent: "0% K₂O",
        sulphurContent: "13% S",
        physicalForm: "Granular",
        bagSize: "50 kg",
        packaging: "50 kg bag standard packaging.",
        suitableCrops: "Can be used for crops where these nutrients are required, following crop-specific recommendations.",
        application: "Soil application, as recommended for the crop.",
        image: "assets/images/iffco-nps-20-20-0-13.jpg",
        imageAlt: "IFFCO NP(S) Fertilizer (20-20-0-13) Nitrogen Phosphorus Sulphur 50kg Bag",
        shortDescription: "Supplies nitrogen, phosphorus, and sulphur to support vegetative growth and balanced crop nutrition.",
        fullDescription: [
            "IFFCO NP(S) 20-20-0-13 is a complex fertilizer that supplies nitrogen, phosphorus, and sulphur to crops.",
            "It supports vegetative growth, root development, and balanced crop nutrition.",
            "It is suitable for farmers who need these nutrients to support crop growth and development. Apply according to the crop's nutrient requirements and recommended agricultural practices."
        ],
        specifications: [
            { label: "Product Name", value: "IFFCO NP(S) Fertilizer" },
            { label: "Brand", value: "IFFCO" },
            { label: "Manufacturer", value: "Indian Farmers Fertiliser Cooperative Limited (IFFCO)" },
            { label: "Sold By", value: "Kisan Kart" },
            { label: "Fertilizer Grade", value: "NP(S) 20-20-0-13" },
            { label: "Fertilizer Type", value: "Complex Fertilizer" },
            { label: "Category", value: "Nitrogen, Phosphorus & Sulphur Fertilizers" },
            { label: "Nitrogen Content", value: "20% N" },
            { label: "Phosphate Content", value: "20% P₂O₅" },
            { label: "Potash Content", value: "0% K₂O" },
            { label: "Sulphur Content", value: "13% S" },
            { label: "Physical Form", value: "Granular" },
            { label: "Bag Size / Packaging", value: "50 kg bag" },
            { label: "Reference Price", value: "₹1,300 (50 kg bag)" },
            { label: "Application", value: "Soil application, as recommended for the crop." }
        ],
        keyFeatures: [
            "Nitrogen Supply: Supports vegetative growth and leaf development.",
            "Phosphorus Supply: Helps support root development and early plant growth.",
            "Sulphur Nutrition: Supplies sulphur, an essential plant nutrient.",
            "Combined Nutrients: Provides nitrogen, phosphorus, and sulphur in one fertilizer.",
            "Agricultural Use: Can be used for crops where these nutrients are required, following crop-specific recommendations."
        ],
        whyBuyPoints: [
            "Explore fertilizers from established agricultural brands.",
            "View product specifications before purchasing.",
            "Compare different fertilizer grades in one place.",
            "Shop conveniently through an agriculture-focused online store.",
            "Find products suited to different farming nutrient requirements."
        ],
        price: 1300,
        priceNote: "",
        priceDisplay: "₹1,300",
        priceStatus: "₹1,300 / bag (50 kg)",
        detailsStatus: "Subsidized cooperative reference price for 50 kg packaging.",
        availability: "In Stock • Dispatch Available",
        featured: true,
        inStock: true
    },
    {
        id: "iffco-npk-15-15-15",
        name: "IFFCO NPK Fertilizer (15-15-15)",
        title: "IFFCO NPK Fertilizer (15-15-15)",
        formalName: "IFFCO NPK Fertilizer",
        brand: "IFFCO",
        manufacturer: "Indian Farmers Fertiliser Cooperative Limited (IFFCO)",
        soldBy: "Kisan Kart",
        category: "NPK Complex Fertilizers",
        fertilizerType: "NPK Complex Fertilizer",
        fertilizerGrade: "NPK 15-15-15",
        grade: "15-15-15",
        nitrogenContent: "15% N",
        phosphateContent: "15% P₂O₅",
        potashContent: "15% K₂O",
        sulphurContent: "0%",
        physicalForm: "Granular Formulation",
        bagSize: "50 kg",
        packaging: "50 kg bag reference packaging.",
        suitableCrops: "Can help meet crop nutrient requirements when used according to soil conditions and crop-specific recommendations.",
        application: "As recommended for the crop and soil.",
        image: "assets/images/iffco-npk-15-15-15.jpg",
        imageAlt: "IFFCO NPK Fertilizer (15-15-15) Complex Fertilizer Bag",
        shortDescription: "Balanced complex fertilizer providing equal proportions of nitrogen, phosphorus, and potassium.",
        fullDescription: [
            "IFFCO NPK Fertilizer (15-15-15) is a fertilizer grade that provides three essential plant nutrients: nitrogen, phosphorus, and potassium in equal proportions.",
            "Nitrogen supports leaf and vegetative growth, phosphorus helps root development, and potassium contributes to overall plant health.",
            "It can help meet crop nutrient requirements when used according to soil conditions and crop-specific recommendations."
        ],
        specifications: [
            { label: "Product Name", value: "IFFCO NPK Fertilizer" },
            { label: "Brand", value: "IFFCO" },
            { label: "Manufacturer", value: "Indian Farmers Fertiliser Cooperative Limited (IFFCO)" },
            { label: "Sold By", value: "Kisan Kart" },
            { label: "Fertilizer Grade", value: "NPK 15-15-15" },
            { label: "Fertilizer Type", value: "NPK Complex Fertilizer" },
            { label: "Category", value: "NPK Complex Fertilizers" },
            { label: "Nitrogen Content", value: "15% N" },
            { label: "Phosphate Content", value: "15% P₂O₅" },
            { label: "Potash Content", value: "15% K₂O" },
            { label: "Physical Form", value: "Granular Formulation" },
            { label: "Bag Size / Packaging", value: "50 kg bag" },
            { label: "Reference Price", value: "₹1,250** (50 kg bag reference)" },
            { label: "Application", value: "As recommended for the crop and soil." }
        ],
        keyFeatures: [
            "Balanced Nutrients: Provides nitrogen, phosphorus, and potassium in equal proportions.",
            "Vegetative Growth: Nitrogen supports leaf and stem development.",
            "Root Development: Phosphorus supports root growth and early plant establishment.",
            "Plant Health: Potassium contributes to plant health and nutrient balance.",
            "Crop Nutrition: Helps supply essential nutrients when applied according to crop requirements."
        ],
        whyBuyPoints: [
            "Explore fertilizers from established agricultural brands.",
            "Compare fertilizer grades and nutrient compositions.",
            "Review product specifications before purchasing.",
            "Shop for agricultural products through one online platform.",
            "Find fertilizers suited to different crop nutrient requirements."
        ],
        specialNote: "Important: The supplied bag image is a concept mockup, not verified official IFFCO packaging. Confirm that this exact grade is available from the supplier before publishing it as a real commercial product.",
        price: 1250,
        priceNote: "**",
        priceDisplay: "₹1,250",
        priceStatus: "₹1,250** (50 kg bag)",
        detailsStatus: "** Indicative reference market price awaiting official regional allocation notice.",
        availability: "In Stock • Dispatch Available",
        featured: true,
        inStock: true
    }
];

// Provide verifiedSpecs and benefits alias for backward compatibility
for (var pIdx = 0; pIdx < PRODUCTS_DATA.length; pIdx++) {
    var p = PRODUCTS_DATA[pIdx];
    p.verifiedSpecs = p.specifications;
    p.benefits = p.keyFeatures;
}

// Helper functions for catalogue operations
var KisanProducts = {
    getAll: function() {
        return PRODUCTS_DATA;
    },

    getById: function(id) {
        if (!id) return null;
        for (var i = 0; i < PRODUCTS_DATA.length; i++) {
            if (PRODUCTS_DATA[i].id === id) {
                return PRODUCTS_DATA[i];
            }
        }
        return null;
    },

    getFeatured: function() {
        return PRODUCTS_DATA.filter(function(product) {
            return product.featured;
        });
    },

    getCategories: function() {
        var categories = [];
        for (var i = 0; i < PRODUCTS_DATA.length; i++) {
            if (categories.indexOf(PRODUCTS_DATA[i].category) === -1) {
                categories.push(PRODUCTS_DATA[i].category);
            }
        }
        return categories;
    },

    getBrands: function() {
        var brands = [];
        for (var i = 0; i < PRODUCTS_DATA.length; i++) {
            if (brands.indexOf(PRODUCTS_DATA[i].brand) === -1) {
                brands.push(PRODUCTS_DATA[i].brand);
            }
        }
        return brands;
    },

    filterAndSort: function(options) {
        var opts = options || {};
        var query = opts.query || "";
        var category = opts.category || "all";
        var brand = opts.brand || "all";
        var sort = opts.sort || "default";

        var results = PRODUCTS_DATA.slice();

        // Search filter
        if (query && query.trim() !== "") {
            var q = query.trim().toLowerCase();
            results = results.filter(function(p) {
                return p.name.toLowerCase().indexOf(q) !== -1 ||
                       p.brand.toLowerCase().indexOf(q) !== -1 ||
                       (p.grade && p.grade.toLowerCase().indexOf(q) !== -1) ||
                       p.category.toLowerCase().indexOf(q) !== -1 ||
                       p.fertilizerType.toLowerCase().indexOf(q) !== -1 ||
                       p.shortDescription.toLowerCase().indexOf(q) !== -1;
            });
        }

        // Category filter
        if (category && category !== "all") {
            results = results.filter(function(p) {
                return p.category.toLowerCase() === category.toLowerCase();
            });
        }

        // Brand filter
        if (brand && brand !== "all") {
            results = results.filter(function(p) {
                return p.brand.toLowerCase() === brand.toLowerCase();
            });
        }

        // Sorting
        if (sort === "name-asc") {
            results.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        } else if (sort === "name-desc") {
            results.sort(function(a, b) {
                return b.name.localeCompare(a.name);
            });
        } else if (sort === "price-asc") {
            results.sort(function(a, b) {
                return (a.price || 0) - (b.price || 0);
            });
        } else if (sort === "price-desc") {
            results.sort(function(a, b) {
                return (b.price || 0) - (a.price || 0);
            });
        }

        return results;
    },

    getRelated: function(productId, limit) {
        var max = limit || 3;
        var current = this.getById(productId);
        if (!current) return PRODUCTS_DATA.slice(0, max);
        return PRODUCTS_DATA.filter(function(p) {
            return p.id !== productId;
        }).slice(0, max);
    }
};

// Expose globally for standard non-module script loading
window.PRODUCTS_DATA = PRODUCTS_DATA;
window.KisanProducts = KisanProducts;
