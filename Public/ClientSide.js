var database = require('./Server/database.jsS');

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

// here we will check input the signup form into our database
// we need see if username is already taken if it has send back error
// if not enter the username and password into the database
function SignUpTo(){
  // get the values and put into variables
  let Username = document.getElementById('Username').value
  let Password = document.getElementById('Password').value
  let RePassword = document.getElementById('RePassword').value

}
