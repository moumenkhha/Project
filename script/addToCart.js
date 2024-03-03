let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');   // The close Tab
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let listProducts = [];
let carts = []; // Store cart value


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');   // Toggle: On & Off
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="Bag">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">
                    Add To Cart
                </button>
            `;
            listProductHTML.appendChild(newProduct);    // Inject the new element into the listProduct

        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;   // Where the user clicked
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})


const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id); // To find its position in the cart. If not found, return -1
    if (carts.length <= 0) {    // Current shopping cart is empty
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0) { // Not in cart because position < 0
        carts.push({    // Add the item to the end of the array
            product_id: product_id,
            quantity: 1
        });
    } else {    // The item is already exist 
        carts[positionThisProductInCart].quantity += 1; // Increase its quantity by 1
    }
    addCartToHTML();    // Display shopping cart to the screen
    addCartToMemory();  // Saving data
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));    //JSON.stringify because Local storage does not store as arrays, so converting to json
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;  // For changing the cart red number
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    $${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span> 
                    <span class="plus">+</span>
            </div>
            `;
            listCartHTML.appendChild(newCart);  // Add it to listCart
        })
    }
    iconCartSpan.innerText = totalQuantity; // Modifying the red cart number
}
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) { // User clicked add's arrow or delete's
        let product_id = positionClick.parentElement.parentElement.dataset.id; // Calling parentElement twice to det dataset info
        let type = 'minus'; // Defualt value
        if (positionClick.classList.contains('plus')) { // If the user clicked the add arrow
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity += 1;
                break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {    // One item in the cart and it is deleted
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();  // Updating the memory
    addCartToHTML();    // Refresh the data on the screen
}
const initApp = () => {
    // Get data from json
    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();    // Display data on the screen

            //Get cart from memory
            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }


        })
}
initApp();
