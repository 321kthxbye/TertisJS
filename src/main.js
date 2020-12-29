"use strict";


let canvasMain = document.getElementById("mainCanvas");
let game = new Game(canvasMain);
let ticks = 0;
// game.board.fields = 
// ["..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..........",
// "..76540123"]


 document.onkeypress = function(){
        console.log("keypressed")
    }

function main() {
    window.requestAnimationFrame(main);
    game.drawBackground();
    game.drawBoard();
    game.drawTetromino(0);
    game.render();
    if(ticks === 40) {
        game.moveDown();
        ticks = 0;
    }
    else
        ++ticks;
}


game.spritesheet.onload = function() {
    main(game);
}

    //         game.drawBackground();
    //         game.drawBoard();
    //         game.drawTetromino(0);
    //         game.render();

