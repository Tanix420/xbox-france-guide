// Xbox France - Product Data and Rendering
const affiliateTag = "matnix-21"; // Amazon France Associate ID

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

        html += `
            <tr class="product-row">
                <td class="rank">#${product.rank}</td>
                <td class="product-name">
                    <strong>${product.name}</strong>
                    <span class="type-badge">${product.type}</span>
                </td>
                <td class="product-image">
                    <img src="${product.image_url}" alt="${product.name}" loading="lazy">
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
                        <img src="${product.image_url}" alt="${product.name}">
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