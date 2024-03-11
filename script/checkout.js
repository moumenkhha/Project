let listCart = [];
let listProducts = [];

const initApp = () => {
    // Get data from json
    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
        })
}
initApp();  // Fetches product data from a JSON file

function checkCart() {
    const cartValue = localStorage.getItem('cart');
    if (cartValue && cartValue.length > 2) {
        listCart = JSON.parse(cartValue);
    }
}

checkCart();
addCartToHTML();

function addCartToHTML() {
    // Clear data from HTML
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';
    let totalQuantityHTML = document.querySelector('.totalQuantity')
    let totalPriceHTML = document.querySelector('.totalPrice')

    let totalQuantity = 0;
    let totalPrice = 0;

    // If a product in cart
    if (listCart) {
        listProducts.forEach(product => {
            if (product) {
                let newP = document.createElement('div');
                newP.classList.add('item');
                newP.innerHTML =
                    `  <img src="${product.image}" alt="">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}/1 product</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice">
                $${product.price * product.quantity}
                </div>`
                listCartHTML.appendChild(newP);
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}