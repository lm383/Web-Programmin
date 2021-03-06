// inistalise the scores
var RedScore = 0;
var BlueScore = 0;
// these are used in the player movement javascripts
function RedScored(){
  RedScore++;
};
function BlueScored(){
  BlueScore++;
};
GetRed: function GetRed(){
  return RedScore;
};
GetBlue: function GetBlue(){
  return BlueScore;
};
// for when a game ends
function GameEnd(Socket){
  // display who won calculate highscore's reset ask for another game and take player to GameStart
  Socket.emit('disconnection', {});
};
function SetUp(){
  // we need to connect with the server to do this
  // first It will need to check how many players are trying to play currently
  // initialse PlayerNum and PointScored and Info
  let PlayerNum = 0;
  let Username = "";
  let PointScored = 0;
  let TotalPlayers = 0;
  // so we can display the players numbers
  let PlayerDis = document.getElementById("player");
  let PlayerTop = 0;
  let PlayerLeft = 0;
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
  Socket.on("connection", function(num, numb, name){
    if (num == -1){
      // this means server is full max 6 players
      location.reload();
      alert("currently full try again later");
    }else{
      // parse int cus socket io gives string
      Username = name;
      PlayerNum = parseInt(num);
      if (Username === ""){
        PlayerDis.innerHTML = num;
      }else{
        PlayerDis.innerHTML = Username;
      };
    };
    TotalPlayers = numb;
    Info.innerHTML= "Users Connected "+numb+" out of at least 2";
    // now we initialse teams
    let Team = GetTeam(PlayerNum, PlayerDis);
    // for when game is able to take place e.g there are more than 2 players
    let Playing = false;
    // for when a player joins
    Socket.on("PlayerJoin", function(Index, ConnN){
      TotalPlayers = ConnN;
      console.log("Player " + Index+" has joined");
      Info.innerHTML= "Users Connected "+ConnN+" out of at least 2";
    });
    // for when a player leaves
    Socket.on("PlayerLeave", function(Index, ConnN){
      TotalPlayers = ConnN;
      console.log("Player " + Index+" has left");
      Info.innerHTML= "Users Connected "+ConnN+" out of at least 2";
      if (TotalPlayers< 2){
        console.log("GAME End not enough players");
        Playing = false;
      };
    });

    // this will show other players and positions
    EndButt.addEventListener("click", function(){
      Playing = false;
      StartButt.style.display = "block";
      EndButt.style.display = "none";
      GameClose(Socket, PlayerNum);
      location.reload();
    });

    Socket.on("AddPlayers", function(UserIndex, TopPosition, LeftPosition) {
      console.log("DRAWING PLAYER");
      let OtherNum = UserIndex;
      let TopPos = TopPosition;
      let LeftPos = LeftPosition;
      console.log(OtherNum + " Pos: "+ TopPos + " "+ LeftPos);
      DrawOtherPlayer(OtherNum, TopPos, LeftPos);
    });



    // if player closes window go to GameClose function
    window.onbeforeunload = GameClose(Socket);
  });

  UpdatePos();
  Socket.on("Update", function(data){
    TotalPlayers = data;
    Info.innerHTML= "Users Connected "+TotalPlayers+" out of at least 2";
    // if 2 players start the games
    if (parseInt(TotalPlayers)>= 2){
      console.log(" Emitting data");
      //console.log(PlayerTop + " "+ PlayerLeft);
      Socket.emit("RecievePlayers", PlayerNum, PlayerTop, PlayerLeft);
      UpdatePos();
    };
  });
  function UpdatePos(){
    PlayerDis = document.getElementById("player");
    PlayerTop = PlayerDis.getAttribute("top");//window.getComputedStyle(PlayerDis).getPropertyValue('top');
    PlayerLeft = PlayerDis.offsetLeft;//window.getComputedStyle(PlayerDis).getPropertyValue('left');
    if(PlayerTop == null){
      PlayerTop = PlayerDis.offsetTop;
    };
    if(PlayerTop == null){
      PlayerTop = window.getComputedStyle(PlayerDis).getPropertyValue('top');
    };
  };

  //when the player leaves
  function GameClose(Socket, PlayerNum){
    if (PlayerNum == 0 || PlayerNum%2 == 0){
      // if 0 / even red team
      PointScored = GetRed();
    }else{
      // else blue
      PointScored = GetBlue();
    };
    if(PointScored > 0&&!(Username==="")){
      console.log("Updateing high score");
      Socket.emit('UpdateHighScore', PointScored, Username);
    };
    // when window is closed disconnect player
    Socket.emit('disconnection', function() {});
  };
};


// when an other player joins
function DrawOtherPlayer(OtherNum, TopPos, LeftPos){
  try{
    var Exists = document.getElementById("OtherPlayer");
    if ( Exists != null){
      // already made a OtherPlayer
      console.log(OtherNum);
      Exists.style.top = TopPos+"px";
      Exists.style.left = LeftPos+"px";
      return;
    }
  }catch(err){
    console.log(err);
  };
  var OtherPlayer = document.createElement("div");
  // make other player
  OtherPlayer.className = "OtherPlayer";
  OtherPlayer.id = "OtherPlayer";
  OtherPlayer.style.top = TopPos+"px";
  OtherPlayer.style.left = LeftPos+"px";
  console.log(OtherNum);
  if (parseInt(OtherNum) ==0 ||parseInt(OtherNum) %2 ==0){
    //red team
    OtherPlayer.style.backgroundColor = "#FF0000";
  }else{
    // blue team
    OtherPlayer.style.backgroundColor = "#0000FF";
  }
  OtherPlayer.style.textAlign = "center";
  OtherPlayer.innerHTML = OtherNum;
  // adds the player to user screen
  document.body.appendChild(OtherPlayer);
};
function ClearOthers(){
  var OtherPlayer = document.getElementById("OtherPlayer");
  document.body.removeChild(OtherPlayer);

};

function GetTeam(Num, PlayerDis){
  if (Num == 0 || Num%2 == 0){
    // if 0 / even red team
    Team = "#FF0000";
  }else{
    // else blue
    Team = "#0000FF";
  };
  // put make sure player is their colour
  PlayerDis.style.backgroundColor = Team;
  if (Team === "#0000FF"){
    // if player is blue put them on their side
    PlayerDis.style.left = "75%";
    // make the new link to movement script when on the blue team
    var NewScript = document.createElement('script');
    NewScript.setAttribute("type","text/javascript");
    NewScript.setAttribute('src', 'JavaScript/BluePlayerMovement.js');
    // add it to head
    document.head.appendChild(NewScript);
    // now to delete the old one
    document.head.removeChild(document.getElementById("Red"));
  };
  return Team;
};
