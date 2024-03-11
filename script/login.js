document.addEventListener("DOMContentLoaded", function () {
  iconClose.addEventListener("click", () => {
    window.location.href = "/Phase 1 (M.Reyad)/html/index.html";
  });
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevents reloading the page, the default behavior of the form submission. To handle the form submission using JavaScript

    const username = userId.value;
    const password = passKey.value;

    fetch("../json/users.json") // Fetch data from the "users.json" file using the fetch API.
      .then((response) => response.json())  // Processes the response by converting it to JSON format.
      .then((users) => {

        const matchedId = users.find( // To search through the array of users obtained from the JSON file
          (user) => user.username === username
        );
        const matchedKey = users.find(
          (user) => user.password === password
        );

        if (!matchedId) {
          idLabel.style.color = "red";
        } else {
          idLabel.style.color = "green";
        }
        if (!matchedKey) {
          passLabel.style.color = "red";
        } else {
          window.location.href = "/Phase 1 (M.Reyad)/html/index.html";
        }
      })

  });

});