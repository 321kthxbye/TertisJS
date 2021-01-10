"use strict"

class Renderer {

    constructor(){
        this.spritesheet = new Image();
        this.spritesheet.src = "res/sprites.png";
        this.mainCanvas = mainCanvas;
        this.ctxMain = mainCanvas.getContext('2d');
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