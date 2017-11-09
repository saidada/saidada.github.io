"use strict";

window.onload = function (){

  var canvas = document.getElementById('tama');
  var ctx    = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 400;


var x = 200;
var y = 200;
var v = 1;

ctx.beginPath();
ctx.arc(x, y, 20, 0, Math.PI*2, true);
ctx.fill();
ctx.stroke();

document.onkeyup = function (){
  console.log("はなす");
  v = 1;

  }

  document.onkeydown = function (e){
    if(v <= 20){
      v += 0.5;
    }

  	if(e.keyCode == 37){
      x -= v;
      maru();
  	}
    if(e.keyCode == 38){
      y -= v;
      maru();
    }
    if(e.keyCode == 39){
      x += v;
      maru();
    }
    if(e.keyCode == 40){
      y += v;
      maru();
    }
    if(e.keyCode == 32){
      x = 200;
      y = 200;
      maru();
    }
  };


function maru(){
      ctx.clearRect(0,0,800,400);//消す
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI*2, true);
      ctx.fill();
      ctx.stroke();
    }

}
