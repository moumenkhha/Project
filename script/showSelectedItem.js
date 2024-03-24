document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/Phase 1 (M.Reyad)/json/items.json");
    const books = await response.json();


    const searchBar = document.querySelector("#search-form");
    const mainPageMainTag = document.querySelector("#mainPageMainTag");



    if (searchBar) {
        searchBar.addEventListener("change", () => {
            const booksAvailable = document.querySelectorAll("li");

            booksAvailable.forEach(book => {
                if (book.textContent === searchBar.value) {
                    // window.location.href = "/toBuy.html";
                    mainPageMainTag.innerHTML = "";
                    mainPageMainTag.classList.add("mainToDisplay");
                    addToHTML(book.textContent);
                };
            });
        });
    };

    function addToHTML(bookName) {
        const desiredBook = books.find(book => book.title === bookName);
        console.log(desiredBook);

        const bookInfoDiv = document.createElement("div");
        bookInfoDiv.innerHTML = `
<div class="bookInfoDiv">
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
        <tr>
            <td>Quantity Available</td>
            <td>${desiredBook.quantity}</td>
        </tr>
    </table>
</div>
`;
        const purchaseBtn = document.createElement("button");
        purchaseBtn.textContent = "Add to Cart";
        purchaseBtn.classList.add("purchaseBtn");
        mainPageMainTag.append(bookInfoDiv, purchaseBtn);

        purchaseBtn.addEventListener("click", () => {
            if (localStorage.getItem("userData")) {
                purchaseDetails();
            } else {
                alert("Please login first");
            }
        });
    };

    function purchaseDetails() {
        
    };



});