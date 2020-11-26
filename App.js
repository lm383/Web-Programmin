// imported the http library and set up the port for the server
const Http = require("http");
const Fs = require("fs");
const Path = require('path');
const BodyParser = require('body-parser');
const Express = require('express');
const App = Express();


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
    // Host = local host and Port = 3000
  }
});

// this is the home page
App.get("/", function(req,res){
  res.sendFile("Index.html");
});
App.get("/Index.html", function(req,res){
  res.sendFile("Index.html");
});
App.get("/Game/LoadingBar.html", function(req,res){
  res.sendFile("Game/LoadingBar.html");
});
// for when user trys to click the game page link this will allow them to actually go there
App.get("/Game/GamePage", function(req,res){
  res.sendFile("Game/GamePage.html",{ root : __dirname+"/Public"});
});

App.get("/Game/LoadingBar", function(req,res){
  res.sendFile("Game/LoadingBar.html",{ root : __dirname+"/Public"});
});
App.get("/Game/HighScorePage", function(req,res){
  var Result = GetHighScore();
  res.sendFile("Game/HighScorePage.html",{ root : __dirname+"/Public"});
});
function GetHighScore(){
  const Database = require("./Server/Database.js");
  return  Database.GetHighScore("admin", 0);
}
// this if for when the signup form is submitted
App.post('/SignUpSubmit', function (req, res) {
  // this is where the variables get saved so we can use them
    var Username = req.body.Username;
    var Password = req.body.Password;
    var RePassword = req.body.RePassword;
    // here we save the database file as a variable to make it easier to use
    const Database = require("./Server/Database.js");
    // here we call the SignUpTo function so it can add the data to the database
    var Result = Database.Check(Username, Password);
    // if no response e.g not true
    if (!Result){
      Database.SignUpTo(Username, Password);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("succeffully signed Up. welcome "+ Username);
      res.end('<br><a href="index.html" rel="nofollow">Back</a>');
    }else{
      // takes you to page where says error happened and gives option to go back to start
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("Username taken try another.");
      res.end('<br><a href="index.html" rel="nofollow">Back</a>');
    }

});
var PlayerName = "";
// this if for when the login form is submitted
App.post('/LogInSubmit', function (req, res) {
  // this is where the variables get saved so we can use them
    var Username = req.body.UsernameL;
    var Password = req.body.PasswordL;
    // here we save the database file as a variable to make it easier to use
    const Database = require("./Server/Database.js")
    // here we call the SignUpTo function so it can add the data to the database
    Database.GetLog(Username, Password, function(err, result){
      if (result){
        PlayerName = Username;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("succeffully logged in. Welcome "+ Username);
        res.end('<br><a href="/Game/GamePage.html" rel="nofollow">START</a>');
      }else{
        // takes you to page where says error happened and gives option to go back to start
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("Sorry either Username/password incorrect");
        res.end('<br><a href="index.html" rel="nofollow">Back</a>');
      }
    }); // the function(err, result) forces the server to wait for result before moving on


});

// socket.io connection to hopefully allow several people on my Server
const io = require("socket.io").listen(Server);
var GameSate;
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
  Socket.emit("connection", PlayerIndex, ConnNum, PlayerName);
  Socket.emit("PlayerJoin", PlayerIndex, ConnNum);
  Playername = "";
  GameSate = "Setup";
  console.log(`Player ${PlayerIndex} has connected`);
  // when the user disconnects
  Socket.on("disconnect",()=>{
    // set PlayerIndex to -1 so it is available and -1 from ConnNum
    console.log(`Player ${PlayerIndex} disconnected`);
    Users[PlayerIndex] = null;
    ConnNum--;
    // if no one is connected reset index
    if (ConnNum <= 0){
      PlayerIndex = -1;
      GameSate = null;
    };
    //Tell everyone what player numbe just disconnected
    Socket.broadcast.send("PlayerLeave", {PlayerIndex, ConnNum});
  });
  // starts interval game will update every  second
  setInterval(function Update() {
    Socket.broadcast.emit('Update', ConnNum);
  }, 1000);

  // for when a game starts
  Socket.on("RecievePlayers", function(PlayerNum, Playertop, PlayerLeft){
    let Index = PlayerNum;
    let TopPosition = Playertop;
    let LeftPosition = PlayerLeft
    Socket.broadcast.emit("AddPlayers", Index, TopPosition, LeftPosition);
  });

  Socket.on('UpdateHighScore', function(Score, Name){
    const Database = require("./Server/Database.js");
    Database.GetHighScore(Name, Score, function(err, result){
      if (result){
        console.log("Updated");
      }else{
        console.log("not Updated");
      }
    });
  });

});
