var p = document.getElementById("player");

		var left = 0;
		var playerTop = 0;

		function move(e){
			//should move the square down, doesnt work yet
			 if(e.keyCode == 40){
				 playerTop += 2;
				 player.style.top = playerTop + "px";
			 }

			//moves the square right
			if(e.keyCode == 39){
				left += 2;
				player.style.left = (parseInt(left) + left) + "px";
			}

			//moves the square left
			if(e.keyCode == 37){
				left -= 2;
				player.style.left = (parseInt(left) + left) + "px";
			}

			//should move the square up, doesnt work
			if(e.keyCode == 38){
				playerTop -= 2;
				player.style.top = playerTop + "px";
			}
		}
		document.onkeydown = move;
