"use strict";

class Game {
    constructor(mainCanvas) {
        this.status = "playing";
        this.score = 0;

        this.spritesheet = new Image();
        this.spritesheet.src = "res/sprites.png";
        this.mainCanvas = mainCanvas;
        this.ctxMain = mainCanvas.getContext('2d');
        this.renderer = new Renderer();

        this.previousFrameTime = 0;
        this.current = 0;
        this.delta = 0; 
        this.moveCounter = 0;
        // Board x y on canvas
        this.board = new Board(10, 20, 3, 2);

        // Tetromino x y on board, next type of tetromino
        this.bind(3,0, new Tetromino(this.getRandomInt(0,7), 3, 0));
        this.nextTetromino = new Tetromino(this.getRandomInt(0,7), 12, 3);
 
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    getPoints(lines) {
        let score = 0;

        switch(lines) {
            case 1:
                score = 40;
                break;
            case 2:
                score = 100;
                break;
            case 3:
                score = 300;
                break;
            case 4:
                score = 1200;
                break;
            default:
                score = 0;
                break;
        }

        return score;
    }

    canPut(x, y, rotIndex, tetromino) {
        let rotation = tetromino.rotations[rotIndex];

        // Go trough testing tetromino
        for(let row = 0; row < 4; ++row) {
            for(let col = 0; col < 4; ++col) {
                // Check every letter of tetromino
                let letter = rotation[row * 4 + col];
                // Get letters absolute position on board
                let posx = x + col;
                let posy = y + row;
                // If it is block and position is not empty return false
                if (letter in ["X", "0", "1", "2", "3", "4", "5", "6"] && !this.board.isEmpty(posx, posy))
                    return false;
            }
        }
        return true;
    }

    put(x, y, index, tetromino){
        tetromino.x = x;
        tetromino.y = y;
        tetromino.index = index;
    }

    moveLeft() {
        if(this.canPut(this.tetromino.x - 1, this.tetromino.y, this.tetromino.index, this.tetromino)) {
            this.put(this.tetromino.x - 1, this.tetromino.y, this.tetromino.index, this.tetromino);
            return true;
        }
        else 
            return false;
    }

    moveRight() {
        if(this.canPut(this.tetromino.x + 1, this.tetromino.y, this.tetromino.index, this.tetromino)) {
            this.put(this.tetromino.x + 1, this.tetromino.y, this.tetromino.index, this.tetromino);
            return true;
        }
        else 
            return false;
    }

    moveDown() {
        if(this.canPut(this.tetromino.x, this.tetromino.y + 1, this.tetromino.index, this.tetromino)) {
            this.put(this.tetromino.x, this.tetromino.y + 1, this.tetromino.index, this.tetromino);
            return true;
        }
        else 
            return false;
    }
    
    rotate() {
        if (this.canPut(this.tetromino.x, this.tetromino.y, (this.tetromino.index + 1) % 4, this.tetromino)) {
            this.put(this.tetromino.x, this.tetromino.y, (this.tetromino.index + 1) % 4, this.tetromino)
            return true;
        }
        else
            return false;
    }

    drop() {
        while (this.moveDown()) {
            continue;
        }
    }

    ghost() {
        this.ghostTetromino.x = this.tetromino.x;
        this.ghostTetromino.y = this.tetromino.y;
        this.ghostTetromino.index = this.tetromino.index;
        while(true) {
            if (this.canPut(this.ghostTetromino.x, this.ghostTetromino.y + 1, this.ghostTetromino.index, this.ghostTetromino))
            this.put(this.ghostTetromino.x, this.ghostTetromino.y + 1, this.ghostTetromino.index, this.ghostTetromino);
            else
                break;
        }
        
    }

    release() {
        let x = this.tetromino.x;
        let y = this.tetromino.y
        let rotation = this.tetromino.rotations[this.tetromino.index];

        // Go trough testing tetromino
        for(let row = 0; row < 4; ++row){
            for(let col = 0; col < 4; ++col){
                // Check every letter of tetromino
                // If empty skip
                let letter = rotation[row * 4 + col];
                if(letter === ".") {
                    continue;
                }
                // Get actual letters/blocks position on board
                let posx = x + col;
                let posy = y + row;
                // Put it on board
                let line = this.board.fields[posy];
                this.board.fields[posy] = line.slice(0,posx) + letter + line.slice(posx + 1, line.length);
                this.tetromino = undefined;
                this.ghostTetromino = undefined;

            }
        }
    }

    bind(x, y, tetromino){
        this.tetromino = tetromino
        this.tetromino.x = x
        this.tetromino.y = y
        this.tetromino.index = 0
        this.ghostTetromino = new Tetromino(tetromino.type, tetromino.x, tetromino.y)
        this.ghostTetromino.x = x
        this.ghostTetromino.y = y
        this.ghostTetromino.index = 0
    }

    drawTetromino(index, tetromino, alpha) {
        this.ctxMain.globalAlpha = alpha;
        let rot = tetromino.rotations[index]
        // Absolute position of tetromino on canvas
        let x = tetromino.x + this.board.x;
        let y = tetromino.y + this.board.y;
        // This creates separate line
        for(let row = 0; row < 4; ++row){
            let line = rot.slice(row * 4, row * 4 + 4);
            // This gets one letter
            for(let col = 0; col < 4; ++col){
                let letter = line.charAt(col);
                // Get actual position of single tetromino blocks
                let aCol = (x + col) * 25;
                let aRow = (y + row) * 25;
                // Skip empty
                if(letter === "."){
                    continue;
                }
                else
                {
                    this.ctxMain.drawImage(this.spritesheet, tetromino.type * 25, 0,25,25, aCol,aRow,25,25);
                }
            }
        }
        this.ctxMain.globalAlpha = 1;
    }

    drawTetrominos(){
        this.drawTetromino(this.tetromino.index, this.tetromino, 1);
        this.drawTetromino(this.ghostTetromino.index, this.ghostTetromino, 0.5);
        this.drawTetromino(this.nextTetromino.index, this.nextTetromino, 1);
    }

    // drawBoard()
    // {
    //     for(let row = 0; row < this.board.height; ++row){
    //         for(let col = 0; col < this.board.width; ++col){
    //             let letter = this.board.fields[row].charAt(col);
    //             if(letter === ".")
    //                 continue;
    //             let index = parseInt(letter);

    //             this.ctxMain.drawImage(this.spritesheet, index * 25, 0,25,25, (this.board.x + col) * 25, (this.board.y + row) * 25, 25, 25);
    //         }
    //     }

    //     this.ctxMain.fillStyle = "white";
    //     this.ctxMain.font = "20px Arial"
    //     this.ctxMain.fillText("SCORE: " + this.score, (this.board.x + 13) * 25, this.board.y + 50 )
    //     this.ctxMain.fillText("NEXT:", (this.board.x + 13) * 25, this.board.y + 100 )

    // }

    drawDialogues() {
        if(this.status == "paused"){
            this.ctxMain.fillStyle = "white";
            this.ctxMain.font = "30px Arial"
            this.ctxMain.fillText("PAUSE", (this.board.x + 3) * 25, this.board.y + 300 )
            this.ctxMain.fillStyle = "black";
            this.ctxMain.strokeText("PAUSE", (this.board.x + 3) * 25, this.board.y + 300 )
        }
        if (this.status === "gameOver") {
            this.ctxMain.fillStyle = "white";
            this.ctxMain.font = "30px Arial"
            this.ctxMain.fillText("GAME OVER", (this.board.x + 1) * 25, this.board.y + 300 )
            this.ctxMain.fillStyle = "black";
            this.ctxMain.strokeText("GAME OVER", (this.board.x + 1) * 25, this.board.y + 300 )
        }
    }
    
    // drawBackground(){
    //     for(let row = 0; row < this.board.height; ++row){
    //         for(let col = 0; col < this.board.width; ++col){

    //             this.ctxMain.drawImage(this.spritesheet, 7 * 25, 0,25,25, (this.board.x + col) * 25, (this.board.y + row) * 25, 25, 25);
    //         }
    //     }
    // }
}