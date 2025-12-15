// State
let selectedCaffeine = [];
let selectedFlavors = [];
let boxSize = 12;
let boxContents = {}; // { brandName: quantity }
// Max items allowed per single brand (per energy drink)
const MAX_PER_BRAND = 2;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCaffeineButtons();
    initFlavorButtons();
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

// Flavor filter buttons
function initFlavorButtons() {
    document.querySelectorAll('.flavor-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const flavor = btn.dataset.flavor;
            btn.classList.toggle('border-purple-500');
            btn.classList.toggle('bg-purple-500/10');
            btn.classList.toggle('border-zinc-700');
            btn.classList.toggle('bg-zinc-800/50');
            
            if (selectedFlavors.includes(flavor)) {
                selectedFlavors = selectedFlavors.filter(f => f !== flavor);
            } else {
                selectedFlavors.push(flavor);
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
        // Determine if + should be disabled due to box full, per-brand cap, or stock
        const boxFull = getCurrentCount() >= boxSize;
        const atBrandCap = qty >= MAX_PER_BRAND;
        const outOfStock = qty >= brand.totalCans;
        const disablePlus = boxFull || atBrandCap || outOfStock;

        return `
            <div class="brand-card bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition ${qty > 0 ? 'border-purple-500/50 bg-purple-500/5' : ''}" data-brand="${brand.name}">
                <div class="flex items-center gap-4 mb-4">
                    ${getBrandLogo(brand.name, 'md')}
                    <div class="flex-1">
                        <div class="font-semibold">${brand.name}</div>
                        <div class="text-xs text-zinc-500">${brand.caffeine}mg ${levelEmoji}${atBrandCap ? ' • Max 2 per drink' : ''}</div>
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
                    <button onclick="adjustQty('${brand.name}', 1)" class="w-10 h-10 rounded-lg ${disablePlus ? 'bg-zinc-700 opacity-30 cursor-not-allowed' : 'bg-zinc-700 hover:bg-zinc-600'} transition flex items-center justify-center text-xl font-bold" ${disablePlus ? 'disabled' : ''}>
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
    
    // Can't exceed per-brand maximum
    if (delta > 0 && newQty > MAX_PER_BRAND) return;
    
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
            // Respect stock and MAX_PER_BRAND cap
            const maxCanAddForBrand = Math.max(0, Math.min(MAX_PER_BRAND - current, brand.totalCans - current));
            const available = Math.min(maxCanAddForBrand, perBrand, toAdd);
        
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
            const maxCanAddForBrand = Math.max(0, Math.min(MAX_PER_BRAND - current, brand.totalCans - current));
            const available = Math.min(maxCanAddForBrand, toAdd);
            
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
    const prices = { 6: 15, 12: 25 };
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
                                <button onclick="adjustQty('${brand}', 1)" class="w-7 h-7 rounded ${count >= boxSize || qty >= MAX_PER_BRAND ? 'bg-zinc-700 opacity-30 cursor-not-allowed' : 'bg-zinc-700 hover:bg-zinc-600'} transition text-sm" ${count >= boxSize || qty >= MAX_PER_BRAND ? 'disabled' : ''}>+</button>
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

// Subscribe action - opens order modal
function subscribe() {
    if (getCurrentCount() !== boxSize) return;
    openOrderModal();
}

// Open order modal
function openOrderModal() {
    const prices = { 6: 15, 12: 25 };
    const price = prices[boxSize];
    
    // Populate order summary
    const brands = Object.entries(boxContents).sort((a, b) => b[1] - a[1]);
    let summaryHtml = '';
    
    // Add preferences if any selected
    if (selectedCaffeine.length > 0) {
        summaryHtml += `<div class="flex justify-between text-xs"><span class="text-zinc-500">Caffeine:</span><span>${selectedCaffeine.join(', ')}</span></div>`;
    }
    if (selectedFlavors.length > 0) {
        summaryHtml += `<div class="flex justify-between text-xs mb-2"><span class="text-zinc-500">Flavors:</span><span>${selectedFlavors.join(', ')}</span></div>`;
    }
    
    // Add brands
    summaryHtml += brands
        .map(([brand, qty]) => `<div class="flex justify-between"><span>${brand}</span><span>${qty} cans</span></div>`)
        .join('');
    
    document.getElementById('order-summary-items').innerHTML = summaryHtml;
    
    document.getElementById('order-total').textContent = `$${price}`;
    document.getElementById('venmo-amount').textContent = `$${price}`;
    
    // Reset form
    document.getElementById('order-form').reset();
    document.getElementById('venmo-instructions').classList.add('hidden');
    
    // Show modal
    document.getElementById('order-modal').classList.remove('hidden');
    
    // Setup payment method toggle
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const venmoInstructions = document.getElementById('venmo-instructions');
            if (e.target.value === 'venmo') {
                venmoInstructions.classList.remove('hidden');
            } else {
                venmoInstructions.classList.add('hidden');
            }
        });
    });
}

// Close order modal
function closeOrderModal() {
    document.getElementById('order-modal').classList.add('hidden');
}

// Submit order
async function submitOrder(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-order-btn');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    const prices = { 6: 15, 12: 25 };
    
    // Prepare order data
    const orderData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        address: formData.get('address'),
        payment: formData.get('payment'),
        caffeinePreferences: selectedCaffeine.length > 0 ? selectedCaffeine.join(', ') : 'None',
        flavorPreferences: selectedFlavors.length > 0 ? selectedFlavors.join(', ') : 'None',
        boxSize: boxSize,
        total: prices[boxSize],
        items: Object.entries(boxContents).map(([brand, qty]) => `${brand}: ${qty}`).join(', '),
        timestamp: new Date().toISOString()
    };
    
    try {
        // Google Apps Script Web App URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdUSVay5qD16K-siN4Dx1KsriTypn14ZP4tjNfAaw1HCLd67EM5zmIyIbPvUl2KJnxxA/exec';
        
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        // Close order modal and show success
        closeOrderModal();
        document.getElementById('success-modal').classList.remove('hidden');
        
    } catch (error) {
        console.error('Order submission error:', error);
        alert('There was an error submitting your order. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
    }
}

// Close success modal
function closeModal() {
    document.getElementById('success-modal').classList.add('hidden');
    clearBox();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
