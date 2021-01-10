"use strict";

class Game {
    constructor() {
        this.status = "playing";
        this.score = 0;

        this.previousFrameTime = 0;
        this.current = 0;
        this.delta = 0; 
        this.moveCounter = 0;
        // Board x y on canvas
        this.board = new Board(10, 20, 3, 2);

        // Tetromino x y on board, next type of tetromino
        this.bind(3,0, new Tetromino(this.getRandomInt(0,7), 3, 0));
        this.nextTetromino = new Tetromino(this.getRandomInt(0,7), 12, 3);

        this.renderer = new Renderer();
 
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


    move(xOff, yOff) {
        if(this.canPut(this.tetromino.x + xOff, this.tetromino.y + yOff, this.tetromino.index, this.tetromino)) {
            this.put(this.tetromino.x + xOff, this.tetromino.y + yOff, this.tetromino.index, this.tetromino);
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
        while (this.move(0, 1)) {
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

}