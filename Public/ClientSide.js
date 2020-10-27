import "../Server/Database";
//import { SignUpTo as _SignUpTo } from "../Server/Database.js";
//const Database = require("../Server/Database.js");

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
  let Username = document.forms["SignUpForm"]["Username"].value;
  let Password = document.forms["SignUpForm"]["Password"].value;
  let RePassword = document.forms["SignUpForm"]["RePassword"].value;

  let DisplayP = document.getElementById("Display");
  if (Password === RePassword) {
    console.log("enter" + Username + Password);
    Database.SignUpTo(Username, Password);
    console.log("exit");
    console.log("Submitted");
    document.getElementById("SignUp").submit();
    Display.innerHTML("submitted");
  } else {
    //alert("Passwords not same");
    DisplayP.textContent = "Passwords not same";
  }
}
