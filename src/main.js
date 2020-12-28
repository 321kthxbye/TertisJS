"use strict";

let canvasMain = document.getElementById("mainCanvas");
let game = new Game(canvasMain);


game.spritesheet.onload = function(){
    game.drawTetromino(0,0,0);
}
