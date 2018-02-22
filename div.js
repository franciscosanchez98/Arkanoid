var property = {
	stage:[
	[{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3},{life: 3}],
	[{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2},{life: 2}],
	[{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1},{life: 1}]
	],
	blocks: document.getElementsByClassName('box'),
	grapper: document.getElementById('grapper'),
	points: document.getElementById('points')
}
var platform = {
	self: document.getElementById('platform'),
	left: 10,
	posX: document.getElementById('platform').offsetLeft
}
var ball = {
	self: document.getElementById('ball'),
	speedX: 5,
	speedY: -5,
	posX: document.getElementById('ball').offsetLeft,
	posY: document.getElementById('ball').offsetTop
}
var method = {
	startGame: function (){
		this.createStage();
		this.moveBall();
		document.onkeydown = method.movePlatform;
	},
	createStage: function () {
		var div = "";
		var num = 0;
		for (var i = 0; i < property.stage.length; i++) {
			for (var j = 0; j < property.stage[i].length; j++) {
				if(property.stage[i][j].life != 0){
					if(property.stage[i][j].life == 3)
						div += "<div class=\"retainers\"><div class='box row1'id=box"+num+" data-life="
					+property.stage[i][j].life+"></div></div>";	
					if(property.stage[i][j].life == 2)
						div += "<div class=\"retainers\"><div class='box row2'id=box"+num+" data-life="
					+property.stage[i][j].life+"></div></div>";	
					if(property.stage[i][j].life == 1)
						div += "<div class=\"retainers\"><div class='box row3'id=box"+num+" data-life="
					+property.stage[i][j].life+"></div></div>";	
				}else{
					div += "<div class=\"retainers\"></div>";
				}
			}
		}
		document.getElementById('block').innerHTML = div;
	},
	moveBall: function(){
		var move = setInterval(function(){
			if(ball.posY <= -8 ){
				ball.speedY = - ball.speedY;
			}
			if (ball.posY >= platform.self.offsetTop - 15) {
				if(method.collidePlatform(ball.self, platform.self)){
					ball.speedY = - ball.speedY; 	
				}
				if(!method.collidePlatform(ball.self, platform.self)){
					clearInterval(move);
					method.GameOver();
				}
			}
			if(ball.posX <= -8 ){
				ball.speedX = - ball.speedX; 
			}
			if (ball.posX >= window.innerWidth -43) {
				ball.speedX = - ball.speedX; 	
			}
			ball.posY += ball.speedY;
			ball.self.style.top = ball.posY+"px";
			ball.posX+= ball.speedX;
			ball.self.style.left = ball.posX+"px";
			method.breakBlock(ball.posX, ball.posY);
		}, 10);
	},
	breakBlock: function(posX, posY){
		for (var i = 0; i < property.blocks.length; i++) {
			if(method.collide(property.blocks[i], ball.self)){
				property.blocks[i].dataset.life--;
				if(property.blocks[i].dataset.life == 2){
					property.blocks[i].style.backgroundColor = "#FFFF00";
				}
				if(property.blocks[i].dataset.life == 1){
					property.blocks[i].style.backgroundColor = "#008000";
				}
				if(property.blocks[i].dataset.life == 0 ){
					property.blocks[i].parentNode.removeChild(property.blocks[i]);
					points.dataset.points++;
					points.innerHTML = points.dataset.points;
				}
				break;
			}
		}
	},
	collide: function (block, divBall) {
		var block = block.getBoundingClientRect();
		var ballDiv = divBall.getBoundingClientRect();
		if(!(block.top > ballDiv.bottom ||
			block.right < ballDiv.left ||
			block.bottom < ballDiv.top ||
			block.left > ballDiv.right)){
			if(Math.abs(block.left - ballDiv.right) < 7 
				|| Math.abs(block.right - ballDiv.left) < 7){
				ball.speedX *= -1;
			}else{
				ball.speedY *= -1;
			}
			return true;
		}
		return false;
		
	},

	movePlatform: function(event){
		var movePlatform = setInterval(function(){
			if(event.keyCode == 39){
				if (!(platform.posX > window.innerWidth - 165)) {
					platform.posX += platform.left;
					platform.self.style.left = platform.posX+"px";
				}else{
					clearInterval(movePlatform); 
				}
			}
			if(event.keyCode == 37){
				if(!(platform.posX <= -8) ){
					platform.posX -= platform.left; 
					platform.self.style.left = platform.posX+"px";
				}else{
					clearInterval(movePlatform);
				}
			}
			document.onkeyup = function(){
				clearInterval(movePlatform);
			};
		}, 10);
	},
	collidePlatform: function(divBall, divPlatform){
		var rectBall = divBall.getBoundingClientRect();
		var rectPlatform = divPlatform.getBoundingClientRect();
		if(!(rectBall.top > rectPlatform.bottom ||
			rectBall.right < rectPlatform.left ||
			rectBall.bottom < rectPlatform.top ||
			rectBall.left > rectPlatform.right)){
			//LEFT
			if(divPlatform.offsetLeft + 64 >= divBall.offsetLeft +10){
				if(ball.speedX < 0 ){
					ball.speedX *= 1;
				}else{console.log(ball.speedX);
					ball.speedX *= -1;
					console.log(ball.speedX); 	
				}
				return true;
			}
			//RIGHT
			if(divPlatform.offsetLeft + 64 < divBall.offsetLeft +10){
				if(ball.speedX < 0 ){	
					ball.speedX *= -1; 	
				}else{
					ball.speedX *= 1;	
				}
				return true;
			}
		}
		return false;
	},
	GameOver: function(){
		ball.speedX = 0;
		ball.speedY = 0;
		document.body.appendChild(document.createElement("DIV")).setAttribute("id", "lightBox");
		var lightBox = document.getElementById('lightBox');
		lightBox.style.width="70vw";
		lightBox.style.height="70vh";
		lightBox.style.position="fixed";
		lightBox.style.zIndex="10";
		lightBox.style.backgroundImage="url('img/gameover.png')";
		lightBox.style.backgroundRepeat="no-repeat";
		lightBox.style.backgroundSize="70%";
		lightBox.style.display="block";
		lightBox.style.margin="0 auto";
		lightBox.style.left="30vw";
		lightBox.style.top="30vh";
		console.log(lightBox);
		property.grapper.style.opacity = .3;
	}
	
}

method.startGame();
