/////BALL/////

function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  //this.dxRange = this.dx * 2;
  this.radius = radius;
  this.color = color;
  this.isStopped = true;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
};

Ball.prototype.update = function(paddle) {
  if (this.isStopped) return;
  this.x += this.dx;
  this.y += this.dy;

  //bouncing on left and right
  if (
    this.x + this.dx + this.radius > canvas.width ||
    this.x + this.dx < this.radius
  ) {
    this.dx = -this.dx;
  }
  //bouncing off top
  if (this.y + this.dy < this.radius) {
    /* || this.y + this.dy > canvas.height <-- code to bounce at bottom */
    this.dy = -this.dy;
  } else if (this.y > canvas.height - this.radius) {
    this.resetBall(paddle);
    paddle.resetPaddle();
    drawBricks();
  }
};

Ball.prototype.resetBall = function(paddle) {
  lives--;
  this.isStopped = true;
  this.x = 400;
  this.y = canvas.height - 30;
  this.dx = 8;
  this.dy = -8;
};

/////PADDLE/////

function Paddle(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.isStopped = true;
}

Paddle.prototype.draw = function() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
};

Paddle.prototype.update = function() {
  if (rightPressed && this.x < canvas.width - this.width) {
    this.x += 15;
  } else if (leftPressed && this.x > 0) {
    this.x -= 15;
  }
};

Paddle.prototype.resetPaddle = function() {
  this.x = 317.5;
  this.y = 585;
  this.dx = this.dx;
  this.dy = -this.dx;
};

Paddle.prototype.collision = function(ball) {
  if (
    ball.x + ball.radius >= this.x &&
    ball.x - ball.radius <= this.x + this.width &&
    ball.y + ball.radius / 2 >= this.y
  ) {
    ball.dy = -ball.dy; //* 1.5;
  }
};

////////////////////////////////////////////

var brickRowCount = 8;
var brickColumnCount = 4;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 35;
var brickOffsetLeft = 65;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if (r == 0) {
          ctx.fillStyle = "#1fe2df";
        } else if (r == 1) {
          ctx.fillStyle = "#27ae60";
        } else if (r == 2) {
          ctx.fillStyle = "#ED8F03";
        } else if (r == 3) {
          ctx.fillStyle = "#005dff";
        } else if (r == 4) {
          ctx.fillStyle = "#961894";
        } else if (r == 5) {
          ctx.fillStyle = "#fff200";
        } else if (r == 6) {
          ctx.fillStyle = "#e52020";
        } else if (r == 7) {
          ctx.fillStyle = "#65e520";
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// var brick = new Brick(75, 20, 6, 3, 10, 40, 30, "292929");

//collision detection

function collisionDetection(ball) {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brickWidth &&
          ball.y > b.y &&
          ball.y < b.y + brickHeight
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

///BRICKS////

// function Brick(
//   width,
//   height,
//   columns,
//   rows,
//   padding,
//   offsetLeft,
//   offsetTop,
//   color
// ) {
//   this.x; //(columns) * (this.width + this.padding) + this.offsetLeft
//   this.y;
//   this.width = width;
//   this.height = height;
//   this.columns = columns;
//   this.rows = rows;
//   this.padding = padding;
//   this.offsetLeft = offsetLeft;
//   this.offsetTop = offsetTop;
//   this.color = color;
//   this.bricks = [];
// }

// Brick.prototype.draw = function(ball) {
//   for (var i = 0; i < this.columns; i++) {
//     //used to create brick columns (empty)
//     this.bricks[i] = [];
//     for (var j = 0; j < this.rows; j++) {
//       this.bricks[i][j] = { x: 0, y: 0 }; //creates starting x and y position of bricks
//     }
//   }

//   for (var i = 0; i < this.columns; i++) {
//     for (var j = 0; j < this.rows; j++) {
//       //console.log(this.brickStatus);
//       if (this.status !== false) {
//         this.x = i * (this.width + this.padding) + this.offsetLeft;
//         this.y = j * (this.height + this.padding) + this.offsetTop;
//         this.bricks[i][j].x = this.x;
//         this.bricks[i][j].y = this.y;
//         ctx.beginPath();
//         ctx.rect(this.x, this.y, this.width, this.height);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// };

// Brick.prototype.collision = function(ball) {
//   // to detect is ball coordinates hit brick coordinate
//   for (var i = 0; i < this.columns; i++) {
//     for (var j = 0; j < this.rows; j++) {
//       var b = this.bricks[i][j];
//       console.log(b.status); //coordinates of brick hit by ball
//       if (b.status === true) {
//         if (
//           ball.x > b.x &&
//           ball.x < b.x + this.width &&
//           ball.y > b.y &&
//           ball.y < b.y + this.height
//         ) {
//           ball.dy = -ball.dy;
//           b.status = false;
//           //score++;
//           ///console.log(this.bricks[i][j]);
//           // if (score === brickColumnCount * brickRowCount) {
//           //   alert("You win!");
//           //   //document.location.reload() - autoreloads
//           //   //start button?
//           // }
//         }
//       }
//     }
//   }
// };
