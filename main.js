var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

////event listeners and paddle mainupulation

var rightPressed = false; //stores info about keypresses
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", spacebarHandler, false);

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

function spacebarHandler(e) {
  if (e.keyCode === 32) {
    ball.isStopped = false;
  }
}

//new instances of components

var ball = new Ball(width / 2, height - 30, 8, -8, 10, "blue");
var paddle = new Paddle((width - 150) / 2, height - 15, 150, 15, "white");

// sound
var hit = new Audio("sounds/paddlehit.mp3");
var collide = new Audio("sounds/boing.mp3");
var livesLost = new Audio("sounds/loselife.mp3");

//images
var gameover = new Image();
gameover.src = "images/gameover.jpg";
var youwin = new Image();
youwin.src = "images/youwin.png";

//lives, score, win/lose
var score = 0;
var lives = 3;

function drawScore() {
  ctx.font = "22px courier";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 15, 30);
}
function drawLives() {
  ctx.font = "22px courier";
  ctx.fillStyle = "white";
  ctx.fillText("Lives: " + lives, canvas.width - 120, 30);
}

function winOrLose() {
  if (lives <= 0) {
    ctx.drawImage(gameover, 0, 0, canvas.width, canvas.height);
    if (ball.isStopped === false) {
      document.location.reload();
    }
  }

  if (score === brickRowCount * brickColumnCount) {
    ctx.drawImage(youwin, 0, 0, canvas.width, canvas.height);
    if (ball.isStopped === false) {
      document.location.reload();
    }
  }
}

//the update function

function update() {
  ctx.clearRect(0, 0, width, height);
  requestAnimationFrame(update);
  ball.draw();
  ball.update(paddle, livesLost);
  paddle.draw();
  paddle.update();
  paddle.collision(ball, hit);
  drawBricks();
  collisionDetection(ball, collide);
  drawScore();
  drawLives();
  winOrLose();
}

update();
