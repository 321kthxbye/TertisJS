"use strict";


 function onKeydown(e){
    console.log(e.code);
    if(e.cancelable)
        e.preventDefault();

    if(game.status === "playing") {
        switch (e.code) {
            case "ArrowRight":
                game.move(1, 0);
                break;
           case "ArrowLeft":
                game.move(-1, 0);
               break;
           case "ArrowDown":
                game.move(0, 1);
               break;
           case "ArrowUp":
                game.drop();
                game.release();
                if(game.canPut(3, 0, 0, game.nextTetromino)) {
                    game.bind(3,0,game.nextTetromino);
                    game.nextTetromino = new Tetromino(game.getRandomInt(), 12, 3);
                }
                else
                    game.status = "gameOver";  
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
        if(e.code === "Enter")
            game = new Game(document.getElementById("mainCanvas"))
    }
     
 }

document.addEventListener("keydown", onKeydown);

function tick() {
    window.requestAnimationFrame(tick);
    //game.renderer.ctxMain.clearRect(0,0,game.mainCanvas.width, game.mainCanvas.height);
    game.renderer.clear();
    game.renderer.drawBackground(game.board);
    game.renderer.drawBoard(game.board, game.score);
    game.ghost();
    game.renderer.drawTetrominos(game.tetromino, game.ghostTetromino, game.nextTetromino, game.board);
    game.renderer.drawDialogues(game.status, game.board);


    if(game.status === "playing") {
        game.current = Date.now();
        game.delta = game.current - game.previousFrameTime;
        game.previousFrameTime = game.current;
        game.moveCounter -= game.delta;

        if(game.moveCounter <= 0) {         
            if(!game.move(0, 1)){
                game.release();
                if(game.canPut(3, 0, 0, game.nextTetromino)) {
                    game.bind(3,0,game.nextTetromino);
                    game.nextTetromino = new Tetromino(game.getRandomInt(), 12, 3);
                }
                else
                    
                game.status = "gameOver";                         
            }
            game.moveCounter = 500;
        } 
        game.score += game.getPoints(game.board.remComplLines());
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



