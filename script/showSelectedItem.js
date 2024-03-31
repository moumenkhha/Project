document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/Phase 1 (M.Reyad)/json/items.json");
    const books = await response.json();

    const searchBar = document.querySelector("#search-form");
    const mainPageMainTag = document.querySelector("#mainPageMainTag");
    const logoImg = document.querySelector("#logoImg");
    logoImg.addEventListener("click", () => {
        window.location.href = "/Phase 1 (M.Reyad)/html/index.html";
    });

    let desiredBook;

    if (searchBar) {
        searchBar.addEventListener("change", () => {
            const booksAvailable = document.querySelectorAll("li");

            booksAvailable.forEach(book => {
                if (book.textContent === searchBar.value) {
                    mainPageMainTag.innerHTML = "";
                    mainPageMainTag.classList.add("mainToDisplay");
                    addToHTML(book.textContent);
                };
            });
        });
    };

    function addToHTML(bookName) {
        desiredBook = books.find(book => book.title === bookName);


        localStorage.setItem("bookData", JSON.stringify(desiredBook));


        const bookInfoDiv = document.createElement("div");
        bookInfoDiv.classList.add("bookInfoDiv");
        bookInfoDiv.innerHTML = `
<img src="https://freesvg.org/img/1488216538.png" alt="">
<table>
    <tr>
        <td>Title</td>
        <td>${desiredBook.title}</td>
    </tr>
    <tr>
        <td>Author(s)</td>
        <td>${desiredBook.authors}</td>
    <tr>
        <td>ISBN</td>
        <td>${desiredBook.isbn}</td>
    </tr>
    <tr>
        <td>publisher</td>
        <td>${desiredBook.publisher}</td>
    </tr>
    <tr>
        <td>price</td>
        <td>${desiredBook.price} QR</td>
    </tr>
    <!-- <tr>
         <td>Quantity Available</td>
         <td id="QAinTable">${desiredBook.quantity}</td>
     </tr> -->
</table>
`;
        const addToCartBtnDiv = document.createElement('div');
        addToCartBtnDiv.classList.add("addToCartBtnDiv");
        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.classList.add("addToCartBtn");
        addToCartBtnDiv.append(addToCartBtn);
        mainPageMainTag.append(bookInfoDiv, addToCartBtnDiv);

        addToCartBtn.addEventListener("click", () => {
            if (localStorage.getItem("userData")) {
                addToCartBtn.remove();
                bookInfoDiv.append(purchaseDetails());


                const cancelBtn = document.querySelector(".cancelBtn");
                const confirmBtn = document.querySelector(".confirmBtn");



                cancelBtn.addEventListener("click", () => {
                    alert("Cancelled successfully. Redirected to Main");
                    window.location.href = "/Phase 1 (M.Reyad)/html/index.html";
                });
            } else {
                alert("Please login first");
            }
        });

    };

    function purchaseDetails() {

        const checkOut = document.createElement("div");
        checkOut.classList.add("checkOut");
        checkOut.innerHTML = `
<form id="purchaseForm" class="checkOut">
<h1>Check Out</h1>
<label for="zone">Zone</label>
<input type="number" name="zone" id="zone" required>

<label for="street">Street</label>
<input type="number" name="street" id="street" required>

<label for="building">Building</label>
<input type="number" name="building" id="building" required>

<label for="unit">Unit</label>
<input type="number" name="unit" id="unit" required>

<label for="userQuantity">Quantity: </label>
<input type="number" name="quantity" id="userQuantity" placeholder="Choose a Quantity..." required>


<label for="price">Price/Book: </label>
<input type="number" name="price" id="price" value="${JSON.parse(localStorage.getItem("bookData")).price}" disabled>

<label for="totalPrice">Total Price: </label>
<input type="number" name="totalPrice" id="totalPrice" disabled>

<button type="submit" class="confirmBtn">Confirm The Order</button>
<button class="cancelBtn">Cancel The Order</button>
</form>
`;


        const quantityInput = checkOut.querySelector("#userQuantity");
        const totalPriceInput = checkOut.querySelector("#totalPrice");
        const confirmBtn = checkOut.querySelector(".confirmBtn");

        quantityInput.addEventListener("input", () => {
            const pricePerBook = JSON.parse(localStorage.getItem("bookData")).price;

            totalPriceInput.value = pricePerBook * quantityInput.value;

        });

        confirmBtn.addEventListener("click", () => {
            const isAnyInputMissing = [...document.querySelectorAll('input[required]')].some(input => !input.value.trim());
            isAnyInputMissing ? alert('You missed at least one input.') : purchaseCheck(totalPriceInput.value, quantityInput.value);

        });
        return checkOut;
    };


    function purchaseCheck(totalPrice, quantity) {
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (userData.balance < totalPrice) { alert("You don't have enough balance"); } else if (quantity > desiredBook.quantity) {
            alert("No enough quantity");
        } else {
            desiredBook.quantity -= quantity; // Return to fix
            userData.balance -= totalPrice;
            localStorage.setItem("userData", JSON.stringify(userData));

            let newHistory = [{
                date: new Date(Date.now() + 3 * 3600000).toISOString().slice(0, 16).replace('T', ' '),
                bookTitle: desiredBook.title,
                quantity: quantity,
                totalPrice: totalPrice,
            }];
            if (localStorage.getItem("userHistory")) {
                const oldHistroy = JSON.parse(localStorage.getItem("userHistory"));
                newHistory.push(...oldHistroy);
            }
            localStorage.setItem("userHistory", JSON.stringify(newHistory));
            alert(("Order Confirmed. Redirecting to Main"));

        };
    };


});