var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d") //this is the paintbrush; using c tells the paintbrush what to do

var width = c.canvas.width
var height = c.canvas.height


function Ball(x, y, vx, vy, radius) {

  this.x = Math.random() * width
  this.y = Math.random() * height
  this.vx = vx;
  this.vy = vy;
  this.radius = radius;
  this.color = "red"
}


Ball.prototype.draw = function () {

  c.fillStyle = this.color
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  c.closePath()
  c.fill()
}

Ball.prototype.click = function () {
  console.log("Ball clicked")

  switch (this.color) {
    case "red":
      this.color = "green";
      break;
    case "green":
      this.color = "blue";
      break;
    default:
      this.color = "red"
  }
}


var b = new Ball(100, 100, 5, 2, 25)

b.draw()

