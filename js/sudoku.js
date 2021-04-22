import SudokuCell from '../js/sudokuCell.js'
import SudokuCursor from '../js/cursor.js'

export default class Sudoku{
    constructor(grid){

        this.grid = []
        this.events = new Map()

        //Parcourir toutes les lignes et toutes les colonnes
        for(let line = 0 ; line < 9 ; line++ ){
            const gridLine = []
            
           
            for(let col = 0 ; col < 9 ; col++ ){
                const val = grid[line][col]
                const cell = new SudokuCell()
                //Si la case à une valeur
                if(val&&val !== ''){
                    //Indiquer le fait qu'elle ne puisse pas être modifier
                    //Et déf
                    cell.setInitialVal(val)                  
                }
                gridLine.push(cell)
            }
            this.grid.push(gridLine)
        }
        //Et pour chaque case
        //Sauvegarder la valeur



    }

    async resolve(){

        // Instancier le curseur
        const cursor = new SudokuCursor()

        
        do{
        // Effectue les recherches
        // Récupérer la veleur la ou ce situe le curseur
        const cell = this.grid[cursor.line][cursor.col]
       
       

            // si la valeur de la cellule est une valeur initiale
            if(cell.isInitialVal){

            }else{  
                
            let continueResearch = true

                while(continueResearch){ 

                    console.log(`on se trouve sur la case ${cursor.line}-${cursor.col}`)
                
                    // Récupérer la prochaine valeur à tester
                    const val = cell.nextValue()
                    console.error(val);
                    // Lancer l'évenements valeur
                    // Récupéerer la fonction à lancer

                    const callback = this.events.get('valeur')

                    //  Si elle existe
                    if(callback !== null){
                        callback(cursor.line,cursor.col,val)
                    }

                    // Si la valeur existe (càd toutes les possibilitées ne sont pas encore testé)
                    if(val != null){

                        // Tester si le sudoku est encore valide
                        if(this.isValid()){

                            // Arrêter les recherches
                            continueResearch = false
                            cursor.start = "forward"

                        }else{
                            // Si le sudoku comporte une erreur 
                            // Continuer les recherches
                        }

                    }else{
                        // S'il n'y a plus de  possibilitées
                        // Arrêter les recherches
                        continueResearch = false
                        // Revenir en arrière
                        cursor.start = "backward"
                        // Réinitialiser toutes les possibilitées
                        // pour la prochaine recherche
                        cell.initValue()               
                    }
                }
            }
        //Délai d'attente
        await new Promise (res => setTimeout(res,10))
          
        //Tant que tu peux progresser
        }while(cursor.progress())
        
   
    }

    // Retroune si OUI ou NON le sudoku est valide
    // càd qu'il ne comporte pas d'erreur

    isValid(){

         //Verfifier qu'il y est pas de doublon dans les lignes
        //Parcourir les lignes
        for(let line = 0 ; line < 9 ; line++ ){
            const liste = new Set()

            //Parcourir les élément de la ligne
            for(let col = 0 ; col < 9 ; col++ ){

                const sudokuCell = this.grid[line][col]
                const val = sudokuCell.val

                if(val === null){

                }else if(val !== null && val !== undefined){

                    const hasValid = liste.has(val)
                    if(hasValid){
                        console.log(`error ligne ${line}-${col}`);
                        return false

                    }else{
                        liste.add(val)
                    }
                }
            }
        }

         //Parcourir les colonnes
         for(let col = 0 ; col < 9 ; col++ ){
            const liste = new Set()
            for(let line = 0 ; line < 9 ; line++ ){

                //Parcourir les élément de la ligne
                const sudokuCell = this.grid[line][col]
                const val = sudokuCell.val
               
                if(val === null){

                }else if(val !== null && val !== undefined){

                    const hasValid = liste.has(val)
                    if(hasValid){
                     
                        return false

                    }else{
                        liste.add(val)
                    }
                }
            }
        }

        //Indices des carrées
        const squares = [

            [
                [0,0],[0,1],[0,2],
                [1,0],[1,1],[1,2],
                [2,0],[2,1],[2,2],
            ],
            [
                [0,3],[0,4],[0,5],
                [1,3],[1,4],[1,5],
                [2,3],[2,4],[2,5],
            ],
            [
                [0,6],[0,7],[0,8],
                [1,6],[1,7],[1,8],
                [2,6],[2,7],[2,8],
            ],
            [
                [3,0],[3,1],[3,2],
                [4,0],[4,1],[4,2],
                [5,0],[5,1],[5,2],
            ],
            [
                [3,3],[3,4],[3,5],
                [4,3],[4,4],[4,5],
                [5,3],[5,4],[5,5],
            ],
            [
                [3,6],[3,7],[3,8],
                [4,6],[4,7],[4,8],
                [5,6],[5,7],[5,8],
            ],
            [
                [6,0],[6,1],[6,2],
                [7,0],[7,1],[7,2],
                [8,0],[8,1],[8,2],
            ],
            [
                [6,3],[6,4],[6,5],
                [7,3],[7,4],[7,5],
                [8,3],[8,4],[8,5],
            ],
            [
                [6,6],[6,7],[6,8],
                [7,6],[7,7],[7,8],
                [8,6],[8,7],[8,8],
            ]
        ]
            //Parcourir les carrés


            
            for(const square of squares){
                const liste = new Set()
                for(const coord of square){
                    const line = coord[0]
                    const col = coord[1]

                    const sudokuCell = this.grid[line][col]
                    const val = sudokuCell.val

                    if(val === null){

                    }else if(val !== null && val !== undefined){
    
                        const hasValid = liste.has(val)
                        if(hasValid){
                            return false
    
                        }else{
                            liste.add(val)
                        }
                    }                    
                }
            }

        return true

    }

    addEvent(name,callback){
        this.events.set(name, callback)

    }
}