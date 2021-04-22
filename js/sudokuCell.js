export default class SudokuCell{

    constructor(){
        this.isInitialVal = false
        this.initValue()
    }

    initValue(){
        this.possibleVal = [1,2,3,4,5,6,7,8,9]
    }

    setInitialVal(val){
        this.val = val
        this.isInitialVal = true  
    }

    nextValue(){
        // Récupèrer et Retirer la première valeur du tableau
        this.val = this.possibleVal.shift()
        // Retourner cette valeur
        return this.val

    }

}