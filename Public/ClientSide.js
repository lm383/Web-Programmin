var database = require("./Server/database.js");

function HideShowSign() {
  // here we will hide the SignUp form
  var SignForm = document.getElementById("SignUp");
  var Button = document.getElementById("SignUpButton");
  // here we hide the div if it is showing and visversa
  if (SignForm.style.display === "none") {
    SignForm.style.display = "block";
    Button.style.display = "none";
  } else {
    SignForm.style.display = "none";
    Button.style.display = "Block";
  }
}
function HideShowLog() {
  // here we will hide the LogIn form
  var SignForm = document.getElementById("LogIn");
  var Button = document.getElementById("LogInButton");
  // here we hide the div if it is showing and visversa
  if (SignForm.style.display === "none") {
    SignForm.style.display = "block";
    Button.style.display = "none";
  } else {
    SignForm.style.display = "none";
    Button.style.display = "Block";
  }
}

function SignUpTo() {
  database.SignUpTo();
}
