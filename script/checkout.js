let listCart = [];
// Get data cart from LocalStorage

fetch('../json/products.json')
    .then(response => response.json())
    .then(data => {
        listCart = data;
    })

    console.log(listCart);

// if (localStorage.getItem('cart')) {
//     listCart = JSON.parse(localStorage.getItem('cart'));
// }

// newCart.dataset.id = cart.product_id;
// let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
// let info = listProducts[positionProduct];


addCartToHTML();

function addCartToHTML() {

    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';    // Clear data from HTML
    let totalQuantityHTML = document.querySelector('.totalQuantity')
    let totalPriceHTML = document.querySelector('.totalPrice')

    let totalQuantity = 0;
    let totalPrice = 0;

    // If a product in cart
    // if (listCart.length > 0) {
    listCart.forEach(product => {
        // if (product) {
        let newP = document.createElement('div');
        newP.classList.add('item');
        newP.innerHTML = `
            <img src="${product.image}" alt="">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}/1 product</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice">
                $${product.price * product.quantity}
                </div>`;
        listCartHTML.appendChild(newP);
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
        // }
    })
    // }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}

