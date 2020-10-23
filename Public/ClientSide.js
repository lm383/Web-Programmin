function HideShowSign() {
  // here we will hide the SignUp form
  var x = document.getElementById("SignUp");
  // here we hide the div if it is showing and visversa
  if (x.style.display === "none") {
    x.style.display = "block";
    x.style.visibility = "visible";
    } else {
    x.style.display = "none";
  }
}
