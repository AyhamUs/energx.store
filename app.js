// State
let selectedCaffeine = [];
let boxSize = 24;
let boxContents = {}; // { brandName: quantity }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCaffeineButtons();
    initSizeButtons();
    renderBrandGrid();
    renderBrandsShowcase();
    updateUI();
});

// Caffeine filter buttons
function initCaffeineButtons() {
    document.querySelectorAll('.caffeine-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.caffeine;
            btn.classList.toggle('border-purple-500');
            btn.classList.toggle('bg-purple-500/10');
            btn.classList.toggle('border-zinc-700');
            btn.classList.toggle('bg-zinc-800/50');
            
            if (selectedCaffeine.includes(level)) {
                selectedCaffeine = selectedCaffeine.filter(l => l !== level);
            } else {
                selectedCaffeine.push(level);
            }
            
            renderBrandGrid();
        });
    });
}

// Size buttons
function initSizeButtons() {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => {
                b.classList.remove('border-purple-500', 'bg-purple-500/10');
                b.classList.add('border-zinc-700', 'bg-zinc-800/50');
            });
            btn.classList.remove('border-zinc-700', 'bg-zinc-800/50');
            btn.classList.add('border-purple-500', 'bg-purple-500/10');
            
            boxSize = parseInt(btn.dataset.size);
            document.getElementById('target-count').textContent = boxSize;
            updateUI();
        });
    });
}

// Render the brand selection grid
function renderBrandGrid() {
    const grid = document.getElementById('brand-grid');
    const brands = filterBrands(selectedCaffeine);
    
    grid.innerHTML = brands.map(brand => {
        const qty = boxContents[brand.name] || 0;
        const caffeineLevel = getCaffeineLevel(brand.caffeine);
        const levelEmoji = caffeineLevel === 'low' ? '☕' : caffeineLevel === 'medium' ? '⚡' : '🔥';
        
        return `
            <div class="brand-card bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition ${qty > 0 ? 'border-purple-500/50 bg-purple-500/5' : ''}" data-brand="${brand.name}">
                <div class="flex items-center gap-4 mb-4">
                    ${getBrandLogo(brand.name, 'md')}
                    <div class="flex-1">
                        <div class="font-semibold">${brand.name}</div>
                        <div class="text-xs text-zinc-500">${brand.caffeine}mg ${levelEmoji}</div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <button onclick="adjustQty('${brand.name}', -1)" class="w-10 h-10 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition flex items-center justify-center text-xl font-bold ${qty === 0 ? 'opacity-30 cursor-not-allowed' : ''}">
                        −
                    </button>
                    <div class="flex-1 text-center">
                        <span class="text-2xl font-bold ${qty > 0 ? 'text-purple-400' : 'text-zinc-500'}">${qty}</span>
                        <span class="text-xs text-zinc-500 block">cans</span>
                    </div>
                    <button onclick="adjustQty('${brand.name}', 1)" class="w-10 h-10 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition flex items-center justify-center text-xl font-bold ${getCurrentCount() >= boxSize ? 'opacity-30 cursor-not-allowed' : ''}">
                        +
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Adjust quantity for a brand
function adjustQty(brand, delta) {
    const current = boxContents[brand] || 0;
    const newQty = current + delta;
    const totalCount = getCurrentCount();
    
    // Can't go below 0
    if (newQty < 0) return;
    
    // Can't exceed box size
    if (delta > 0 && totalCount >= boxSize) return;
    
    // Check stock availability
    const brandData = getBrandData().find(b => b.name === brand);
    if (delta > 0 && newQty > brandData.totalCans) return;
    
    if (newQty === 0) {
        delete boxContents[brand];
    } else {
        boxContents[brand] = newQty;
    }
    
    renderBrandGrid();
    updateUI();
}

// Get current total count
function getCurrentCount() {
    return Object.values(boxContents).reduce((sum, qty) => sum + qty, 0);
}

// Auto-fill the box
function autoFill() {
    const remaining = boxSize - getCurrentCount();
    if (remaining <= 0) return;
    
    const brands = filterBrands(selectedCaffeine);
    if (brands.length === 0) return;
    
    // Distribute evenly among available brands
    const perBrand = Math.ceil(remaining / brands.length);
    let toAdd = remaining;
    
    for (const brand of brands) {
        if (toAdd <= 0) break;
        
        const current = boxContents[brand.name] || 0;
        const available = Math.min(brand.totalCans - current, perBrand, toAdd);
        
        if (available > 0) {
            boxContents[brand.name] = current + available;
            toAdd -= available;
        }
    }
    
    // If still remaining, try to fill from brands with more stock
    if (toAdd > 0) {
        for (const brand of brands.sort((a, b) => b.totalCans - a.totalCans)) {
            if (toAdd <= 0) break;
            
            const current = boxContents[brand.name] || 0;
            const available = Math.min(brand.totalCans - current, toAdd);
            
            if (available > 0) {
                boxContents[brand.name] = current + available;
                toAdd -= available;
            }
        }
    }
    
    renderBrandGrid();
    updateUI();
}

// Clear the box
function clearBox() {
    boxContents = {};
    renderBrandGrid();
    updateUI();
}

// Update all UI elements
function updateUI() {
    const count = getCurrentCount();
    const progress = (count / boxSize) * 100;
    
    // Update count display
    document.getElementById('current-count').textContent = count;
    document.getElementById('target-count').textContent = boxSize;
    
    // Update progress bar
    document.getElementById('progress-bar').style.width = `${Math.min(progress, 100)}%`;
    
    // Update summary
    renderSummary();
    
    // Update subscribe button
    const subscribeBtn = document.getElementById('subscribe-btn');
    if (count === boxSize) {
        subscribeBtn.disabled = false;
        subscribeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        subscribeBtn.disabled = true;
        subscribeBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Render box summary
function renderSummary() {
    const summary = document.getElementById('box-summary');
    const count = getCurrentCount();
    
    if (count === 0) {
        summary.innerHTML = `
            <div class="text-center py-12 text-zinc-500">
                Add some drinks to your box to see your summary
            </div>
        `;
        return;
    }
    
    const brands = Object.entries(boxContents).sort((a, b) => b[1] - a[1]);
    const prices = { 12: 29, 24: 49, 36: 69 };
    const price = prices[boxSize];
    
    summary.innerHTML = `
        <div class="grid gap-3 mb-6">
            ${brands.map(([brand, qty]) => {
                const data = brandData[brand] || { logo: null, bg: '#666', initials: brand.substring(0, 2).toUpperCase() };
                const logoHtml = data.logo 
                    ? `<div class="w-8 h-8 rounded-lg flex items-center justify-center bg-white p-1">
                        <img src="${data.logo}" alt="${brand}" class="w-6 h-6 object-contain">
                       </div>`
                    : `<div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style="background-color: ${data.bg}; color: #fff">
                        ${data.initials}
                       </div>`;
                return `
                    <div class="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3">
                        <div class="flex items-center gap-3">
                            ${logoHtml}
                            <span class="font-medium">${brand}</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-zinc-400">${qty} cans</span>
                            <div class="flex gap-1">
                                <button onclick="adjustQty('${brand}', -1)" class="w-7 h-7 rounded bg-zinc-700 hover:bg-zinc-600 transition text-sm">−</button>
                                <button onclick="adjustQty('${brand}', 1)" class="w-7 h-7 rounded bg-zinc-700 hover:bg-zinc-600 transition text-sm ${count >= boxSize ? 'opacity-30' : ''}">+</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="flex justify-between items-center pt-4 border-t border-zinc-700">
            <div>
                <div class="text-sm text-zinc-400">Total: ${count}/${boxSize} cans</div>
                ${count < boxSize ? `<div class="text-xs text-yellow-500">Add ${boxSize - count} more to complete your box</div>` : ''}
                ${count === boxSize ? `<div class="text-xs text-green-500">✓ Box complete!</div>` : ''}
            </div>
            <div class="text-right">
                <div class="text-2xl font-bold">$${price}</div>
                <div class="text-xs text-zinc-500">/month</div>
            </div>
        </div>
    `;
}

// Render brands showcase
function renderBrandsShowcase() {
    const showcase = document.getElementById('brands-showcase');
    const brands = getBrandData();
    
    showcase.innerHTML = brands.map(brand => `
        <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col items-center hover:border-zinc-700 transition">
            ${getBrandLogo(brand.name, 'lg')}
            <div class="mt-3 text-sm font-medium text-center">${brand.name}</div>
            <div class="text-xs text-zinc-500">${brand.caffeine}mg</div>
        </div>
    `).join('');
}

// Subscribe action
function subscribe() {
    if (getCurrentCount() !== boxSize) return;
    document.getElementById('success-modal').classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('success-modal').classList.add('hidden');
    clearBox();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
