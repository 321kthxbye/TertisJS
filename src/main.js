"use strict";


let canvasMain = document.getElementById("mainCanvas");
let game = new Game(canvasMain);
let previousFrameTime = Date.now();
let moveCounter = 500;
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

    let current = Date.now();
    let delta = current - previousFrameTime;
    previousFrameTime = current;
    moveCounter -= delta;

    if(moveCounter <= 0) {
        game.moveDown();
        moveCounter = 500;
    }

    console.log(delta)
    
}


game.spritesheet.onload = function() {
    main();
}

    //         game.drawBackground();
    //         game.drawBoard();
    //         game.drawTetromino(0);
    //         game.render();

