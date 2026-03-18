let products = [];

fetch('data/products.json')
    .then(res => res.json())
    .then(data => products = data);

function searchProduct() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let result = products.filter(p => p.name.toLowerCase().includes(input));
    displayResults(result);
}

function quickSearch(name) {
    document.getElementById("searchInput").value = name;
    searchProduct();
}

function displayResults(items) {
    let container = document.getElementById("results");
    container.innerHTML = "";

    items.forEach(product => {
        let card = document.createElement("div");
        card.className = "card";

        let html = `<h2>${product.name}</h2>
                    <img src="${product.image}" width="150"><br>`;

        product.platforms.forEach(p => {
            html += `
            <div class="platform ${p.name}">
                ${p.name.toUpperCase()} - ₹${p.priceINR} ($${p.priceUSD})
                <br>
                <a href="${p.link}" target="_blank">
                    <button>Buy</button>
                </a>
            </div>`;
        });

        html += `<button onclick='addToWishlist(${JSON.stringify(product)})'>❤️ Add to Wishlist</button>`;

        card.innerHTML = html;
        container.appendChild(card);
    });
}

function addToWishlist(product) {
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];
    list.push(product);
    localStorage.setItem("wishlist", JSON.stringify(list));
    loadWishlist();
}

function loadWishlist() {
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];
    let container = document.getElementById("wishlistItems");
    container.innerHTML = "";

    list.forEach(p => {
        let div = document.createElement("div");
        div.innerHTML = `<p>${p.name}</p>`;
        container.appendChild(div);
    });
}

loadWishlist();