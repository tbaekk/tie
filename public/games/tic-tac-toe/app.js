document.addEventListener('DOMContentLoaded', () => {
    console.log("ready!");

    let player1 = "X";
    let player2 = "O";
    
    let currentTurn = 1;
    let movesMade = 0;

    const sqr = document.getElementsByClassName("square");
    const reset = document.getElementsByClassName("reset")[0];
    const winnerContainer = document.getElementsByClassName("winner")[0];

    Array.from(sqr).forEach(elem => {
        elem.addEventListener("click", () => {
            if (elem.innerHTML !== "") return;
            
            movesMade++;
            
            if (currentTurn % 2 === 1) {
                elem.innerHTML = player1;
                elem.style.color = "red";
                currentTurn++;
            } else {
                elem.innerHTML = player2;
                elem.style.color = "green";
                currentTurn--;
            }

            if (checkForWinner()) {
                theWinner = currentTurn == 1 ? player2 : player1;
                declareWinner(theWinner);
            }
        });
    });

    reset.addEventListener("click", () => {
        var moves = Array.prototype.slice.call(document.getElementsByClassName("square"));
        moves.map(m => {
            m.innerHTML = "";
        });
        winnerContainer.innerHTML = "";
        winnerContainer.style.display = "none";
        currentTurn = 1;
    });

    function declareWinner(winner) {
        winnerContainer.style.display = "block";
        reset.style.display = "block";
        winner = winner === player1 ? "Player 1" : "Player 2";
        winnerContainer.innerHTML = winner + " Wins!";
    }

    function checkForWinner() {
        //need at least four moves to check for a winner
        if (movesMade > 4) {
            //research why we need call here!
            var moves = Array.prototype.slice.call(document.getElementsByClassName("square"));
            var results = moves.map(square => { return square.innerHTML; }); 
            var winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            return winningCombos.find(combo => {
                if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }    
})