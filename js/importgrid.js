import Sudoku from'../js/sudoku.js'


const randomNumber = nombreMax =>{
    return Math.trunc(Math.random() * nombreMax + 1)
}


class ImportGrid{


    constructor(){


        this.importGrid()

        const runGame = document.querySelector('#newGame')

        runGame.addEventListener('click',(e)=>{

            importGrid.importGrid()
            
        })
    }


    async importGrid(){

        this.cleanGrid();
 

        const data = await fetch('js/grid.json')
            .then(response => {
                if(response.ok === true){
                  return response.json()
                }else{
                    return Promise.reject(`Fichier introuvable - erreur : ${response.status}`)
                }
            })
    
        const gridNumber = randomNumber(data.length)
    
        const sudoku = data[gridNumber - 1]
        const grid = sudoku.grid
        const level = `Level : ${sudoku.level}`
    
        const levelContainer = document.querySelector('.level')
        levelContainer.textContent = level
        console.log(level);
    
        //On affiche le niveau de difficulté
    
        for(let line = 0 ; line < 9 ; line++ ){
            for(let col = 0 ; col < 9 ; col++ ){
                const val = grid[line][col]
    
    
                if(val !== null){
    
                    const coord= `${line}-${col}`
                    const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)
                    cell.readOnly = true
                    cell.value = val
    
                }
    
            }
        }
    
    }

    cleanGrid(){

        for(let line = 0 ; line < 9 ; line++ ){
            for(let col = 0 ; col < 9 ; col++ ){
                const val = ''  
                    const coord= `${line}-${col}`
                    const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)
                    cell.value = val
                        
            }
        }

    }

}

new ImportGrid()







