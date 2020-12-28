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
"......0123"]


game.spritesheet.onload = function(){
    game.drawBackground(0,0);
    game.drawBoard(0,0);
    game.drawTetromino(0,0,0);
    game.render();
}
