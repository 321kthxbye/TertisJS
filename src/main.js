"use strict";


 function onKeydown(e){
    console.log(e.code);
    if(e.cancelable)
        e.preventDefault();

    if(game.status === "playing") {
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
                game.bind(3,0,game.nextTetromino);
                game.nextTetromino = new Tetromino(game.getRandomInt(0,7), 12, 3);
               break;
           case "Space":
                game.rotate();
                break;
            case "Enter":
                game.status = "paused";
                break;
           default:
               break;
        }
        game.ghost();
    }
    else if(game.status === "paused") {
        console.log("PAUSE");
        if(e.code === "Enter")
            game.status = "playing";        
    }
    else if(game.status === "gameOver") {
        console.log("GAME OVER");
    }
     
 }

document.addEventListener("keydown", onKeydown);

function tick() {
    window.requestAnimationFrame(tick);
    game.ctxMain.clearRect(0,0,game.mainCanvas.width, game.mainCanvas.height);
    game.drawBackground();
    game.drawBoard();
    game.ghost();
    game.drawTetrominos();
    game.render();

    if(game.status === "playing") {
        game.current = Date.now();
        game.delta = game.current - game.previousFrameTime;
        game.previousFrameTime = game.current;
        game.moveCounter -= game.delta;

        if(game.moveCounter <= 0) {
            
            if(!game.moveDown()){
                game.release();
                game.bind(3,0,game.nextTetromino);
                game.nextTetromino = new Tetromino(game.getRandomInt(0,7), 12, 3);
            }
            game.moveCounter = 500;
        } 
        game.board.remComplLines();
    } 
    else if (game.status === "paused") {
        console.log("PAUSED");
    } 
    else if (game.status === "gameOver") {
        console.log("Game over");
    }
    
}

function onload () {
    window.game = new Game(document.getElementById("mainCanvas"));
    game.previousFrameTime = Date.now();
    tick();
}

window.addEventListener("load", onload);



