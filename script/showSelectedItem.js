document.addEventListener("DOMContentLoaded", () => {

    const searchBar = document.querySelector("#search-form");

    searchBar.addEventListener("change", () => {
        const booksAvailable = document.querySelectorAll("li");

        booksAvailable.forEach(book => {
            console.log(book);
        });
    });

});





// booksAvailable.addEventListener("change", () => {
//     console.log(booksAvailable);
// });

