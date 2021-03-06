
var p = document.getElementById("player");
var left = 700;
var playerTop = 0;
var isCollidingRight = false; //insitialises the booleans
var isCollidingLeft = false;
var isCollidingDown = false;
var isCollidingUp = false;
var redScore = 0;

function move(e){

//should move the square down, by adding to top
 	if(e.keyCode == 40 && isCollidingDown == false){ //if this button is pressed and player is not colliding
		 playerTop += 4;
		 player.style.top = playerTop + "px";
		 borderCollision(); //calls the collision method in the if statements to update the booleans for the next button press
		 flagCollision();
	}

//moves the square right if no collision and key pressed
	if(e.keyCode == 39 && isCollidingRight == false){
		left += 2;
		player.style.left = (parseInt(left) + left) + "px";
		borderCollision();
		flagCollision();
	}

//moves the square left if no collision and key pressed
	if(e.keyCode == 37 && isCollidingLeft == false){
		left -= 2;
		player.style.left = (parseInt(left) + left) + "px";
		borderCollision();
		flagCollision();
	}

//should move the square up if no collision and key pressed
	if(e.keyCode == 38 && isCollidingUp == false){
		playerTop -= 4;
		player.style.top = playerTop + "px";
		borderCollision();
		flagCollision();
	}

}

//currently detects whether the player is colliding with the edge of the window
function borderCollision(){
	//if it is at that location then it sets the boolean to true so that it cannot move in that direction
	if (player.offsetLeft - 4 > window.innerWidth - 8){ //will be modified later for walls
		isCollidingRight = true;
	}
	else{
		isCollidingRight = false;
	}
	if (player.offsetLeft + 4 < 8){
		isCollidingLeft = true;
	}
	else{
		isCollidingLeft = false;
	}
	if(player.offsetTop - 4> window.innerHeight - 8){
		isCollidingDown = true;
	}
	else{
		isCollidingDown = false;
	}
	if(player.offsetTop + 4 < 8){
		isCollidingUp = true;
	}
	else{
		isCollidingUp = false;
	}
}
//function checks if the player is touching the flag
function flagCollision(){
  var playerPos = player.getBoundingClientRect(); //creates a local variable with the position information of the player
  var flagPos = flagRed.getBoundingClientRect();
  if(!(playerPos.right < flagPos.left || playerPos.left > flagPos.right || //checks if the player is intersecting with the flag
    playerPos.bottom < flagPos.top || playerPos.top > flagPos.bottom)){
      BlueScored(); //increments the score
      player.style.left = 700 + "px"; //resets the players position
      player.style.top = 15 + "px";
      left = 700;
      top = 15;
      GetBlue();// this will return the current score of blue team
  };
};
document.onkeydown = move;
