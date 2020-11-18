
// this will initailise the game
function GameStart(){
  // will need to set timer set points to 0 on both sides and have players on a side, spwan on that sides
  // etc etc
  // first It will need to check how many players are trying to play currently
  // initialse PlayerNum and PointScored
  let PlayerNum = 0;
  let PointScored = 0;
  // we need to connect with the server to do this
  try {
    let Socket = io.connect("http://localhost:3000");
  }catch(err){
    console.log(err);
  }
  // now we find out the real playerIndex given by server
  Socket.on("player-number", num =>{
    if (num == -1){
      // this means server is full
      alert("currently full try again later")
    }else{
      // parse int cus socket io gives string
      PlayerNum = parseInt(num);
    };
  });

  // if there is more than 2 continue else wait
  Socket.on("Users-Online", num =>{
    // CURRENTLY NOT WORKING
    document.querySelector('#info').innerHTML = "Users Connected "+num+" out of at least 2"
  })


  // then if PlayerIndex is even blue team else red team

  // OPTIONAL ready up??

  // start play function

}

function Play(){
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
    socket.emit("update", {
      cmd: "update",
      timestamp: servertimestamp,
      PlayerIndex: PlayerIndex,
      x: xx,
      y: yy,
    });
}



function GameEnd(){
  // display who won calculate highscore's reset ask for another game and take player to GameStart
}
