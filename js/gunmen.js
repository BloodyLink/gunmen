$(document).ready(function(){
	var gameReady = false;
	var rivalState = "notReady";
	var playerState = "notReady";
	var level = 1;
	var initialDrawTime = 1;
	var drawTime = 0;
	var draw = 0;
	var wt = 0;
	var SecCount = 0;
	var bangInterval = 0;
	var win = false;

	function nextLevel(){
		rivalState = "notReady";
		playerState = "notReady";
		SecCount = 0;
		level++;
		SecCount = 0;
		gameReady = false;
		win = false;
		bangInterval = 0;
		$("#btnStart").css("display", "initial");
	}

	function gameReset(){
		rivalState = "notReady";
		playerState = "notReady";
		SecCount = 0;
		drawTime = 0;
		level = 1;
		SecCount = 0;
		gameReady = false;
		bangInterval = 0;
		$("#btnStart").css("display", "initial");
	}

	function showResults(win){
		if(win){
		$("#results").html("Level " + level + " - " + SecCount.toFixed(2) + " seconds");
		$("#btnNextLevel").css("display", "inline");
		}else{
			$("#results").html("Levels cleared: " + (level-1) + ".");
			$("#btnRestartGame").css("display", "inline");
		}
	}

	$("#btnNextLevel").click(function(){
		nextLevel();
		$(this).css("display", "none");
	});

	$("#btnRestartGame").click(function(){
		gameReset();
		$(this).css("display", "none");
	});

	function waitTime(){
		var minwt = 2;
		var maxwt = 6;
		wt = (Math.random() * (maxwt - minwt) + minwt).toFixed(2);
		return wt;
	}

	function drawToBang(){
		bangInterval = setInterval(function(){drawShow(drawTime);}, 10);
		function drawShow(){
			if(SecCount < drawTime && rivalState == "draw"){
				SecCount = SecCount + 0.01;
				$("#count").html(SecCount.toFixed(2));
			}else{
				if(rivalState == "draw"){
					$("#message").html("BANG!");
					clearInterval(bangInterval);
					rivalState = "shoots";
					playerState = "dead";
					updatePlayer(playerState);
					updateRival(rivalState);
					console.log("BANG, you lose");
					win = true;
					showResults(win);
				}
					
			}

			$(this).keypress(function(e){
				if(gameReady && rivalState == "draw"){
				var code = e.keyCode || e.which;
				if(code == 32){
					clearInterval(bangInterval);
					rivalState = "dead";
					playerState = "yeah";
					updatePlayer(playerState);
					updateRival(rivalState);
					console.log("you win");
					win = true;
					showResults(win);
				}
			}			
	});

		}
	}

	$("#btnStart").click(function(){
		setLevel();
		console.log("Game Starts");
		$("#btnStart").css("display", "none");
		rivalState = "onGarde";
		playerState = "onGarde";
		updatePlayer(playerState);
		updateRival(rivalState);
		if(!gameReady){
			waitTime();
			var draw = setInterval(function(){drawWt(wt);}, 10);
		}
		gameReady = true;
		
		function drawWt(wt){
		if(SecCount < wt){
			SecCount = SecCount + 0.01;
			$("#count").html(SecCount.toFixed(2));
		}else{
			rivalState = "draw";
			updateRival(rivalState);
			playerState = "draw";
			updatePlayer(playerState);
			console.log("draw");
			$("#message").html("DRAW!");
			clearInterval(draw);
			SecCount = 0;
			drawToBang();

		}
		$(this).keypress(function(e){
				if(gameReady && rivalState == "onGarde"){
				var code = e.keyCode || e.which;
				if(code == 32){
					clearInterval(draw);
					rivalState = "oops";
					updateRival(rivalState);
					playerState = "oops";
					updatePlayer(playerState);
					$("#message").html("Too soon!");
					console.log("too soon");
					win = false;
					showResults(win);
				}
			}			
	});}

	});

	function setLevel(){
		drawTime = (initialDrawTime - ((level*5)/100));
		console.log("Level " + level + " draw time " + drawTime);
		return drawTime;
	}

	//ANIMATION

	function updateRival(rivalState){
		if(rivalState == "onGarde"){
			$("#rival").css("background-color", "#666666");
		}
		if(rivalState == "draw"){
			$("#rival").css("background-color", "#FFFFFF");
		}
		if(rivalState == "shoots"){
			$("#rival").css("background-color", "#610B0B");
		}
		if(rivalState == "dead"){
			$("#rival").css("background-color", "#000000");
			$("#rival").effect("bounce", "slow");
		}
		if(rivalState == "oops"){
			$("#rival").css("background-color", "#00FF00");
		}
	}

	function updatePlayer(playerState){
		if(playerState == "onGarde"){
			$("#player").css("background-color", "#610B0B");
		}
		if(playerState == "draw"){
			$("#player").css("background-color", "#00FF00");
		}
		if(playerState == "yeah"){
			$("#player").css("background-color", "#FFFFFF");
		}
		if(playerState == "oops"){
			$("#player").css("background-color", "#666666");
		}
		if(playerState == "dead"){
			$("#player").css("background-color", "#000000");
			$("#player").effect("bounce", "slow");
		}
	}
});