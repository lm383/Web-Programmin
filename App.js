// imported the http library and set up the port for the server
const Http = require("http");
const Fs = require("fs");
const Path = require('path');
const BodyParser = require('body-parser')
const Express = require('express');
const App = Express();

//var MySQL = require("mysql");
const Port = 3000;
App.use(BodyParser.json());
App.use(Express.static(Path.join(__dirname, '/Public/')));
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
  res.sendFile("index.html");
});
App.get("/index.html", function(req,res){
  res.sendFile("index.html");
});
App.get("/Game/loading_bar.html", function(req,res){
  res.sendFile("Game/loading_bar.html");
});
// for when user trys to click the game page link this will allow them to actually go there
App.get("/Game/GamePage", function(req,res){
  res.sendFile("Game/GamePage.html",{ root : __dirname+"/Public"});
});

App.get("/Game/loading_bar", function(req,res){
  res.sendFile("Game/loading_bar.html",{ root : __dirname+"/Public"});
});

// this if for when the signup form is submitted
App.post('/SignUpSubmit', function (req, res) {
  // this is where the variables get saved so we can use them
    var Username = req.body.Username;
    var Password = req.body.Password;
    var RePassword = req.body.RePassword;
    // here we save the database file as a variable to make it easier to use
    //const Database = require("./Server/Database.js")
    // here we call the SignUpTo function so it can add the data to the database
    var Result = Database.Check(Username, Password);
    if (Result===null){
      Database.SignUpTo(Username, Password);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("welcome "+ Username);
      res.end('<br><a href="/Game/GamePage.html" rel="nofollow">START</a>');
    }else{
      // takes you to page where says error happened and gives option to go back to start
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("Username taken try another.");
      res.end('<br><a href="index.html" rel="nofollow">Back</a>');
    }

});

// socket.io connection to hopefully allow several people on my Server
const io = require("socket.io").listen(Server);
//const io = require('socket.io-client');
// server keeps centralized track of the users Max 6 at a time
var Users = [null, null, null, null, null, null];
var ConnNum = 0;
let PlayerIndex = -1;
io.sockets.on("connection", function(Socket) {
  console.log("connection successful");
  // find a unique number for the player to identfy them later first set to -1
  for(const i in Users){
    if (Users[i] == null){
      PlayerIndex++;
      ConnNum++;
      Users[i] == "Taken";
      break;
    };
  };
  // on conncetion it will tell the client their index and people currently online
  Socket.emit("connection", PlayerIndex, ConnNum);
  console.log(`Player ${PlayerIndex} has connected`);

  Socket.on("Update", function(data) {
    let UserIndex = data.Playersend;
    let Position = data.PlayerPos;
    // here we will update the player
    Socket.broadcast.send("Sync", {UserIndex, Position});
    console.log(UserIndex+ " "+ Position);

  });
  // when the user disconnects
  Socket.on("disconnect",()=>{
    // set PlayerIndex to -1 so it is available and -1 from ConnNum
    console.log(`Player ${PlayerIndex} disconnected`);
    Users[PlayerIndex] = null;
    ConnNum--;
    // if no one is connected reset index
    if (ConnNum <= 0){
      PlayerIndex = -1;
    };
    //Tell everyone what player numbe just disconnected
    //Socket.broadcast.emit('player-disconnection', PlayerIndex);
  });

});
