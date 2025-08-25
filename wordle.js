
var height = 6; // guesses
var width = 5; // letters

var row = 0; // current guess
var col = 0; // current letter

var gameOver = false;
var word = "SQUID";


window.onload = function() {
    initialize();
}


function initialize() {
    // creates the board 5x6
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // check for key presses
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3]
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -= 1;
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                currTile.innerText = ""
            }
        }
        else if (e.code == "Enter") {
            update();
            row += 1;
            col = 0;
        }
        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        // correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1
        }
        // in the word?
        else if (word.includes(letter)) {
            currTile.classList.add("present")
        }
        // not in the word?
        else {
            currTile.classList.add("absent")
        }

        if (correct == width) {
            gameOver = true;
        }
    }
}
