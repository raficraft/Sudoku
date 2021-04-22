const nbCol = 3;
const nbLine = 3;


class init{

    constructor(squareX,squareY){

        this.nbLine = squareX * 3
        this.nbCol = squareY * 3

        this.makeGrid()

    }

    makeGrid(){     

        this.ElHTML = `<table class="sudoku-game"></tbody>`

        for(let countLine = 0; countLine < this.nbLine ; countLine++){
          this.ElHTML +=   `<tr class="game-line">`
          for(let countCol = 0; countCol < this.nbCol ; countCol++){

            this.ElHTML += `
            <td class="game-col">
                <div class="game-notes hidden" data-coord="${countLine}-${countCol}" data-notes>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                </div>
                <input class="game-value" type="number"
                min="1" max="9" step="1"
                data-coord="${countLine}-${countCol}"
                data-sugg>            
            </td>`

          }

          this.ElHTML += `</tr>`
        }


        this.ElHTML += 
        `</tbody>
            <table>
            <button id="resolve">Resolve</button>`

        const target = document.querySelector('main')
        target.insertAdjacentHTML("beforebegin", this.ElHTML);

        return this.ElHTML
    }

    makeKeyBoard(){

        this.ElHTML += 
            `<div class="numpad">
                <div>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
                <div>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                </div>
                <div>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                </div>
            </div>            
            `
            

    }

    createStyle(){

        const minSize = ''
        const maxSize = ''

    }

}
