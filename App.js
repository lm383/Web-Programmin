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
// for when user trys to click the game page link this will allow them to actually go there
App.get("/Game/GamePage", function(req,res){
  res.sendFile("Game/GamePage.html",{ root : __dirname+"/Public"});
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
const SocketIo = require("socket.io");
const Io = SocketIo(Server);
// server keeps centralized track of the users Max 6 at a time
var Users = [null, null, null, null, null, null];
var ConnNum = 0;
Io.on("connection", socket => {
  // find a unique number for the player to identfy them later first set to -1
  let PlayerIndex = -1;
  for(const i in Users){
    if (Users[i] == null){
      PlayerIndex = i;
      ConnNum++;
      break;
    };
  };



  // tell the connected clients stuff like players index and how many are connected
  socket.emit("player-number", PlayerIndex);
  socket.emit("Users-Online", ConnNum);

  // currently ignore 7th and up players for nofollow
  if (PlayerIndex == -1) return;

  /*
  socket.on("update", (data) => {
      let uniqueid = data.uniqueid; // makes unique id for player

      // if users dont have inoqueid
      if (!users.hasOwnProperty(uniqueid)) {
        users[uniqueid] = {};
        users[uniqueid].uniqueid = uniqueid;
        users[uniqueid].timestamp = curTimeStamp;
        users[uniqueid].socketid = socket.id;
        users[uniqueid].ip = ip.address();
        users[uniqueid].x = data.x;
        users[uniqueid].y = data.y;
      }

      users[uniqueid].uniqueid = uniqueid;
      users[uniqueid].timestamp = curTimeStamp;
      users[uniqueid].socketid = socket.id;
      users[uniqueid].ip = ip.address();
      users[uniqueid].x = data.x;
      users[uniqueid].y = data.y;

      let senddata = {
        cmd: "sync",
        timestamp: curTimeStamp,
        users: []
      };
      for (let uid in users) {
        let delay = curTimeStamp - users[uid].timestamp;
        if (delay > 5000) {
          console.log("killing unique: " + uniqueid + ", timed out");
          delete users[uid];
          continue;
        }
        senddata.users.push(users[uid]);
      }

      socket.emit("sync", senddata);
      socket.broadcast.emit("sync", senddata);
    });*/

});
