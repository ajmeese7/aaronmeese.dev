// Modified from http://steamcommunity.com/sharedfiles/filedetails/?id=892374811
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = screen.width;
canvas.height = screen.height;

var matrix = "АБВГДЕЁЖЗИЙКЛМНОавгдеёжзийклмноПРСТУФХЦЧШЩЪЫЬЭЮЯпрстуфхцчшщъыьэюя";
matrix = matrix.split('');

var font_size = 10;
var num_columns = canvas.width / font_size;
var drops = [];

for (var xCoord = 0; xCoord < num_columns; xCoord++) {
  drops[xCoord] = 1;
}

function draw() {
  // TODO: Fix the container height/width on mobile!
  var viewportHeight = (typeof window.innerHeight != 'undefined' ? window.innerHeight : document.body.offsetHeight);
  document.getElementById("container").setAttribute("style","height:" + viewportHeight + "px")

  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = font_size + "px arial";

  for (var i = 0; i < drops.length; i++) {
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);

    ctx.fillStyle = "#0F0";
    var text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    // TODO: Make it so there is more overlap on phones

    if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 35);
