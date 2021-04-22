import Sudoku from'./sudoku.js'

const randomNumber = nombreMax =>{
   return Math.trunc(Math.random() * nombreMax + 1)
    
  
}

const importGrid = async () => {


    /*
     console.log(response);
        if(response.ok === true){
            const json = await response.json()
            console.log(json)
        }else{
            console.log(`Fichier introuvable - erreur : ${response.status}`)
        }
    */

    const data = await fetch('../js/grid.json')
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

    const test = new Sudoku(grid)
    test.isValid()


}

importGrid()