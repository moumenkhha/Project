// A function to handle searches:
async function searchBooks() {
    const response = await fetch("../json/items.json");
    const books = await response.json();
    const searchInput = document.querySelector("#search-form").value;
    const words = searchInput.toLowerCase().trim().split(" ");
    const matchedBooks = [];

    books.forEach(b => {
        // A score variable to rank books according to how much they match the search input:
        let score = 0;
        words.forEach(w => {
            if (b.title.includes(w)) {
                score += 3;
            }
            b.authors.forEach(a => {
                if (a.includes(w)) {
                    score += 2;
                }
            })
            if (b.isbn.includes(w)) {
                score += 4;
            }
            if (b.genre.includes(w)) {
                score += 1;
            }
            b.keywords.forEach(k => {
                if (k.includes(w)) {
                    score += 1;
                }
            })
        })

        if (score > 0 && matchedBooks.length < 10) {
            matchedBooks.push({b, score});
        }
    });

    matchedBooks.sort((a, b) => b.score - a.score);
    showMatchedBooks(matchedBooks.map(e => e.b));
}

// A function to show the matched books on screen:
function showMatchedBooks(books) {
    const suggestions = document.querySelector("#suggestions-list");
    suggestions.innerHTML = "";
    document.querySelector("#search-suggestions").style.display = "block";
    if (books.length > 0) {
        books.forEach(b => {
            const bookItem = document.createElement("li");
            const titleText = document.createTextNode(b.title);
            titleText.value = b.title;

            bookItem.appendChild(titleText);
            suggestions.appendChild(bookItem);
        });

        const titlesList = document.querySelectorAll("#suggestions-list > li");
        for (let i = 0; i < titlesList.length; i++) {
            titlesList[i].addEventListener("mouseover", () => autoCompleteSearch(titlesList[i].innerText));
        }
    }
    else {
        const resultMessage = document.createElement("li");
        const resultMessageText = document.createTextNode("No matching books...");
        resultMessage.appendChild(resultMessageText);
        suggestions.appendChild(resultMessage);
    }
}

function hideSearchSuggestions() {
    document.querySelector("#search-suggestions").style.display = "none";
}

function autoCompleteSearch(title) {
    document.querySelector("#search-form").value = title;
}

// Adding event listeners:
document.addEventListener("DOMContentLoaded", (event) => {
    const searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("input", searchBooks)
    searchForm.addEventListener("blur", hideSearchSuggestions);
})