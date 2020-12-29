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

    isEmpty(x, y) {
        if(!(0 <= x && x < this.width))
            return false;
        else if (!(0 <= y && y < this.height))
            return false;
        else if (!(this.fields[y][x] === "."))
            return false;
        
        return true;
    }

}