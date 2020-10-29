// imported the http library and set up the port for the server
const Http = require("http");
const Fs = require("fs");
const Path = require('path');
const BodyParser = require('body-parser')

var Express = require('express');
var App = Express();
//var MySQL = require("mysql");
const Port = 3000;
App.use(BodyParser.json());
App.use(Express.static("Public"));
App.use(BodyParser.urlencoded({
    extended: true
}));

const Server = App.listen(Port, function (Error) {
  if (Error) {
    console.log("something Went wrong :(", Error);
  } else {
    var Host = Server.address().address
    var Port = Server.address().port

    console.log("Server app listening at http://%s:%s", Host, Port)
    //console.log("Server is listening on port " + Port);
  }
});

// this is the home page
App.get("/", function(req,res){
  res.sendFile("/index.html");
});
// for when user trys to click the game page link this will allow them to actually go there
App.get("Game/GamePage", function(req,res){
  res.sendFile("/Game/GamePage.html");
});

// this if for when the signup form is submitted
App.post('/SignUpSubmit', function (req, res) {
  // this is where the variables get saved so we can use them
    var Username = req.body.Username;
    var Password = req.body.Password;
    var RePassword = req.body.RePassword;
    // here we save the database file as a variable to make it easier to use
    const Database = require("./Server/Database.js")
    // here we call the SignUpTo function so it can add the data to the database
    var Result = Database.SignUpTo(Username, Password);
    if (Result){
      alert("That's you signed up!");
      res.sendFile("/Game/GamePage.html");
    }else{
      res.send("Uh oh! something went wrong :(");
    }

});
