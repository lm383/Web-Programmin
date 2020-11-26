//import "../Server/Database";
//import { SignUpTo as _SignUpTo } from "../Server/Database.js";
//var Database = require("../Server/Database");

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
  };
};
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
  };
};

function ValSignUp() {
  // this is where all the signup forms validation will go
  let Username = document.forms["SignUpForm"]["Username"].value;
  let Password = document.forms["SignUpForm"]["Password"].value;
  let RePassword = document.forms["SignUpForm"]["RePassword"].value;

  if (Password === RePassword) {
    console.log("pass same");
  } else {
    alert("Passwords Different")
    return false;
  };
};
function ValLogIn() {
  let Username = document.forms["LogInForm"]["UsernameL"].value;
  let Password = document.forms["LogInForm"]["PasswordL"].value;

  if(Username.length<=20&&Password.length<=20){
    return true;
  }else{
    return false;
  };
};
