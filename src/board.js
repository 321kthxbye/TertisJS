class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.fields = [];

        // Create list of rows
        for(let i = 0; i < this.height; ++i) {
            let row = "";
            for(let j = 0; j < this.width; ++j){
                row += ".";
            }
            this.fields.push(row);
        }
    }
}