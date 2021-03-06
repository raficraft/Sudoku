export default class SudokuCursor{

    constructor(){

        this.line = 0
        this.col  = 0
        this.start = "forward"

    }

    progress(){

        if(this.start === "forward"){
            return this.moveForward()
        }else if(this.start === "backward"){
            return this.moveBack()
        }
    }


    moveForward(){


        // Si le curseur est au bout du sudoku
        if(this.line === 8 && this.col === 8){
            return false
        }

        //Si le curseur est en bout de ligne
        if(this.col === 8){
            this.line +=1
            this.col = 0
        }else{
            this.col +=1
        }
        return true

    }
    
    moveBack(){
        
          // Si le curseur est au début du sudoku
        if(this.line === 0 && this.col === 0){
            return false
        }

        //Si le curseur est en bout de ligne
        if(this.col === 0){
            this.line -=1
            this.col = 8
        }else{
            this.col -=1
        }

        return true
    }
}

const cursor = new SudokuCursor()
