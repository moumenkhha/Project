document.addEventListener("DOMContentLoaded", () => {

    const myActivityBtn = document.querySelector("#myActivityBtn");
    const actsContainer = document.querySelector(".actsContainer");
    const logoImg = document.querySelector("#logoImg");

    logoImg.addEventListener("click", () => {
        window.location.href = "/Phase 1 (M.Reyad)/html/index.html";
    });

    myActivityBtn.addEventListener("click", () => {
        if (!localStorage.userData) {
            alert("Login First")
        } else if (!localStorage.userHistory) {
            alert("No History")
        } else {
            window.location.href = "/myActivity.html";
        };
    });

    if (window.location.href.includes("myActivity.html")) {
        const userHistory = JSON.parse(localStorage.getItem("userHistory"));

        userHistory.forEach(book => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("itemDiv");
            itemDiv.innerHTML = `
<table class="itemsTable">
    <tr>
        <td>Date</td>
        <td>${book.date}</td>
    </tr>
    <tr>
        <td>Booktitle</td>
        <td>${book.bookTitle}</td>
    </tr>
    <tr>
        <td>Quantity</td>
        <td>${book.quantity}</td>
    </tr>
    <tr>
        <td>Price</td>
        <td>${book.totalPrice}</td>
    </tr>
</table>
`;
            actsContainer.appendChild(itemDiv);
        });
    }
});