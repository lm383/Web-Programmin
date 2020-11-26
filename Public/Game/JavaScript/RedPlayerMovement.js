window.onload = function(){
	var p = document.getElementById("player");
	var left = 0;
	var playerTop = 0;
	var isCollidingRight = false; //insitialises the booleans
	var isCollidingLeft = false;
	var isCollidingDown = false;
	var isCollidingUp = false;
	// get scores (should be 0 at first)
	var Red = GetRed();
	var Blue = GetBlue();
	// display them
	var ScoreDis = document.getElementById("Score");
	ScoreDis.innerHTML = "Score "+ Red+" : " +Blue;

	//ScoreDis.innerHTML = "Red "+ GetRed()+" : Blue" GetBlue();

	function move(e){

	//should move the square down, by adding to top
	 	if(e.keyCode == 40 && isCollidingDown == false){ //if this button is pressed and player is not colliding
			 playerTop += 4;
			 player.style.top = playerTop + "px";
			 borderCollision(); //calls the collision method in the if statements to update the booleans for the next button press
			 wallCollision();
			 flagCollision();
		}

	//moves the square right
		if(e.keyCode == 39 && isCollidingRight == false){
			left += 2;
			player.style.left = (parseInt(left) + left) + "px";
			borderCollision();
			wallCollision();
			flagCollision();
		}

	//moves the square left
		if(e.keyCode == 37 && isCollidingLeft == false){
			left -= 2;
			player.style.left = (parseInt(left) + left) + "px";
			borderCollision();
			wallCollision();
			flagCollision();
		}

	//should move the square up, by taking away from top
		if(e.keyCode == 38 && isCollidingUp == false){
			playerTop -= 4;
			player.style.top = playerTop + "px";
			borderCollision();
			wallCollision();
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
		//const Score = document.getElementById("Main")// gets the main Game.js
		var playerPos = player.getBoundingClientRect(); //creates a local variable with the position information of the player
		var flagPos = flagBlue.getBoundingClientRect();
		if(!(playerPos.right < flagPos.left || playerPos.left > flagPos.right || //checks if the player is intersecting with the flag
			playerPos.bottom < flagPos.top || playerPos.top > flagPos.bottom)){
				RedScored(); //increments the score
				player.style.left = 0 + "px"; //resets the players position
				player.style.top = 15 + "px";
				left = 0;
				top = 15;
				// get the most recent scores
				Red = GetRed();
				Blue = GetBlue();
				// display the scores
				ScoreDis.innerHTML ="Score "+ Red+" : " +Blue;// this returns the socore of red team
		};

	};

	function wallCollision(){
		var playerPos = player.getBoundingClientRect(); //initialises the variables for the position
		var vWalls = document.getElementsByClassName('verticle-wall'); //gets all the elements of the class verticle-wall
		var hWalls = document.getElementsByClassName('horizontal-wall');
		for (var i = 0, max = vWalls.length; i < max; i++){ //repeats for all elements in vWalls
			var wall = vWalls[i].getBoundingClientRect(); //gets the position of the current wall
			// if(playerPos.right < wall.right && playerPos.right > wall.left){
			// 	isCollidingRight = true;
			// 	window.alert("Collide");
			// }
		}
		for (var j = 0, max = hWalls.length; i < max; i++){
			var wall = hWalls[i].getBoundingClientRect();
		}
	}
	document.onkeydown = move;

};
