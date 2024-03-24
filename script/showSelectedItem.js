document.addEventListener("DOMContentLoaded", async () => {

    const searchBar = document.querySelector("#search-form");
    let desiredBookName = "";

    if (searchBar) {
        searchBar.addEventListener("change", () => {
            const booksAvailable = document.querySelectorAll("li");

            booksAvailable.forEach(book => {
                if (book.textContent === searchBar.value) {
                    desiredBookName = book.textContent;
                    window.location.href = "/toBuy.html";
                }
            });
        });
    }

    // const booksFile = fetch("\Phase 1 (M.Reyad)\json\items.json");
    // console.log(JSON.parse(booksFile));
    // console.log(booksFile);

    const response = await fetch("/Phase 1 (M.Reyad)/json/items.json");
    const books = await response.json();

    console.log(books[0].title);

    const desiredBook = books.find((book, index) => book.title === desiredBookName);
    console.log(desiredBook);
    console.log(5345);


});
