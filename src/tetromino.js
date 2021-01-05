"use strict";

class Tetromino {
    constructor(type){
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.index = 0;
        
        switch(type){
            case 0:
                this.rotations = [
                    "....0000........", ".0...0...0...0..", "....0000........", ".0...0...0...0.."];
                break;
            case 1:
                this.rotations = [
                    ".....11..11.....", ".....11..11.....", ".....11..11.....", ".....11..11....."];
                break;
            case 2:
                this.rotations = [
                    ".2..222.........", ".2...22..2......", "....222..2......", ".2..22...2......"];
                break;
            case 3:
                this.rotations = [
                    "3...333.........", ".33..3...3......", "....333...3.....", ".3...3..33......"];
                break;
            case 4:
                this.rotations = [
                    "..4.444.........", ".4...4...44.....", "....444.4.......", "44...4...4......"];
                break;
            case 5:
                this.rotations = [
                    ".55.55..........", ".5...55...5.....", ".....55.55......", "5...55...5......"];
                break;
            case 6:
                this.rotations = [
                    "66...66.........", "..6..66..6......", "....66...66.....", ".6..66..6......."];
                break;
            default:
                console.log("Invalid tetromino type!");
                break;

        }
      
    }
}