//Importer le fichier sudoku

import Sudoku from'../js/sudoku.js'

class Resolve{
    constructor(){

        

        this.resolveBtn = document.getElementById('resolve')

        this.resolveBtn.addEventListener('click',(e)=>{

            //Tableau qui contient toutes les lignes
        const grid = []
        //Récupère toutes les valeurs
        for(let line = 0 ; line < 9 ; line++ ){
            const lineArray = []
            for(let col = 0 ; col < 9 ; col++ ){

                const coord= `${line}-${col}`
                const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)
                let val = cell.value
                let number = ""
                number = val === "" ? number = "" : number = parseInt(val,10)
                //Ajouter la valeur à la ligne
                lineArray.push(number)      
            }

            grid.push(lineArray)
        }


        const sudoku = new Sudoku(grid)
        sudoku.addEvent('valeur',(line,col,val)=>{

          console.error('valeur testé ' + val);

            // Récuperer le champs
            const cell = document.querySelector(`.game-value[data-coord="${line}-${col}"]`)
                  
            // Mettre à jour le champs
           
            cell.value = val
            
        })
        sudoku.resolve()

       

        })

    }
}

new Resolve()