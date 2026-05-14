// Xbox France - Product Data and Rendering
const affiliateTag = "matnix-21"; // Amazon France Associate ID

// Reliable placeholder images for products
const placeholderImages = [
    { rank: 1, name: "Robot White", color: "#e8e8e8", text: "XB" },
    { rank: 2, name: "Carbon Black", color: "#1a1a1a", text: "XB" },
    { rank: 3, name: "Elite 2", color: "#2d2d2d", text: "ELITE" },
    { rank: 4, name: "Elite Core", color: "#ffffff", text: "ELITE" },
    { rank: 5, name: "Series S", color: "#107C10", text: "XS" },
    { rank: 6, name: "Adaptive", color: "#0078d4", text: "AA" },
    { rank: 7, name: "Core", color: "#4a4a4a", text: "CORE" },
    { rank: 8, name: "eSwap", color: "#ff5722", text: "TS" },
    { rank: 9, name: "Wolverine", color: "#00c853", text: "RZ" },
    { rank: 10, name: "PowerA", color: "#9c27b0", text: "PWR" }
];

// Generate SVG placeholder for product
function getProductImage(product) {
    const info = placeholderImages.find(p => p.rank === product.rank) || { color: "#333333", text: product.name.substring(0, 2).toUpperCase() };
    
    // Create a nice SVG placeholder that looks like a product
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
        <defs>
            <linearGradient id="grad${product.rank}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${info.color};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${info.color}dd;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="url(#grad${product.rank})"/>
        <text x="60" y="55" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">${info.text}</text>
        <text x="60" y="75" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" opacity="0.8">Xbox Controller</text>
        <rect x="10" y="90" width="100" height="4" rx="2" fill="white" opacity="0.3"/>
        <rect x="10" y="90" width="${product.rating * 20}" height="4" rx="2" fill="#FFD700"/>
    </svg>`;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        renderComparisonTable(data.products);
        renderDetailedReviews(data.products);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-container').innerHTML = '<p>Erreur lors du chargement des produits.</p>';
    }
}

// Render the comparison table
function renderComparisonTable(products) {
    const container = document.getElementById('products-container');
    let html = '';

    products.forEach(product => {
        const amazonLink = product.amazon_url.includes('?') 
            ? `${product.amazon_url}&tag=${affiliateTag}`
            : `${product.amazon_url}?tag=${affiliateTag}`;
        
        const imageSrc = getProductImage(product);

        html += `
            <tr class="product-row">
                <td class="rank">#${product.rank}</td>
                <td class="product-name">
                    <strong>${product.name}</strong>
                    <span class="type-badge">${product.type}</span>
                </td>
                <td class="product-image">
                    <img src="${imageSrc}" alt="${product.name}" loading="lazy">
                </td>
                <td class="price">
                    <span class="price-value">${product.price_eur}€</span>
                </td>
                <td class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span class="rating-value">${product.rating}/5</span>
                </td>
                <td class="reviews">${product.reviews.toLocaleString()} avis</td>
                <td class="type">${product.type}</td>
                <td class="action">
                    <a href="${amazonLink}" target="_blank" rel="nofollow sponsored" class="btn-buy">
                        Voir le Prix
                    </a>
                </td>
            </tr>
        `;
    });

    container.innerHTML = html;
}

// Render detailed reviews
function renderDetailedReviews(products) {
    const container = document.getElementById('reviews-container');
    let html = '';

    products.forEach(product => {
        const amazonLink = product.amazon_url.includes('?') 
            ? `${product.amazon_url}&tag=${affiliateTag}`
            : `${product.amazon_url}?tag=${affiliateTag}`;
        
        const imageSrc = getProductImage(product);

        // Create pros/cons list items
        const prosHtml = product.pros.map(pro => `<li>✓ ${pro}</li>`).join('');
        const consHtml = product.cons.map(cons => `<li>✗ ${cons}</li>`).join('');

        html += `
            <article class="review-card" id="product-${product.rank}">
                <div class="review-header">
                    <div class="rank-badge">#${product.rank}</div>
                    <h3>${product.name}</h3>
                    <div class="review-meta">
                        <span class="price-tag">${product.price_eur}€</span>
                        <span class="rating-badge">⭐ ${product.rating}/5</span>
                    </div>
                </div>

                <div class="review-content">
                    <div class="product-image-main">
                        <img src="${imageSrc}" alt="${product.name}">
                    </div>

                    <div class="review-details">
                        <h4>Caractéristiques</h4>
                        <ul class="features-list">
                            ${product.features.map(f => `<li>• ${f}</li>`).join('')}
                        </ul>

                        <div class="pros-cons">
                            <div class="pros">
                                <h5>✓ Avantages</h5>
                                <ul>${prosHtml}</ul>
                            </div>
                            <div class="cons">
                                <h5>✗ Inconvénients</h5>
                                <ul>${consHtml}</ul>
                            </div>
                        </div>

                        <a href="${amazonLink}" target="_blank" rel="nofollow sponsored" class="btn-buy-full">
                            Acheter sur Amazon 🚀
                        </a>
                    </div>
                </div>
            </article>
        `;
    });

    container.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', loadProducts);