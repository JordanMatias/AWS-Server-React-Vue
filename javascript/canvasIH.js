var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d") //this is the paintbrush; using c tells the paintbrush what to do


function drawIH() {


  //the circle
  //c.translate(-110, -50)
  c.fillStyle = "blue"
  c.beginPath() //take up pencil
  c.arc(150, 150, 50, 0, Math.PI * 2, false);//establish point and path
  c.closePath()//put down pencil
  c.fill()
  //c.strokeStyle = "white";



  // the I rectangle
  c.restore()
  c.beginPath() //take up pencil
  c.fillStyle = "yellow"
  c.fillRect(100, 250, 100, 200) // outlines the starting dot of rect then dimensions
  c.closePath() //put down pencil
  //c.strokeStyle = "white";
  c.stroke();

  //the H
  c.fillStyle = "green"
  c.beginPath() //take up pencil
  c.moveTo(250, 100); // stsrting dot
  c.lineTo(250, 450);
  c.lineTo(350, 450);
  c.lineTo(350, 300);
  c.lineTo(450, 300);
  c.lineTo(450, 450);
  c.lineTo(550, 450);
  c.lineTo(550, 200);
  c.lineTo(350, 200);
  c.lineTo(350, 100);
  c.closePath() // puts down pencil and ALSO ends at starting point
  c.fill()
  //c.strokeStyle = "white";
  c.stroke();

}

var width = c.canvas.width;
var height = c.canvas.height;

var score = 0;

var b1 = new Ball(100, 100, 5, 2, 100);
var b2 = new Ball(100, 100, 2, 5, 100);

function update() {
  b1.goToNextPosition();
  b2.goToNextPosition();
  c.clearRect(0, 0, canvas.width, canvas.height);
  b1.draw();
  b2.draw();
  drawScore();
}

setInterval(update, 20)

function drawScore() {
  c.font = "30px sans-serif"
  c.fillText("Score: " + score, width - 150, 40)
}


canvas.onclick = function (e) {

  if (b1.isItClicked(e.offsetX, e.offsetY)) {
    b1.click()
    score++;
  }
  if (b2.isItClicked(e.offsetX, e.offsetY)) {
    b2.click()
    score++;
  }
}

  // if (Math.abs(e.offsetX - b.x) <= b.radius && Math.abs(e.offsetY - b.y) <= b.radius) {
  //   b.click();
  // }
