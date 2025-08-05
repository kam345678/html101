const productsContainer = document.getElementById("products");
const ctx = document.getElementById("priceChart").getContext("2d");

async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        displayProducts(data);
        generateChart(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title.substring(0, 20)}...</h4>
            <p>$${product.price}</p>
        `;
        productsContainer.appendChild(card);
    });
}

function generateChart(products) {
    const labels = products.map(p => p.title.substring(0, 10));
    const prices = products.map(p => p.price);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Product Prices',
                data: prices,
                backgroundColor: 'rgba(0, 119, 211, 0.6)',
                borderColor: '#0077d3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Price Distribution' }
            }
        }
    });
}

fetchProducts();