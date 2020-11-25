var p = document.getElementById("player");

var left = 0;
var playerTop = 0;
var isCollidingRight = false; //insitialises the booleans
var isCollidingLeft = false;
var isCollidingDown = false;
var isCollidingUp = false;

function move(e){
	
//should move the square down, by adding to top
 if(e.keyCode == 40 && isCollidingDown == false){ //if this button is pressed and player is not colliding
	 playerTop += 4;
	 player.style.top = playerTop + "px";
	 collision(); //calls the collision method in the if statements to update the booleans for the next button press
 }

//moves the square right
if(e.keyCode == 39 && isCollidingRight == false){
	left += 2;
	player.style.left = (parseInt(left) + left) + "px";
	collision();
}

//moves the square left
if(e.keyCode == 37 && isCollidingLeft == false){
	left -= 2;
	player.style.left = (parseInt(left) + left) + "px";
	collision();
}

//should move the square up, by taking away from top
if(e.keyCode == 38 && isCollidingUp == false){
	playerTop -= 4;
	player.style.top = playerTop + "px";
	collision();
}
}

//currently detects whether the player is colliding with the edge of the window
function collision(){
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
	if(player.offsetTop + 4< 8){
		isCollidingUp = true;
	}
	else{
		isCollidingUp = false;
	}
}
document.onkeydown = move;


