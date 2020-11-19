// this will initailise the game
function GameStart(PlayerNum, TotalPlayers){
  // will need to set timer set points to 0 on both sides and have players on a side, spwan on that sides
  // etc etc
  // then if PlayerIndex is even blue team else red team
  let team = null;
  if (PlayerNum == 0 || PlayerNum/2){
    // if 0 / even red team
    team = "#FF0000";
  }else{
    // else blue
    team = "#0000FF";
  };

  return team;
};

function Play(Socket){
  // this will be where everything happens update to players screens timer tickes,
  // if player collides with others/Flag
  // if timer is up go to GameEnd
  // timestamp from server
  var servertimestamp = 0;
  /*
	sending data to the server
  e.g. player timestamp (catches delays)
  their index, their position
	*/
    Socket.emit("update", {
      cmd: "update",
      timestamp: servertimestamp,
      PlayerIndex: PlayerIndex,
      x: xx,
      y: yy,
    });
};


function GameEnd(Socket){
  // display who won calculate highscore's reset ask for another game and take player to GameStart
  Socket.emit('disconnection', {});
};

function SetUp(){
  // we need to connect with the server to do this
  // first It will need to check how many players are trying to play currently
  // initialse PlayerNum and PointScored and Info
  let PlayerNum = 0;
  let PointScored = 0;
  let TotalPlayers = 0;
  // so we can display the players numbers
  let PlayerDis = document.getElementById("player");
  let Info = document.getElementById("info");

  let StartButt = document.getElementById("start");
  let EndButt = document.getElementById("stop");

  StartButt.style.display = "none";
  EndButt.style.display = "block";

  // trys to connect to server if cant shows error
  try {
    var Socket = io.connect("http://localhost:3000");
  }catch(err){
    alert(err);
  };

  // now we find out the real playerIndex given by server
  Socket.on("connection", function(num, numb){
    if (num == -1){
      // this means server is full max 6 players
      alert("currently full try again later")
    }else{
      // parse int cus socket io gives string
      PlayerNum = parseInt(num);
      PlayerDis.innerHTML = num;
    };
    TotalPlayers = numb;
    Info.innerHTML= "Users Connected "+numb+" out of at least 2";
    // now we start the game
    let Team = null;
    Team = GameStart(PlayerNum, TotalPlayers);

    PlayerDis.style.backgroundColor = Team;
    if (Team === "#0000FF"){
      PlayerDis.style.left = "100%";
    };
    // if player closes window go to GameClose function
    window.onbeforeunload = GameClose(Socket);
  });

  function GameClose(){
    // when window is closed disconnect player
    Socket.emit('disconnection', {});
  };

};
