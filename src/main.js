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


 document.addEventListener("keydown", onKeydown);

 function onKeydown(e){
     console.log(e.code);
     if(e.cancelable)
        e.preventDefault();

     switch (e.code) {
         case "ArrowRight":
            game.moveRight();
             break;
        case "ArrowLeft":
            game.moveLeft();
            break;
        case "ArrowDown":
            game.moveDown();
            break;
        case "ArrowUp":
            game.drop();
            game.release();
            game.bind(3,0,game.getRandomInt(0,7));
            break;
        case "Space":
            game.rotate();
            break;
        default:
            break;
     }
 }

function main() {
    window.requestAnimationFrame(main);
    game.drawBackground();
    game.drawBoard();
    game.drawTetromino(game.index);
    game.render();


    let current = Date.now();
    let delta = current - previousFrameTime;
    previousFrameTime = current;
    moveCounter -= delta;

    if(moveCounter <= 0) {
        if(!game.moveDown()){
            game.release();
            game.bind(3,0,game.getRandomInt(0,7));
        }
        moveCounter = 500;
    }
    
    game.board.remComplLines();
    
}

game.spritesheet.onload = function() {
    main();
}
