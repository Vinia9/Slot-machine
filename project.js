//1.Desposit some money
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4. Spin the slot maching
//5. check if the user won
//6. give the user their winning
//7. Play again

const prompt = require("prompt-sync")() 

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

 const deposit = () =>{
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount)
        
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try agian.")
        } else{
            return numberDepositAmount
        }
    }

 }

const getNumberOfLines = () =>{
    while (true){
        const lines = prompt("Enter the number of lines to bet on(1-3): ")
        const numberOfLines = parseFloat(lines)
        
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try agian.")
        } else{
            return numberOfLines
        }
    }
}

const getBet = (balance,lines) =>{
    while (true){
        const bet = prompt("Enter the bet per line : ")
        const numberBet = parseFloat(bet)
        
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines){
            console.log("Invalid bet, try agian.")
        } else{
            return numberBet
        }
    }   
}

const spin = () => {
    //generate individual column 
    const symbols = []
    //loop through each entry in the "SYMBOLS_COUNT" object
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT,)) {
        //repeat the symbol 'count' no of times & add them to the 'symbols' array
       for (let i=0;i<count;i++){
        symbols.push(symbol)
       }
    //    console.log(symbols)
    }
    const reels = []
    //loop 'COLS' no of times to create 'COLS' no of columns
    for (let i=0;i<COLS;i++){
        reels.push([]) //add an empty array to 'reels' array
        //this array will represent the symbols for the current reel
        const reelSymbols = [...symbols]
        //loop 'ROWS' no of times to create 'ROWS' no of rows for each column
        for (let j=0;j<ROWS;j++) {
            //generate random index within the len of the 'reelSymbols'
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex] 
            reels[i].push(selectedSymbol)
            //selected symbol is removed from the "reelSymbols" to ensure not to select again in the same reel
            reelSymbols.splice(randomIndex,1)
    }
 }
 return reels  //return the generated 'reels' array
}

const transpose = (reels) =>{
    const rows = []

    for (let i=0;i<ROWS;i++){
        rows.push([])
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows) =>{
    for (const row of rows) {
        let rowString = ""
        for (const [i,symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length-1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows, bet, lines ) => {
   let winnings = 0
   
   for (let row = 0; row < lines; row++){
        const symbols = rows[row]
        let allsame = true

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allsame = false
                break
            }
        }
        if (allsame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
   }
   return winnings
}

const game = () => {
    let balance = deposit()

    while(true){
        console.log("You have a balance of $" + balance)
        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance,numberOfLines)
        balance -= bet * numberOfLines
        const reels = spin()
        const rows = transpose(reels)
        printRows(rows)
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings
        console.log("You won, $" + winnings.toString())

        if(balance <= 0) {
            console.log("You ran out of money!")
            break
        }

        const playAgain = prompt("Do you want to play again (y/n)? ")

        if(playAgain != "y") break
    }
}

game()


