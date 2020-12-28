class Game {
    constructor(mainCanvas) {
        this.spritesheet = new Image();
        this.spritesheet.src = "res/sprites.png";
        this.mainCanvas = mainCanvas;
        this.ctxMain = mainCanvas.getContext('2d');

        this.tetromino = new Tetromino(6);

    }

    drawTetromino(x, y, index) {
        // this.ctxMain.drawImage(this.spritesheet,0, 0,25,25, 0,0,25,25)
        let rot = this.tetromino.rotations[index]
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
                    this.ctxMain.drawImage(this.spritesheet,this.tetromino.type * 25, 0,25,25, aCol,aRow,25,25);
                }
            }
        }

    }

    drawBoard(x, y){
        
    }
}