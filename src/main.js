"use strict";

let canvasMain = document.getElementById("mainCanvas");
let game = new Game(canvasMain);
game.board.fields = 
["..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..........",
"..76540123"]


game.spritesheet.onload = function(){
    game.drawBackground();
    game.drawBoard();
    game.drawTetromino(0);
    game.render();
}
