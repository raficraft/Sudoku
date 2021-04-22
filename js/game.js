Object.size = (obj) => {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


class game extends init{

    constructor(squareX,squareY){
        super(squareX,squareY)

        
        this.nbLine = squareX * 3
        this.nbCol = squareY * 3

        this.allCell = document.querySelectorAll('.game-value')





        this.allCell.forEach(cell => {


            cell.addEventListener('focus',(e)=>{

                const target = e.target
                const coord = target.dataset.coord.split('-')
                const lineNumber = coord[0] //coordX
                const colNumber = coord[1] //coordY

                this.lightingCell(lineNumber,colNumber)


            })

            cell.addEventListener('keyup',(e)=>{



                const target = e.target
                const cellInvalid = document.querySelectorAll('.invalid')
                
                cellInvalid.forEach(cell => {
                    cell.classList.remove('invalid')                    
                });

                if(e.key === 'Delete' || e.key === 'Backspace'){

                
                    this.checkGrid()

                }else{

                    const validity = cell.checkValidity()
                    if(validity === true){
                    this.checkGrid()
                    }

                }

            })


            
        });


    }

   


    readLineAndCol(callBack){

        for(this.countLine = 0; this.countLine < this.nbLine ; this.countLine++){
            for(this.countCol = 0; this.countCol < this.nbCol ; this.countCol++){
                callBack()
            }        
        }

    }
    readLine(callBack){

        for(this.countLine = 0; this.countLine < this.nbLine ; this.countLine++){
           callBack()          
        }

    }
    readCol(callBack){
            for(this.countCol = 0; this.countCol < this.nbCol ; this.countCol++){
                callBack()
            }
    }

    readSquare(callBack){

    }

   

    lightingCell(coordX,coordY){

        const allLighting = document.querySelectorAll('.lighting-cell')

        allLighting.forEach(el =>  el.classList.remove('lighting-cell') )

       
        this.readLine(()=>{

            const coord = `${coordX}-${this.countLine}`
            const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)
            cell.classList.add('lighting-cell')

        })

        this.readCol(()=>{

            const coord = `${this.countCol}-${coordY}`
            const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)        
            cell.classList.add('lighting-cell')

        })

    }

    checkLineAndCol(coord){

        const splitCoord = coord.split('-')
        const indexLine = splitCoord[0]
        const indexCol = splitCoord[1]

        const target = document.querySelector(`.game-value[data-coord="${coord}"]`) 
        const targetValue = target.value 


        console(`case d'origine ${coord} dont la valeur est ${targetValue}`);
        console.log(`on check la ligne ${indexLine}`);
        console.log(`on check la colonne ${indexCol}`);

        
       /*
            const cellInvalid = document.querySelectorAll(`.invalid`)
            cellInvalid.forEach(cell => {                
                cell.classList.remove('invalid')
                });
       */


        //On check la ligne de la cible

        let checkLine = []


        for(let countLine = 0; countLine < this.nbLine ; countLine++){

                const coord = `${indexLine}-${countLine}`
                const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)
                const cellValue = cell.value.toString()

                if(cellValue !== ''){
                    if(!checkLine.includes(cellValue)){                    
                        checkLine.push({coord : coord , val : cellValue}) 
                    }
    
            }            
        }

        console.log(checkLine);
        
/*
        checkLine.forEach(data => {

            if(data.val === targetValue && Object.size(checkLine) >1){
                const cellInvalid = document.querySelector(`.game-value[data-coord="${data.coord}"]`)
                cellInvalid.classList.add('invalid')
                cellInvalid.dataset.lineInvalid = true
            }else if( Object.size(checkLine) >1){
                const cellInvalid = document.querySelector(`.game-value[data-coord="${data.coord}"]`)
                cellInvalid.classList.add('invalid')
                cellInvalid.dataset.lineInvalid = true
            }else if( Object.size(checkLine) === 1){
                const cellInvalid = document.querySelector(`.game-value[data-coord="${data.coord}"]`)
                if(!cellInvalid.dataset.colInvalid || cellInvalid.dataset.colInvalid === false){
                cellInvalid.classList.remove('invalid')
                cellInvalid.dataset.lineInvalid = false
                }
                
            }         
        }); 
*/


       let checkCol = []


        for(let countCol = 0; countCol < this.nbCol ; countCol++){

                const coord = `${countCol}-${indexCol}`
                const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)
                const cellValue = cell.value.toString()

                if(cellValue !== ''){
                    if(!checkCol.includes(cellValue)){                    
                        checkCol.push({coord : coord , val : cellValue}) 
                    }
                    console.log(cellValue);
    
            }            
        }

        

        checkCol.forEach(data => {

            if(data.val === targetValue && Object.size(checkCol) >1){
                const cellInvalid = document.querySelector(`.game-value[data-coord="${data.coord}"]`)
                cellInvalid.classList.add('invalid')
                cellInvalid.dataset.colInvalid = true
            }else if( Object.size(checkCol) >1){

                console.log('jfjfkjsjlkj');
                const cellInvalid = document.querySelector(`.game-value[data-coord="${data.coord}"]`)
                cellInvalid.classList.add('invalid')
                cellInvalid.dataset.colInvalid = true
            }else if( Object.size(checkLine) ===1){
                const cellInvalid = document.querySelector(`.game-value[data-coord="${data.coord}"]`)
                if(!cellInvalid.dataset.lineInvalid || cellInvalid.dataset.lineInvalid === false){
                cellInvalid.classList.remove('invalid')
                cellInvalid.dataset.lineInvalid = false
                }
            }  

        });

    }

    checkGrid(coord){



        //recupérer toutes les valeurs

        const sudoku = []

        for(let line = 0 ; line < 9 ; line++ ){
            const lineArray = []
            for(let col = 0 ; col < 9 ; col++ ){

                const coord= `${line}-${col}`
                const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)
                let val = cell.value
                let number = ""
                number = val === "" ? number = "" : number = parseInt(val)

                lineArray.push(number)
              

            }

            sudoku.push(lineArray)
        }

        console.log(sudoku);

        //Verfifier qu'il y est pas de doublon dans les lignes
        //Parcourir les lignes
        for(let line = 0 ; line < 9 ; line++ ){
            const liste = new Set()

            //Parcourir les élément de la ligne
            for(let col = 0 ; col < 9 ; col++ ){

                const val = sudoku[line][col]
                if(val !== ''){

                    const hasValid = liste.has(val)
                    if(hasValid){
                        const coordInvalid = `${line}-${col}`
                        const cell = document.querySelector(`.game-value[data-coord="${coordInvalid}"]`)
                        cell.classList.add('invalid')

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
                const val = sudoku[line][col]
                if(val !== ''){

                    const hasValid = liste.has(val)
                    if(hasValid){
                        const coordInvalid = `${line}-${col}`
                        const cell = document.querySelector(`.game-value[data-coord="${coordInvalid}"]`)
                        cell.classList.add('invalid')

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
                const liste = new Set
                for(const coord of square){
                    const line = coord[0]
                    const col = coord[1]

                    const val = sudoku[line][col]
                    if(val !== ''){
    
                        const hasValid = liste.has(val)
                        if(hasValid){
                            const coordInvalid = `${line}-${col}`
                            const cell = document.querySelector(`.game-value[data-coord="${coordInvalid}"]`)
                            cell.classList.add('invalid')
    
                        }else{
                            liste.add(val)
                        }
                    }
                    
                }
            }


        
    }

    lightInvalidLine(){
        this.invalidLineValue.forEach(coord => {
            const cellInvalid =  document.querySelector(`.game-value[data-coord="${coord}"]`)
            cellInvalid.classList.add('invalid')            
        }); 
    }

    checkValidCol(coordY){
/*
        this.readAllCol(()=>{
            const coord = `${this.countCol}-${this.countLine}`
            const cell = document.querySelector(`.game-value[data-coord="${coord}"]`)
            const cellValue = cell.value.toString()

            if(cellValue !== ''){
                if(this.colCoordArray.includes(cellValue)){
                    this.invalidColValue.push(coord)
                }else{
                    this.colCoordArray.push(cellValue)
                }
            }
        })
*/
    }

    checkValidSquare(value){
        console.log('valid Square');
    }

}

new game(nbLine,nbCol)