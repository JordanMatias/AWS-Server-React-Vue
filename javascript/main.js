var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

////event listeners and paddle mainupulation

var rightPressed = false; //stores info about keypresses
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

//new instances of components

var ball = new Ball(width / 2, height - 30, 8, -8, 10, "blue");
var paddle = new Paddle((width - 75) / 2, height - 15, 100, 15, "black");
var score = 0;
var lives = 5;

//draw score & draw lives
function drawScore() {
  ctx.font = "16px Obitron";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 15, 20);
}
function drawLives() {
  ctx.font = "16px Obitron";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 80, 20);
}

// win/lose

//the update function

function update() {
  ctx.clearRect(0, 0, width, height);
  requestAnimationFrame(update);
  ball.draw();
  ball.update(paddle);
  paddle.draw();
  paddle.update();
  paddle.collision(ball);
  drawBricks();
  collisionDetection(ball);
  drawScore();
  drawLives();
}

update();
console.log("Hello");
