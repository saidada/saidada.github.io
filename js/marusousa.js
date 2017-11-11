"use strict";

window.onload = function (){

  var canvas = document.getElementById('tama');
  var ctx    = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 400;


var x = 200;
var y = 200;
var v = 2;
var vp = 1;
var r = 50;

ctx.beginPath();
ctx.fillStyle = `rgb(131, 255, 233)`;
ctx.arc(x, y, r, 0, Math.PI*2, true);
ctx.fill();
ctx.stroke();


var ki = new KeyboardInput();
setInterval(kibodo, 16);

function kabenashi(){
  if(y <= -50 ){y =  450;}
  if(y >   450){y = -50; }
  if(x <= -50 ){x =  850;}
  if(x >   850){x = -50; }
}

function kabeari(){
//上手くいかないので放置
}

  function kibodo(){
    ki.update();
    var KEY_LEFT  = 37;
    var KEY_UP    = 38;
    var KEY_RIGHT = 39;
    var KEY_DOWN  = 40;
    var KEY_SPACE = 32;

    if (ki.isDown(KEY_LEFT)) { v = 2; }
    if (ki.isDown(KEY_UP))   { v = 2; }
    if (ki.isDown(KEY_RIGHT)){ v = 2; }
    if (ki.isDown(KEY_DOWN)) { v = 2; }

    if (ki.isHolding(KEY_LEFT)) { x -= v;}
    if (ki.isHolding(KEY_UP))   { y -= v;}
    if (ki.isHolding(KEY_RIGHT)){ x += v;}
    if (ki.isHolding(KEY_DOWN)) { y += v;}
    if (ki.isHolding(KEY_SPACE)){ r = 55;  v += vp ; }

    var vert = ki.isDown(KEY_UP) ||  ki.isDown(KEY_DOWN);
    var horz = ki.isDown(KEY_LEFT) || ki.isDown(KEY_RIGHT);
    if (vert && horz) {
      x /= 1.41421356;
      y /= 1.41421356;
    }

    if (ki.isUp(KEY_SPACE)){ r = 50;  v =  vp; }

    kabenashi();
    maru();
}


function maru(){
      ctx.clearRect(0,0,800,400);//消す
      ctx.beginPath();
      ctx.fillStyle = `rgb(131, 255, 233)`;
      ctx.arc(x, y, r, 0, Math.PI*2, true);
      ctx.fill();
      ctx.stroke();
    }

}
