$(document).ready(function(){
	
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var width = $("#canvas").width();
	var height = $("#canvas").height();
	
	
	var size = 25;
	var direction;
	var food;
	var score;
	
	//Creating the Snake and food
	var snake_array;
	
	function init()
	{
		direction = "right"; //default direction
		create_snake();
		create_food(); 
		
		score = 0;

	
      
		
		//Setting the speed of the sname - paints the cells
		
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 175);
	}
	init();
	
	//creating the Snake
	function create_snake()
	{
		var length = 6; 
		snake_array = []; 
		for(var i = length-1; i>=0; i--)
		{
			
			snake_array.push({x: i, y:0});
		}
	}
	
	//Food for the snakeX
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(width-size)/size), 
			y: Math.round(Math.random()*(height-size)/size), 
		};
	
	
	}
	
	//color of the snakeX on the canvas
	function paint()
	{
		//To avoid the snakeX trail we need to paint the BG on every frame
		ctx.fillStyle = "rgb(145, 231, 247)";
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = "orange";
		ctx.strokeRect(0, 0, width, height);
		
		//Snake movement - The below take the end of the snakeX and places is infront of the head cell
		var snakeX = snake_array[0].x;
		var snakeY = snake_array[0].y;
		
		//Direction of the snakeX 
		if(direction == "right") snakeX++;
		else if(direction == "left") snakeX--;
		else if(direction == "up") snakeY--;
		else if(direction == "down") snakeY++;
		
		//If the snake hits the wall the game ends
		if(snakeX == -1 || snakeX == width/size || snakeY == -1 || snakeY == height/size || check_collision(snakeX, snakeY, snake_array))
		{
			
			init();
		
			return;
		}
		
		
		//Snake gets larger when it hits the food
		if(snakeX == food.x && snakeY == food.y)
		{
			var tail = {x: snakeX, y: snakeY};
			score++;
			//initiates new food
			create_food();
		}
		else
		{
			var tail = snake_array.pop(); 
			tail.x = snakeX; tail.y = snakeY;
		}
		
		
		snake_array.unshift(tail); 
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var s = snake_array[i];
			paint_cell(s.x, s.y);
		}
		
		//Food
		paint_cell(food.x, food.y);
		ctx.fillStyle = "black";
		
		
		
		//score
		var score_text = "Number of Fish Eli has Ate: " + score;
		ctx.fillText(score_text, 20, height-20);
		
	}
	
	//Paints the cells
	function paint_cell(x, y)
	{
		ctx.fillStyle = "rgb(81, 241, 7)";
		ctx.fillRect(x*size, y*size, size, size);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x*size, y*size, size, size);
	}
	
	//checks for collisions
	function check_collision(x, y, array)
	{

		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	//Keyboard Controls
	$(document).keydown(function(e){
		var key = e.which;
		
		if(key == "37" && direction != "right") direction = "left";
		else if(key == "38" && direction != "down") direction = "up";
		else if(key == "39" && direction != "left") direction = "right";
		else if(key == "40" && direction != "up") direction = "down";
		
    })
})