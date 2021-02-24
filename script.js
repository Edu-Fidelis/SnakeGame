// Declaring variables

// to background(canvas)
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

// to snake
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// to move
let direction = "right";

//to food
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, // Generating a random number
    y: Math.floor(Math.random() * 15 + 1) * box
}


// Creating background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); // Draw where our game will be
}

// Creating our Snake
function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Drawing snake's food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Building the movements
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") {
        direction = "left";
    }

    if (event.keyCode == 38 && direction != "down") {
        direction = "up";
    }

    if (event.keyCode == 39 && direction != "left") {
        direction = "right";
    }

    if (event.keyCode == 40 && direction != "up") {
        direction = "down";
    }
}

function startGame() {

    // Don't touch yourself, my little snake!
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert("Game Over");
        }
    }

    // Snake will return otherside
    if (snake[0].x > 15 * box && direction == "right") {
        snake[0].x = 0;
    }

    if (snake[0].x < 0 && direction == "left") {
        snake[0].x = 16 * box;
    }

    if (snake[0].y > 15 * box && direction == "down") {
        snake[0].y = 0;
    }

    if (snake[0].y < 0 && direction == "up") {
        snake[0].y = 16 * box;
    }

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Building the directions
    if (direction == "right") {
        snakeX += box;
    }

    if (direction == "left") {
        snakeX -= box;
    }

    if (direction == "down") {
        snakeY += box;
    }

    if (direction == "up") {
        snakeY -= box;
    }

    // Growing up our snake
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }


    // Creating a head for our snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let game = setInterval(startGame, 1000); //for each 100 miliseconds it will be renovated, continuing our game
