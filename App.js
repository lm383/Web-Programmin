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



App.post('/SignUpSubmit', function (req, res) {
    var Username = req.body.Username;
    var Password = req.body.Password;
    var RePassword = req.body.RePassword;

    res.send(Username + ' '+Password+' You\'re all signed up');
});



// the server all functionallity goes here
/*
const Server = Http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" }); //status code
  Fs.readFile("../index.html", function (Error, data) {
    if (Error) {
      res.writeHead(404);
      res.write("Error: File Not Found " + data);
    }else{
      Fs.readFile("../Public/Styles.css", function (Error, dataC) {
        res.writeHead(dataC);
      });
      res.write(data);


    }

    res.end(); // end command
  });
});
// this is checking that the server is up and listening if is it will output
// everything is working if not will output an error has happened
Server.listen(Port, function (Error) {
  if (Error) {
    console.log("something Went wrong :(", Error);
  } else {
    console.log("Server is listening on port " + Port);
  }
});
*/
