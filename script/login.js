btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

document.addEventListener("DOMContentLoaded", function () {

  submitBtn.addEventListener("click", function (event) {
    //
    event.preventDefault(); // Prevents reloading the page, the default behavior of the form submission. To handle the form submission using JavaScript

    const username = userId.value;
    const password = passKey.value;

    fetch("../json/users.json") // Fetch data from the "users.json" file using the fetch API.
      .then((response) => response.json())  // Processes the response by converting it to JSON format.
      .then((users) => {

        const matchedUser = users.find( // Find method to search through the array of users obtained from the JSON file
          (user) => user.username === username && user.password === password
        );

        if (matchedUser) {
          alert("Login successful!");
          // You can redirect the user or perform additional actions here
        } else {
          alert("Invalid username or password. Please try again.");
        }
      })

  });

});