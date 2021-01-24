"use strict";

class Game {
    constructor() {
        this.status = "playing";
        this.score = 0;

        this.previousFrameTime = 0;
        this.current = 0;
        this.delta = 0; 
        this.moveCounter = 0;
        this.numbers = [];
        // Board x y on canvas
        this.board = new Board(10, 20, 3, 2);

        // Tetromino x y on board, next type of tetromino
        this.bind(3,0, new Tetromino(this.getRandomInt(), 3, 0));
        this.nextTetromino = new Tetromino(this.getRandomInt(), 12, 3);

        this.renderer = new Renderer();
        this.soundCollection = new SoundCollection();
        this.mute = false;

    }

    getRandomInt () {

            if(this.numbers.length === 0){
                this.numbers = [0, 1, 2, 3, 4, 5, 6];
                
                for(let x = 0; x < 14; ++x) {
                    let min = 0;
                    let max = 7;
                    let i1 =  Math.floor(Math.random() * (max - min) + min);
                    let i2 =  Math.floor(Math.random() * (max - min) + min);
                    let firstNumber = this.numbers[i1];
                    this.numbers[i1] = this.numbers[i2];
                    this.numbers[i2] = firstNumber;
                }

            }
            return this.numbers.pop();
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
        let x = this.tetromino.x + xOff;
        let y = this.tetromino.y + yOff;

        if(this.canPut(x, y, this.tetromino.index, this.tetromino)) {
            this.put(x, y, this.tetromino.index, this.tetromino);
            return true;
        }
        else 
            return false;
    }
   
    rotate() {
        let x = this.tetromino.x;
        let y = this.tetromino.y;
        let index = (this.tetromino.index + 1) % 4;
        let xOff = [0, 1, 2, -1, -2];

        for(let i = 0; i < xOff.length; ++i) {
            if (this.canPut(x + xOff[i], y, index, this.tetromino)) {
                this.put(x + xOff[i], y, index, this.tetromino)
                return true;
            }
        }
        return false;
    }

    drop() {
        while (this.move(0, 1)) {
            continue;
        }
    }

    ghost() {
        if(this.tetromino !== undefined) {
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