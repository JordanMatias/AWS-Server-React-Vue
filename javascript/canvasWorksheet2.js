var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
var ballRadius = 10;
var color = "purple";
var paddleHeight = 10;
var paddleWidth = 60;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false; //stores info about keypresses
var leftPressed = false;
var rows = 3; //bricks
var columns = 5;
var width = 75;
var height = 20;
var topPadding = 10;
var leftPadding = 30;
var rightPadding = 30;

var bricks = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//how to activate keydown & keyup
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

function drawBall() {
  //drawing code
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = color;
  ctx.fill();
  // console.log("inside drawBall function");
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleWidth);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  //console.log("Paddle Drawn");
}

function draw() {
  //clear and increment
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  x += dx; // updates position of x
  y += dy; // updates position of y for next frame

  if (x + dx + ballRadius > canvas.width || x + dx < ballRadius) {
    //color = getRandomColor();
    dx = -dx;
  }

  // if (y + dy + ballRadius > canvas.height || y + dy < ballRadius) {
  //   //color = getRandomColor();
  //   dy = -dy;
  // }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy + ballRadius > canvas.height) {
    //if it hits the bottom border
    if (x > paddleX && x < paddleX + paddleWidth) {
      // it it hits paddle
      dy = -dy;
    }
    // } else alert("GAME OVER");
    // document.location.reload();
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 10;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 10;
  }
}

// function getRandomColor() {
//   var letters = "0123456789ABCDEF";
//   var intermediateColor = "#";
//   for (var i = 0; i < 6; i++) {
//     intermediateColor += letters[Math.floor(Math.random() * 16)];
//   }
//   return intermediateColor;
// }

setInterval(draw, 10);
