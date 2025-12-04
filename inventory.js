// Energx Inventory Data - Parsed from CSV
const inventory = {
    regular: [
        { brand: "Gorilla Mind", flavors: 4, cansPerFlavor: 3, cost: 40, totalCans: 12, costPerCan: 3.33, caffeine: 200, vendor: "Amazon" },
        { brand: "Gorilla Mind", flavors: 4, cansPerFlavor: 3, cost: 40, totalCans: 12, costPerCan: 3.33, caffeine: 200, vendor: "Amazon" },
        { brand: "Monster Juice", flavors: 2, cansPerFlavor: 5, cost: 25, totalCans: 15, costPerCan: 1.66, caffeine: 150, vendor: "Amazon" },
        { brand: "Redbull", flavors: 3, cansPerFlavor: 8, cost: 44, totalCans: 24, costPerCan: 1.83, caffeine: 80, vendor: "Amazon" },
        { brand: "Bang", flavors: 4, cansPerFlavor: 6, cost: 55, totalCans: 24, costPerCan: 2.29, caffeine: 300, vendor: "Amazon" },
        { brand: "C4", flavors: 4, cansPerFlavor: 3, cost: 28, totalCans: 12, costPerCan: 2.33, caffeine: 200, vendor: "Amazon" },
        { brand: "ZOA", flavors: 4, cansPerFlavor: 3, cost: 25, totalCans: 12, costPerCan: 2.08, caffeine: 160, vendor: "Amazon" },
        { brand: "Rockstar", flavors: 4, cansPerFlavor: 3, cost: 26, totalCans: 12, costPerCan: 2.16, caffeine: 240, vendor: "Amazon" },
        { brand: "C4", flavors: 4, cansPerFlavor: 3, cost: 20, totalCans: 12, costPerCan: 1.66, caffeine: 200, vendor: "Amazon" },
        { brand: "C4", flavors: 4, cansPerFlavor: 3, cost: 20, totalCans: 12, costPerCan: 1.66, caffeine: 200, vendor: "Amazon" },
        { brand: "Ryse", flavors: 4, cansPerFlavor: 3, cost: 30, totalCans: 12, costPerCan: 2.50, caffeine: 200, vendor: "Amazon" },
        { brand: "Monster", flavors: 3, cansPerFlavor: 5, cost: 30, totalCans: 15, costPerCan: 2.00, caffeine: 150, vendor: "Amazon" },
        { brand: "Monster", flavors: 3, cansPerFlavor: 5, cost: 30, totalCans: 15, costPerCan: 2.00, caffeine: 150, vendor: "Amazon" },
        { brand: "Monster", flavors: 3, cansPerFlavor: 5, cost: 37, totalCans: 15, costPerCan: 2.46, caffeine: 150, vendor: "Amazon" },
        { brand: "Monster", flavors: 3, cansPerFlavor: 8, cost: 37, totalCans: 24, costPerCan: 1.54, caffeine: 150, vendor: "Sams Club" },
        { brand: "Alani Nu", flavors: 3, cansPerFlavor: 4, cost: 20, totalCans: 12, costPerCan: 1.66, caffeine: 200, vendor: "Amazon" },
        { brand: "Alani Nu", flavors: 3, cansPerFlavor: 6, cost: 23, totalCans: 18, costPerCan: 1.30, caffeine: 200, vendor: "Sams Club" },
        { brand: "Celsius", flavors: 3, cansPerFlavor: 6, cost: 24, totalCans: 18, costPerCan: 1.33, caffeine: 200, vendor: "Sams Club" },
        { brand: "Celsius", flavors: 3, cansPerFlavor: 6, cost: 23, totalCans: 18, costPerCan: 1.30, caffeine: 200, vendor: "Sams Club" },
        { brand: "Reign", flavors: 3, cansPerFlavor: 4, cost: 24, totalCans: 12, costPerCan: 2.00, caffeine: 300, vendor: "Amazon" },
        { brand: "Reign", flavors: 3, cansPerFlavor: 8, cost: 37, totalCans: 24, costPerCan: 1.55, caffeine: 300, vendor: "Sams Club" },
        { brand: "Ghost", flavors: 3, cansPerFlavor: 5, cost: 23, totalCans: 15, costPerCan: 1.53, caffeine: 200, vendor: "Sams Club" },
        { brand: "Ghost", flavors: 3, cansPerFlavor: 6, cost: 36, totalCans: 18, costPerCan: 2.00, caffeine: 200, vendor: "Boxed" },
        { brand: "Bucked Up", flavors: 3, cansPerFlavor: 5, cost: 28, totalCans: 15, costPerCan: 1.86, caffeine: 300, vendor: "Costco" }
    ],
    healthy: [
        { brand: "Bloom", flavors: 4, cansPerFlavor: 6, cost: 47, totalCans: 24, costPerCan: 1.95, caffeine: 200, vendor: "Amazon" },
        { brand: "Guru", flavors: 4, cansPerFlavor: 3, cost: 18, totalCans: 12, costPerCan: 1.50, caffeine: 140, vendor: "Amazon" },
        { brand: "Guru", flavors: 4, cansPerFlavor: 3, cost: 18, totalCans: 12, costPerCan: 1.50, caffeine: 140, vendor: "Amazon" },
        { brand: "Gorgie", flavors: 3, cansPerFlavor: 4, cost: 22, totalCans: 12, costPerCan: 1.83, caffeine: 150, vendor: "Amazon" },
        { brand: "Gorgie", flavors: 3, cansPerFlavor: 4, cost: 22, totalCans: 12, costPerCan: 1.83, caffeine: 150, vendor: "Amazon" },
        { brand: "PHX", flavors: 6, cansPerFlavor: 4, cost: 46, totalCans: 24, costPerCan: 1.91, caffeine: 200, vendor: "Amazon" },
        { brand: "LifeAid FitAid", flavors: 4, cansPerFlavor: 6, cost: 53, totalCans: 24, costPerCan: 2.20, caffeine: 200, vendor: "Amazon" },
        { brand: "Lucky", flavors: 5, cansPerFlavor: 2, cost: 20, totalCans: 10, costPerCan: 2.00, caffeine: 200, vendor: "Amazon" },
        { brand: "Accelerator", flavors: 3, cansPerFlavor: 4, cost: 20, totalCans: 12, costPerCan: 1.66, caffeine: 200, vendor: "Amazon" },
        { brand: "Riot", flavors: 5, cansPerFlavor: 2, cost: 43, totalCans: 12, costPerCan: 3.58, caffeine: 160, vendor: "Amazon" },
        { brand: "Redcon1", flavors: 3, cansPerFlavor: 4, cost: 20, totalCans: 12, costPerCan: 1.66, caffeine: 200, vendor: "Amazon" },
        { brand: "Omni", flavors: 3, cansPerFlavor: 4, cost: 23, totalCans: 12, costPerCan: 1.91, caffeine: 200, vendor: "Amazon" },
        { brand: "Omni", flavors: 3, cansPerFlavor: 4, cost: 23, totalCans: 12, costPerCan: 1.91, caffeine: 200, vendor: "Amazon" }
    ]
};

// Brand logo URLs (CDN hosted images that work)
const brandLogos = {
    'Gorilla Mind': 'https://cdn.shopify.com/s/files/1/0369/2580/0493/files/gorilla-mind-logo.png?v=1614369539',
    'Monster Juice': 'https://1000logos.net/wp-content/uploads/2021/05/Monster-Energy-logo.png',
    'Monster': 'https://1000logos.net/wp-content/uploads/2021/05/Monster-Energy-logo.png',
    'Redbull': 'https://1000logos.net/wp-content/uploads/2021/04/Red-Bull-logo.png',
    'Bang': 'https://1000logos.net/wp-content/uploads/2022/08/Bang-Energy-Logo.png',
    'C4': 'https://www.cellucor.com/cdn/shop/files/C4_Logo_Black_200x.png',
    'ZOA': 'https://drinkzoa.com/cdn/shop/files/ZOA_Logo_450x.png',
    'Rockstar': 'https://1000logos.net/wp-content/uploads/2020/09/Rockstar-Energy-Drink-Logo.png',
    'Ryse': 'https://rfrealestateconferences.com/wp-content/uploads/2023/08/Ryse-Fuel-Logo.png',
    'Alani Nu': 'https://www.alaninu.com/cdn/shop/files/Alani-Nu-Logo_410x.png',
    'Celsius': 'https://1000logos.net/wp-content/uploads/2023/04/Celsius-logo.png',
    'Reign': 'https://1000logos.net/wp-content/uploads/2022/08/Reign-Total-Body-Fuel-Logo.png',
    'Ghost': 'https://www.ghostlifestyle.com/cdn/shop/files/GHOST_LOGO_BLACK_200x.png',
    'Bucked Up': 'https://www.buckedup.com/cdn/shop/files/BU_Logo_200x.png',
    'Bloom': 'https://bloomnu.com/cdn/shop/files/bloom-logo-black_200x.png',
    'Guru': 'https://www.guruenergy.com/cdn/shop/files/GURU_LOGO_200x.png',
    'Gorgie': 'https://drinkgorgie.com/cdn/shop/files/gorgie-logo_200x.png',
    'PHX': 'https://www.drinkphx.com/cdn/shop/files/phx-logo_200x.png',
    'LifeAid FitAid': 'https://lifeaidbevco.com/cdn/shop/files/FITAID_Logo_200x.png',
    'Lucky': 'https://drinkalucky.com/cdn/shop/files/lucky-logo_200x.png',
    'Accelerator': 'https://drinkaccelerator.com/cdn/shop/files/accelerator-logo_200x.png',
    'Riot': 'https://www.riotenergy.com/cdn/shop/files/riot-logo_200x.png',
    'Redcon1': 'https://redcon1.com/cdn/shop/files/R1_Logo_200x.png',
    'Omni': 'https://www.drinkOMNI.com/cdn/shop/files/omni-logo_200x.png'
};

// Fallback brand colors and initials for when logos don't load
const brandColors = {
    'Gorilla Mind': { bg: '#1a1a2e', text: '#fff' },
    'Monster Juice': { bg: '#95d600', text: '#000' },
    'Monster': { bg: '#95d600', text: '#000' },
    'Redbull': { bg: '#db0a40', text: '#fff' },
    'Bang': { bg: '#00d4ff', text: '#000' },
    'C4': { bg: '#ff6b00', text: '#fff' },
    'ZOA': { bg: '#ffd700', text: '#000' },
    'Rockstar': { bg: '#000', text: '#ffd700' },
    'Ryse': { bg: '#00bfff', text: '#fff' },
    'Alani Nu': { bg: '#ff69b4', text: '#fff' },
    'Celsius': { bg: '#ff4500', text: '#fff' },
    'Reign': { bg: '#8b00ff', text: '#fff' },
    'Ghost': { bg: '#000', text: '#0f0' },
    'Bucked Up': { bg: '#ff0000', text: '#fff' },
    'Bloom': { bg: '#ff91a4', text: '#fff' },
    'Guru': { bg: '#00aa00', text: '#fff' },
    'Gorgie': { bg: '#ff6b9d', text: '#fff' },
    'PHX': { bg: '#00d4aa', text: '#fff' },
    'LifeAid FitAid': { bg: '#ff8c00', text: '#fff' },
    'Lucky': { bg: '#00cc00', text: '#fff' },
    'Accelerator': { bg: '#6366f1', text: '#fff' },
    'Riot': { bg: '#ff3366', text: '#fff' },
    'Redcon1': { bg: '#cc0000', text: '#fff' },
    'Omni': { bg: '#4169e1', text: '#fff' }
};

// Get unique brands with aggregated info
function getUniqueBrands() {
    const brandMap = new Map();
    
    // Process regular drinks
    inventory.regular.forEach(product => {
        const key = product.brand;
        if (!brandMap.has(key)) {
            brandMap.set(key, {
                brand: product.brand,
                caffeine: product.caffeine,
                avgCostPerCan: product.costPerCan,
                totalCans: product.totalCans,
                category: 'regular'
            });
        } else {
            const existing = brandMap.get(key);
            existing.totalCans += product.totalCans;
        }
    });
    
    // Process healthy drinks
    inventory.healthy.forEach(product => {
        const key = product.brand;
        if (!brandMap.has(key)) {
            brandMap.set(key, {
                brand: product.brand,
                caffeine: product.caffeine,
                avgCostPerCan: product.costPerCan,
                totalCans: product.totalCans,
                category: 'healthy'
            });
        } else {
            const existing = brandMap.get(key);
            existing.totalCans += product.totalCans;
        }
    });
    
    return Array.from(brandMap.values());
}

// Get brands by category
function getBrandsByCategory(category) {
    const products = category === 'all' ? [...inventory.regular, ...inventory.healthy] : inventory[category];
    const brands = [...new Set(products.map(p => p.brand))];
    return brands;
}

// Check if caffeine matches level
function matchesCaffeineLevel(caffeine, level) {
    switch(level) {
        case 'low': return caffeine >= 80 && caffeine <= 150;
        case 'medium': return caffeine >= 160 && caffeine <= 200;
        case 'high': return caffeine >= 240 && caffeine <= 300;
        default: return false;
    }
}

// Filter products by preferences
function filterProducts(preferences) {
    let products = [];
    
    // Filter by drink type first
    if (preferences.drinkTypes && preferences.drinkTypes.length > 0) {
        if (preferences.drinkTypes.includes('regular')) {
            products = products.concat(inventory.regular);
        }
        if (preferences.drinkTypes.includes('healthy')) {
            products = products.concat(inventory.healthy);
        }
    }
    
    // If no drink types selected, include all
    if (products.length === 0) {
        products = [...inventory.regular, ...inventory.healthy];
    }
    
    // Filter by caffeine level (only if any levels are selected)
    if (preferences.caffeineLevels && preferences.caffeineLevels.length > 0) {
        products = products.filter(p => {
            return preferences.caffeineLevels.some(level => matchesCaffeineLevel(p.caffeine, level));
        });
    }
    // If no caffeine levels selected, keep all products (don't filter)
    
    // Filter by selected brands (only if any brands are selected)
    if (preferences.selectedBrands && preferences.selectedBrands.length > 0) {
        products = products.filter(p => preferences.selectedBrands.includes(p.brand));
    }
    // If no brands selected, keep all products (don't filter)
    
    return products;
}

// Build a custom box based on preferences
function buildCustomBox(preferences, boxSize) {
    const filteredProducts = filterProducts(preferences);
    
    if (filteredProducts.length === 0) {
        return { items: [], total: 0, variety: 0 };
    }
    
    // Aggregate by brand with caffeine info
    const brandTotals = {};
    filteredProducts.forEach(p => {
        if (!brandTotals[p.brand]) {
            brandTotals[p.brand] = {
                brand: p.brand,
                totalCans: 0,
                caffeine: p.caffeine,
                avgCost: 0,
                costs: [],
                category: inventory.healthy.some(h => h.brand === p.brand) ? 'healthy' : 'regular'
            };
        }
        brandTotals[p.brand].totalCans += p.totalCans;
        brandTotals[p.brand].costs.push(p.costPerCan);
    });
    
    // Calculate average cost per brand
    Object.values(brandTotals).forEach(b => {
        b.avgCost = b.costs.reduce((a, c) => a + c, 0) / b.costs.length;
    });
    
    const availableBrands = Object.values(brandTotals);
    
    // Distribute box among brands
    const boxItems = [];
    
    // Shuffle brands for variety
    const shuffledBrands = [...availableBrands].sort(() => Math.random() - 0.5);
    
    // Target variety based on box size (aim for 4-6 cans per brand)
    const targetVariety = Math.min(shuffledBrands.length, Math.max(3, Math.ceil(boxSize / 5)));
    const selectedBrands = shuffledBrands.slice(0, targetVariety);
    
    // Distribute cans evenly, then randomly add remaining
    const basePerBrand = Math.floor(boxSize / selectedBrands.length);
    let extraCans = boxSize % selectedBrands.length;
    
    selectedBrands.forEach(brand => {
        let cansForBrand = basePerBrand;
        if (extraCans > 0) {
            cansForBrand++;
            extraCans--;
        }
        
        // Don't exceed available stock
        const actualCans = Math.min(cansForBrand, brand.totalCans);
        
        if (actualCans > 0) {
            boxItems.push({
                brand: brand.brand,
                quantity: actualCans,
                caffeine: brand.caffeine,
                costPerCan: brand.avgCost,
                category: brand.category
            });
        }
    });
    
    // If we couldn't fill the box, try adding more from available brands
    let currentTotal = boxItems.reduce((sum, item) => sum + item.quantity, 0);
    let attempts = 0;
    while (currentTotal < boxSize && attempts < 10) {
        for (const brand of shuffledBrands) {
            if (currentTotal >= boxSize) break;
            
            const existingItem = boxItems.find(item => item.brand === brand.brand);
            const currentQty = existingItem ? existingItem.quantity : 0;
            
            if (currentQty < brand.totalCans) {
                const canAdd = Math.min(boxSize - currentTotal, brand.totalCans - currentQty);
                if (existingItem) {
                    existingItem.quantity += canAdd;
                } else {
                    boxItems.push({
                        brand: brand.brand,
                        quantity: canAdd,
                        caffeine: brand.caffeine,
                        costPerCan: brand.avgCost,
                        category: brand.category
                    });
                }
                currentTotal += canAdd;
            }
        }
        attempts++;
    }
    
    return {
        items: boxItems,
        total: boxItems.reduce((sum, item) => sum + item.quantity, 0),
        variety: boxItems.length
    };
}

// Export for use in app.js
window.energxInventory = {
    inventory,
    brandLogos,
    brandColors,
    getUniqueBrands,
    getBrandsByCategory,
    filterProducts,
    buildCustomBox
};
