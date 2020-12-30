"use strict";

class Game {
    constructor(mainCanvas) {
        this.spritesheet = new Image();
        this.spritesheet.src = "res/sprites.png";
        this.mainCanvas = mainCanvas;
        this.ctxMain = mainCanvas.getContext('2d');
        
        this.canvasBackground = document.createElement("canvas");
        this.canvasBackground.width = this.mainCanvas.width;
        this.canvasBackground.height = this.mainCanvas.height;
        this.ctxBg = this.canvasBackground.getContext("2d");

        this.canvasForeground = document.createElement("canvas");
        this.canvasForeground.width = this.mainCanvas.width;
        this.canvasForeground.height = this.mainCanvas.height;
        this.ctxF = this.canvasForeground.getContext("2d");

        this.canvasTetromino = document.createElement("canvas");
        this.canvasTetromino.width = this.mainCanvas.width;
        this.canvasTetromino.height = this.mainCanvas.height;
        this.ctxT = this.canvasTetromino.getContext("2d");
        // Tetromino x y on board
        this.tx = 3;
        this.ty = 0;
        // Board x y on canvas
        this.bx = 3;
        this.by = 2;

        this.delta = 0; 

        this.board = new Board(10, 20);
        this.bind(3, 0, 1)

    }

    canPut(x, y, rotIndex){
        let rotation = this.tetromino.rotations[rotIndex];

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

    put(x, y, index){
        this.tx = x;
        this.ty = y;
        this.index = index;
    }

    moveLeft() {
        if(this.canPut(this.tx - 1, this.ty, this.index)) {
            this.put(this.tx - 1, this.ty, this.index);
            return true;
        }
        else 
            return false;
    }

    moveRight() {
        if(this.canPut(this.tx + 1, this.ty, this.index)) {
            this.put(this.tx + 1, this.ty, this.index);
            return true;
        }
        else 
            return false;
    }

    moveDown() {
        if(this.canPut(this.tx, this.ty + 1, this.index)) {
            this.put(this.tx, this.ty + 1, this.index);
            return true;
        }
        else 
            return false;
    }
    
    rotate() {
        if (this.canPut(this.tx, this.ty, (this.index + 1) % 4)) {
            this.put(this.tx, this.ty, (this.index + 1) % 4)
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

    release() {
        let x = this.tx;
        let y = this.ty
        let rotation = this.tetromino.rotations[this.index];

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
                this.tx = 0;
                this.ty = 0;
                this.index = 0;

            }
        }
    }

    bind(x, y, type){
        this.tx = x
        this.ty = y
        this.index = 0
        this.tetromino = new Tetromino(type)
    }
        

    render(){
        this.ctxMain.drawImage(this.canvasBackground, 0, 0);
        this.ctxMain.drawImage(this.canvasForeground, 0, 0);
        this.ctxMain.drawImage(this.canvasTetromino, 0, 0);
    }

    drawTetromino(index) {
        // First clean old image
        this.ctxT.clearRect(0,0,this.canvasTetromino.width, this.canvasTetromino.height)
        let rot = this.tetromino.rotations[index]
        // Absolute position of tetromino on canvas
        let x = this.tx + this.bx;
        let y = this.ty + this.by;
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
                    this.ctxT.drawImage(this.spritesheet,this.tetromino.type * 25, 0,25,25, aCol,aRow,25,25);
                }
            }
        }

    }

    drawBoard(){
        for(let row = 0; row < this.board.height; ++row){
            for(let col = 0; col < this.board.width; ++col){
                let letter = this.board.fields[row].charAt(col);
                if(letter === ".")
                    continue;
                let index = parseInt(letter);

                this.ctxF.drawImage(this.spritesheet, index * 25, 0,25,25, (this.bx + col) * 25, (this.by + row) * 25, 25, 25);
            }
        }

        this.ctxF.fillStyle = "white";
        this.ctxF.font = "20px Arial"
        this.ctxF.fillText("SCORE: 123456", (this.bx + 13) * 25, this.by + 50 )
    }

    drawBackground(){
        for(let row = 0; row < this.board.height; ++row){
            for(let col = 0; col < this.board.width; ++col){

                this.ctxBg.drawImage(this.spritesheet, 7 * 25, 0,25,25, (this.bx + col) * 25, (this.by + row) * 25, 25, 25);
            }
        }
    }
}