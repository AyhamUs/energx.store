// Brand logos and styling
const brandData = {
    'Gorilla Mind': { logo: 'logos/gorillamind.png', bg: '#1a1a2e', initials: 'GM' },
    'Monster': { logo: 'logos/monster.png', bg: '#95d600', initials: 'M' },
    'Monster Juice': { logo: 'logos/monster.png', bg: '#f7931e', initials: 'MJ' },
    'Redbull': { logo: 'logos/redbull.png', bg: '#db0a40', initials: 'RB' },
    'Bang': { logo: 'logos/bang.png', bg: '#ff006e', initials: 'B' },
    'C4': { logo: 'logos/c4.png', bg: '#00bfff', initials: 'C4' },
    'ZOA': { logo: 'logos/zoa.png', bg: '#ffd700', initials: 'ZOA' },
    'Rockstar': { logo: 'logos/rockstar.png', bg: '#ffd700', initials: 'RS' },
    'Ryse': { logo: 'logos/ryse.png', bg: '#e63946', initials: 'RY' },
    'Alani': { logo: 'logos/alani.png', bg: '#ff69b4', initials: 'AL' },
    'Celsius': { logo: 'logos/celsius.png', bg: '#ff4500', initials: 'CL' },
    'Reign': { logo: 'logos/reign.png', bg: '#8b00ff', initials: 'RN' },
    'Ghost': { logo: 'logos/ghost.png', bg: '#00ff88', initials: 'GH' },
    'Bucked Up': { logo: 'logos/buckedup.png', bg: '#ff1493', initials: 'BU' },
    'Bloom': { logo: 'logos/bloom.png', bg: '#ff85a2', initials: 'BL' },
    'Guru': { logo: 'logos/guru.png', bg: '#32cd32', initials: 'GU' },
    'Gorgie': { logo: 'logos/gorgie.png', bg: '#ffb347', initials: 'GO' },
    'PHX': { logo: 'logos/phx.png', bg: '#4169e1', initials: 'PHX' },
    'LifeAid': { logo: 'logos/lifeaid.png', bg: '#228b22', initials: 'LA' },
    'Lucky': { logo: 'logos/lucky.png', bg: '#00ced1', initials: 'LK' },
    'Accelerator': { logo: 'logos/accelerator.png', bg: '#9932cc', initials: 'AC' },
    'Riot': { logo: 'logos/riot.png', bg: '#dc143c', initials: 'RT' },
    'Redcon1': { logo: 'logos/redcon1.png', bg: '#b22222', initials: 'RC' },
    'Omni': { logo: 'logos/omni.png', bg: '#4682b4', initials: 'OM' }
};

// Add Bubblr brand
brandData['Bubblr'] = { logo: 'logos/bubblr.png', bg: '#00bcd4', initials: 'BB' };

// Keep brandColors for backwards compatibility
const brandColors = brandData;

// Inventory data parsed from CSV
const inventory = [
    { brand: 'Gorilla Mind', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 200 },
    { brand: 'Gorilla Mind', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 200 },
    { brand: 'Monster Juice', flavors: 2, cansPerFlavor: 5, totalCans: 15, caffeine: 150 },
    { brand: 'Redbull', flavors: 3, cansPerFlavor: 8, totalCans: 24, caffeine: 80 },
    { brand: 'Bang', flavors: 4, cansPerFlavor: 6, totalCans: 24, caffeine: 300 },
    { brand: 'C4', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 200 },
    { brand: 'ZOA', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 160 },
    { brand: 'Rockstar', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 240 },
    { brand: 'C4', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 200 },
    { brand: 'C4', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 200 },
    { brand: 'Ryse', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 200 },
    { brand: 'Monster', flavors: 3, cansPerFlavor: 5, totalCans: 15, caffeine: 150 },
    { brand: 'Monster', flavors: 3, cansPerFlavor: 5, totalCans: 15, caffeine: 150 },
    { brand: 'Monster', flavors: 3, cansPerFlavor: 5, totalCans: 15, caffeine: 150 },
    { brand: 'Monster', flavors: 3, cansPerFlavor: 8, totalCans: 24, caffeine: 150 },
    { brand: 'Alani', flavors: 3, cansPerFlavor: 4, totalCans: 12, caffeine: 200 },
    { brand: 'Alani', flavors: 3, cansPerFlavor: 6, totalCans: 18, caffeine: 200 },
    { brand: 'Celsius', flavors: 3, cansPerFlavor: 6, totalCans: 18, caffeine: 200 },
    { brand: 'Celsius', flavors: 3, cansPerFlavor: 6, totalCans: 18, caffeine: 200 },
    { brand: 'Reign', flavors: 3, cansPerFlavor: 4, totalCans: 12, caffeine: 300 },
    { brand: 'Reign', flavors: 3, cansPerFlavor: 8, totalCans: 24, caffeine: 300 },
    { brand: 'Ghost', flavors: 3, cansPerFlavor: 5, totalCans: 15, caffeine: 200 },
    { brand: 'Ghost', flavors: 3, cansPerFlavor: 6, totalCans: 18, caffeine: 200 },
    { brand: 'Bucked Up', flavors: 3, cansPerFlavor: 5, totalCans: 15, caffeine: 300 },
    { brand: 'Bloom', flavors: 4, cansPerFlavor: 6, totalCans: 24, caffeine: 200 },
    { brand: 'Guru', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 140 },
    { brand: 'Guru', flavors: 4, cansPerFlavor: 3, totalCans: 12, caffeine: 140 },
    { brand: 'Gorgie', flavors: 3, cansPerFlavor: 4, totalCans: 12, caffeine: 150 },
    { brand: 'Gorgie', flavors: 3, cansPerFlavor: 4, totalCans: 12, caffeine: 150 },
    { brand: 'PHX', flavors: 6, cansPerFlavor: 4, totalCans: 24, caffeine: 200 },
    { brand: 'LifeAid', flavors: 4, cansPerFlavor: 6, totalCans: 24, caffeine: 200 },
    { brand: 'Lucky', flavors: 5, cansPerFlavor: 2, totalCans: 10, caffeine: 200 },
    { brand: 'Accelerator', flavors: 3, cansPerFlavor: 4, totalCans: 12, caffeine: 200 },
    { brand: 'Riot', flavors: 5, cansPerFlavor: 2, totalCans: 12, caffeine: 160 },
    { brand: 'Redcon1', flavors: 3, cansPerFlavor: 4, totalCans: 12, caffeine: 200 },
    { brand: 'Omni', flavors: 3, cansPerFlavor: 4, totalCans: 12, caffeine: 200 },
    { brand: 'Omni', flavors: 3, cansPerFlavor: 4, totalCans: 12, caffeine: 200 }
    ,{ brand: 'Bubblr', flavors: 3, cansPerFlavor: 2, totalCans: 20, caffeine: 69 }
];

// Get aggregated brand data
function getBrandData() {
    const brands = {};
    
    inventory.forEach(item => {
        const brand = item.brand;
        if (!brands[brand]) {
            brands[brand] = {
                name: brand,
                totalCans: 0,
                caffeine: item.caffeine,
                ...brandColors[brand] || { bg: '#666', color: '#fff', initials: brand.substring(0, 2).toUpperCase() }
            };
        }
        brands[brand].totalCans += item.totalCans;
    });
    
    return Object.values(brands).sort((a, b) => b.totalCans - a.totalCans);
}

// Get caffeine level category
function getCaffeineLevel(mg) {
    if (mg <= 150) return 'low';
    if (mg <= 200) return 'medium';
    return 'high';
}

// Filter brands by caffeine preference
function filterBrands(caffeineLevels = []) {
    const allBrands = getBrandData();
    
    // If no caffeine filter, return all brands
    if (caffeineLevels.length === 0) {
        return allBrands;
    }
    
    return allBrands.filter(brand => {
        const level = getCaffeineLevel(brand.caffeine);
        return caffeineLevels.includes(level);
    });
}

// Get brand logo HTML
function getBrandLogo(brand, size = 'md') {
    const data = brandData[brand] || { logo: null, bg: '#666', initials: brand.substring(0, 2).toUpperCase() };
    const sizes = {
        sm: { container: 'w-8 h-8', img: 'w-6 h-6', text: 'text-xs' },
        md: { container: 'w-12 h-12', img: 'w-10 h-10', text: 'text-sm' },
        lg: { container: 'w-16 h-16', img: 'w-14 h-14', text: 'text-base' }
    };
    const s = sizes[size];
    
    if (data.logo) {
        return `<div class="${s.container} rounded-xl flex items-center justify-center bg-white p-1">
                    <img src="${data.logo}" alt="${brand}" class="${s.img} object-contain" onerror="this.parentElement.innerHTML='<span class=\\'${s.text} font-bold text-zinc-800\\'>${data.initials}</span>'">
                </div>`;
    }
    
    return `<div class="${s.container} rounded-xl flex items-center justify-center font-bold ${s.text}" 
                style="background-color: ${data.bg}; color: #fff">
                ${data.initials}
            </div>`;
}
