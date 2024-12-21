let height = 6; // aka # of guesses
let width = 5; // required word length 

let row = 0; // player's current / starting guessing position
let col = 0; // the letter of that guess / starting guess ability

let gameOver = false;

let myArray = [
    "TEACH",
    "CLASS",
    "MRJAY",
    "JAMIE",
    "HOLLY",
    "MRJAY",
    "DECOR",
    "MRJAY",
    "CHEER"
  ];
  
let word = myArray[Math.floor(Math.random()*myArray.length)];

function replay() {
    location.reload();
}

window.onload =  function() {
    initialize();
}

function initialize() {

    // this creates the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // will find the id, and then insert into the html / document what is suggested (in this case 'X')
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }


    // Listen for a key press
    document.addEventListener("keyup", (e) => {
        if(gameOver) return;

        // alert(e.code); // if you 'uncomment' this it will give an alert based on the key pressed. just here to test the code if need be
        
        // following makes it so that the only keys it will consider are alphabet keys, backspace & space and stuff
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if(col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        } 

        // allows user to undo / go back 
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        // you can go to the next level
        else if(e.code == "Enter") {
            update();
            row += 1; // used this attempt, move to next row
            col = 0; // start at 0 for new row
        }

        if (!gameOver && row == height) /*if row = height it means you used up all attemps*/ {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }

    })

    document.querySelectorAll(".keyboard-button").forEach (keyButton => {
        keyButton.addEventListener("click", () => {
            switch (keyButton.innerText) {
                case "DEL":
                    c = "Backspace";
                break;
                case "ENTER":
                    c = "Enter"
                break;
                default:
                    c = "Key"+keyButton.innerText
            }
            e = new KeyboardEvent("keyup", {code: c});
            document.dispatchEvent(e);
        })
    })
}

// count the # of letters we get correct
function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // is it in the right place?
        if (word[c] == letter) {
            currTile.classList.add("correct"); // will apply styling w green bg to tile
            correct += 1;
        } // if not correct, is it in word?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } // not in word
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) { 
            gameOver = true;
        }
    }
}

function revealHint() {
    // school themed words 
    if (word == 'MRJAY') {
        document.getElementById("hint").innerText = 'Teacher';
    } else if (word == 'CLASS') {
        document.getElementById("hint").innerText = 'School';
    } else if (word == 'TEACH') {
        document.getElementById("hint").innerText = 'Class';
    } else if (word == 'JAMIE') {
        document.getElementById("hint").innerText = 'Teacher';
    }
    // christmas themed words 
    else if (word == 'HOLLY') {
        document.getElementById("hint").innerText = 'Christmas';
    } else if (word == 'DECOR') {
        document.getElementById("hint").innerText = 'Christmas';
    } else if (word == 'CHEER') {
        document.getElementById("hint").innerText = 'Christmas';
    }
}