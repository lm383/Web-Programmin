function HideShowSign() {
  // here we will hide the SignUp form
  var x = document.getElementById("SignUp");
  // here we loop through the divs and hide each one we
  if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
  }
}
