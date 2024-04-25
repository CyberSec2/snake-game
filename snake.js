// Game variables
let canvas = document.getElementById('game'); // Get the canvas element
let context = canvas.getContext('2d'); // Get the 2D context for the canvas
let box = 20; // Size of each box (each move is one box)
let snake = []; // Snake array
snake[0] = { x: 10 * box, y: 10 * box }; // Initial snake position
let direction = "RIGHT"; // Initial direction
let food = {
    x: Math.floor(Math.random() * 30) * box, // Random food x-position
    y: Math.floor(Math.random() * 30) * box  // Random food y-position
}
let score = 0; // Initial score

// Function to draw the snake
function drawSnake(x, y) {
    context.fillStyle = 'green'; // Snake color
    context.fillRect(x, y, box, box); // Draw a box for the snake part
}

// Function to control the snake direction
document.addEventListener("keydown", directionControl);
function directionControl(event) {
    if(event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
    if(event.keyCode == 38 && direction != "DOWN") direction = "UP";
    if(event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
    if(event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

// Function to check collision with self
function collisionCheck(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}

// Function to draw everything to the canvas
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    for(let i = 0; i < snake.length; i++) {
        drawSnake(snake[i].x, snake[i].y); // Draw the snake
    }
    context.fillStyle = 'red'; // Food color
    context.fillRect(food.x, food.y, box, box); // Draw the food

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direction control
    if(direction == "LEFT") snakeX -= box;
    if(direction == "UP") snakeY -= box;
    if(direction == "RIGHT") snakeX += box;
    if(direction == "DOWN") snakeY += box;

    // If the snake eats the food
    if(snakeX == food.x && snakeY == food.y) {
        score++; // Increase score
        food = { // New random food position
            x: Math.floor(Math.random() * 30) * box,
            y: Math.floor(Math.random() * 30) * box
        }
    } else {
        // Remove the tail
        snake.pop();
    }

    // New head position
    let newHead = { x: snakeX, y: snakeY }

    // Game over rules
    if(snakeX < 0 || snakeY < 0 || snakeX >= 30*box || snakeY >= 30*box || collisionCheck(newHead, snake)) {
        clearInterval(game); // Stop the game
    }

    snake.unshift(newHead); // Add new head to the snake

    context.fillStyle = 'white'; // Score color
    context.font = '20px Arial'; // Score font
    context.fillText("Score: " + score, box, box); // Draw the score
}

// Call draw function every 100 ms
let game = setInterval(draw, 100);