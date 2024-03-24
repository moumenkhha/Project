function checkUserStatus(){

  const btn = document.querySelector("#loginBtn");
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(btn){
    if(userData) {
      btn.textContent = `Sign Out`;
    } else {
      btn.textContent = "Login";
    }
  }
}

function closeClicked(){
  window.location.href = "/Phase 1 (M.Reyad)/html/index.html";
}

function logginTrigger(){
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(userData) {
    localStorage.removeItem("userData");
    window.location.href = "/Phase 1 (M.Reyad)/html/index.html";
    alert("Signing out successfully");
    checkUserStatus();
  } else {
    window.location.href = "/login.html";
  }
}

function submitLogin(e) {
  e.preventDefault();
  const username = userId.value;
  const password = passKey.value;

  fetch("../json/users.json") // Fetch data from the "users.json" file using the fetch API.
    .then((response) => response.json())  // Processes the response by converting it to JSON format.
    .then((users) => {

      const matchedId = users.find( // To search through the array of users obtained from the JSON file
        (user) => user.username ===  username
      );
      const matchedKey = users.find(
        (user) => user.password === password
      );

      if (!matchedId) {
        idLabel.style.color = "red";
      } else {
        idLabel.style.color = "green";

        if (!matchedKey) {
          passLabel.style.color = "red";
        } else {
          const {password, ...others} = matchedId;
          localStorage.setItem("userData", JSON.stringify(others));
          window.location.href = "/Phase 1 (M.Reyad)/html/index.html";
        }
      }
    })
    
}


document.addEventListener("DOMContentLoaded", function () {
  checkUserStatus();

  const myActivity = document.querySelector("#myActivityBtn");
  myActivity.addEventListener("click", () => {
    if (localStorage.userData) {
      window.location.href = "/myActivity.html";
    }
  })


  });
