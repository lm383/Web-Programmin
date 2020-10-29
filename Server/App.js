// imported the http library and set up the port for the server
const Http = require("http");
const Fs = require("fs");
var express = require('express');
var app = express();
//var MySQL = require("mysql");
const Port = 3000;



/*
app.get('/', function (req, res) {
    res.sendFile('../index.html');
});


app.post('/submit-SignUp', function (req, res) {
    var name = req.body.Username + ' ' + req.body.Password;

    res.send(name + ' Submitted Successfully!');
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
*/

// the server all functionallity goes here

const Server = Http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" }); //status code
  Fs.readFile("../index.html", function (Error, data) {
    if (Error) {
      res.writeHead(404);
      res.write("Error: File Not Found " + data);
    }else{
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
