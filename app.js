// Energx App - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    initializeBrandOptions();
    initializeBrandsShowcase();
    setupFormListeners();
    setupNavigation();
});

// Get brand logo HTML with fallback
function getBrandLogoHTML(brand, size = 'md') {
    const logos = window.energxInventory.brandLogos;
    const colors = window.energxInventory.brandColors;
    const brandColor = colors[brand] || { bg: '#6366f1', text: '#fff' };
    
    const sizes = {
        'sm': { container: 'w-8 h-8', text: 'text-xs', img: 'max-h-5' },
        'md': { container: 'w-12 h-12', text: 'text-sm', img: 'max-h-8' },
        'lg': { container: 'w-16 h-16', text: 'text-lg', img: 'max-h-12' }
    };
    
    const s = sizes[size] || sizes.md;
    const initials = brand.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    
    // Use a colored fallback with initials since logo URLs may not work
    return `
        <div class="${s.container} rounded-xl flex items-center justify-center font-bold ${s.text} overflow-hidden"
             style="background: ${brandColor.bg}; color: ${brandColor.text}">
            ${initials}
        </div>
    `;
}

// Initialize brand checkbox options in the preference form
function initializeBrandOptions() {
    const brandGrid = document.getElementById('brand-options');
    const brands = window.energxInventory.getUniqueBrands();
    
    brands.forEach(brandInfo => {
        const label = document.createElement('label');
        label.className = 'cursor-pointer';
        label.innerHTML = `
            <input type="checkbox" name="brand" value="${brandInfo.brand}" class="hidden peer">
            <span class="flex items-center gap-2 p-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl peer-checked:border-purple-500 peer-checked:bg-purple-500/10 hover:border-slate-600 transition-all">
                ${getBrandLogoHTML(brandInfo.brand, 'sm')}
                <span class="text-sm font-medium truncate">${brandInfo.brand}</span>
            </span>
        `;
        
        brandGrid.appendChild(label);
    });
}

// Initialize brands showcase section
function initializeBrandsShowcase() {
    const showcase = document.getElementById('brands-showcase');
    const brands = window.energxInventory.getUniqueBrands();
    
    brands.forEach(brandInfo => {
        const card = document.createElement('div');
        card.className = 'group bg-slate-900/50 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1';
        card.innerHTML = `
            <div class="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                ${getBrandLogoHTML(brandInfo.brand, 'lg')}
            </div>
            <h4 class="font-bold mb-2">${brandInfo.brand}</h4>
            <span class="text-sm text-emerald-400 font-medium">${brandInfo.caffeine}mg caffeine</span>
            <div class="mt-2">
                <span class="text-xs px-2 py-1 rounded-full ${brandInfo.category === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}">
                    ${brandInfo.category === 'healthy' ? '🌿 Health' : '⚡ Classic'}
                </span>
            </div>
        `;
        showcase.appendChild(card);
    });
}

// Setup form event listeners
function setupFormListeners() {
    const form = document.getElementById('preference-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        generateBox();
    });
}

// Generate custom box based on preferences
function generateBox() {
    // Collect preferences
    const caffeineInputs = document.querySelectorAll('input[name="caffeine"]:checked');
    const caffeineLevels = Array.from(caffeineInputs).map(i => i.value);
    
    const brandInputs = document.querySelectorAll('input[name="brand"]:checked');
    const selectedBrands = Array.from(brandInputs).map(i => i.value);
    
    const drinkTypeInputs = document.querySelectorAll('input[name="drinkType"]:checked');
    const drinkTypes = Array.from(drinkTypeInputs).map(i => i.value);
    
    const boxSizeInput = document.querySelector('input[name="boxSize"]:checked');
    const boxSize = boxSizeInput ? parseInt(boxSizeInput.value) : 24;
    
    const preferences = {
        caffeineLevels,
        selectedBrands,
        drinkTypes
    };
    
    // Build the box
    const box = window.energxInventory.buildCustomBox(preferences, boxSize);
    
    // Display the box
    displayBox(box, boxSize);
}

// Display the generated box
function displayBox(box, boxSize) {
    const preview = document.getElementById('box-preview');
    const contents = document.getElementById('box-contents');
    const countEl = document.getElementById('box-count');
    const varietyEl = document.getElementById('box-variety');
    const priceEl = document.getElementById('box-price');
    
    // Clear previous contents
    contents.innerHTML = '';
    
    if (box.items.length === 0) {
        contents.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-5xl mb-4">😕</p>
                <p class="text-slate-400">No drinks match your preferences. Try adjusting your filters!</p>
            </div>
        `;
        preview.classList.remove('hidden');
        return;
    }
    
    // Calculate total and price
    const totalCans = box.items.reduce((sum, item) => sum + item.quantity, 0);
    const prices = { 12: '$29', 24: '$49', 36: '$69' };
    
    // Update summary
    countEl.textContent = `${totalCans} drinks`;
    varietyEl.textContent = `${box.variety} different ${box.variety === 1 ? 'brand' : 'brands'}`;
    priceEl.textContent = `${prices[boxSize] || '$49'}/month`;
    
    // Add each item to the box
    box.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all';
        itemEl.innerHTML = `
            ${getBrandLogoHTML(item.brand, 'md')}
            <div class="flex-1 min-w-0">
                <h4 class="font-bold truncate">${item.brand}</h4>
                <p class="text-sm text-emerald-400">${item.caffeine}mg caffeine</p>
            </div>
            <span class="text-xl font-black text-purple-400">×${item.quantity}</span>
        `;
        contents.appendChild(itemEl);
    });
    
    // Show the preview
    preview.classList.remove('hidden');
    
    // Scroll to preview
    preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Regenerate box with same preferences but different randomization
function regenerateBox() {
    generateBox();
}

// Subscribe action
function subscribe() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
}

// Setup smooth navigation
function setupNavigation() {
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // CTA buttons navigation
    document.querySelectorAll('.nav-cta, .hero-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('#customize').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Plan buttons
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const planCard = btn.closest('.plan-card') || btn.closest('div');
            const planHeader = planCard.querySelector('h3');
            if (planHeader) {
                const planName = planHeader.textContent;
                const sizeMap = { 'Starter': '12', 'Regular': '24', 'Power User': '36' };
                
                // Select the corresponding box size
                const sizeRadio = document.querySelector(`input[name="boxSize"][value="${sizeMap[planName]}"]`);
                if (sizeRadio) {
                    sizeRadio.checked = true;
                }
            }
            
            document.querySelector('#customize').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('success-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
