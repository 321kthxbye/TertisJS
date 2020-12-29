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

        this.tetromino = new Tetromino(0);
        this.board = new Board(10, 20);

    }

    render(){
        this.ctxMain.drawImage(this.canvasBackground, 0, 0);
        this.ctxMain.drawImage(this.canvasForeground, 0, 0);
        this.ctxMain.drawImage(this.canvasTetromino, 0, 0);
    }

    drawTetromino(index) {
        // this.ctxMain.drawImage(this.spritesheet,0, 0,25,25, 0,0,25,25)
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