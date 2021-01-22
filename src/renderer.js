"use strict"

class Renderer {

    constructor(){
        this.spritesheet = new Image();
        this.spritesheet.src = "res/sprites.png";
        this.mainCanvas = mainCanvas;
        this.ctxMain = mainCanvas.getContext('2d');
    }

    clear(){
        this.ctxMain.clearRect(0,0,this.mainCanvas.width, this.mainCanvas.height);
    }

    drawDialogues(status, board) {
        if(status == "paused"){
            this.ctxMain.fillStyle = "white";
            this.ctxMain.font = "30px Arial"
            this.ctxMain.fillText("PAUSE", (board.x + 3) * 25, board.y + 300 )
            this.ctxMain.fillStyle = "black";
            this.ctxMain.strokeText("PAUSE", (board.x + 3) * 25, board.y + 300 )
        }
        if (status === "gameOver") {
            this.ctxMain.fillStyle = "white";
            this.ctxMain.font = "30px Arial"
            this.ctxMain.fillText("GAME OVER", (board.x + 1) * 25, board.y + 300 )
            this.ctxMain.fillStyle = "black";
            this.ctxMain.strokeText("GAME OVER", (board.x + 1) * 25, board.y + 300 )
        }
    }

    drawTetromino(tetromino, alpha, board) {
        if(tetromino !== undefined) {
            this.ctxMain.globalAlpha = alpha;
        let rot = tetromino.rotations[tetromino.index]
        // Absolute position of tetromino on canvas
        let x = tetromino.x + board.x;
        let y = tetromino.y + board.y;
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
    }

    drawTetrominos(tetromino, ghostTetromino, nextTetromino, board){
        this.drawTetromino(tetromino, 1, board);
        this.drawTetromino(ghostTetromino, 0.5, board);
        this.drawTetromino(nextTetromino, 1, board);
    }

    drawBoard(board, score)
    {
        for(let row = 0; row < board.height; ++row){
            for(let col = 0; col < board.width; ++col){
                let letter = board.fields[row].charAt(col);
                if(letter === ".")
                    continue;
                let index = parseInt(letter);

                this.ctxMain.drawImage(this.spritesheet, index * 25, 0,25,25, (board.x + col) * 25, (board.y + row) * 25, 25, 25);
            }
        }

        this.ctxMain.fillStyle = "white";
        this.ctxMain.font = "20px Arial"
        this.ctxMain.fillText("SCORE: " + score, (board.x + 13) * 25, board.y + 50 )
        this.ctxMain.fillText("NEXT:", (board.x + 13) * 25, board.y + 100 )

    }

    drawBackground(board){
        for(let row = 0; row < board.height; ++row){
            for(let col = 0; col < board.width; ++col){

                this.ctxMain.drawImage(this.spritesheet, 7 * 25, 0,25,25, (board.x + col) * 25, (board.y + row) * 25, 25, 25);
            }
        }
    }
}