//game variables 
let difficulty = 225;
let squareRoot = Math.sqrt(difficulty);
let mines = Math.floor(0.15 * difficulty);
let array = [];
let divArray = [];
let MarkedMineArray = [];
let container, mineCount, winNote, loseNote;
let beenThere = [];
let gameOn = true;

//ionitiating the game
function init() {
    //initiating variables 
    loseNote = document.getElementById("loosingNote");
    winNote = document.getElementById("winningNote");
    container = document.getElementById("container");
    mineCount = document.getElementById("mineCount");
    mineCount.innerHTML = mines;
    createInstances();
    fillArray();
    placeMines();
    fillNumbers();
}

function replay() {
    //restating all variables to allow replay
    for (let i = 0; i < divArray.length; i++) {
        //deleting all existing divs
        document.getElementById("cell" + i).remove();
    }

    winNote.style.visibility = "hidden";
    loseNote.style.visibility = "hidden";
    gameOn = true;
    beenThere = [];
    array = [];
    divArray = [];
    MarkedMineArray = [];

    init();
}

//assisting functions of the game initiation
function createInstances() {
    // creates the cells of the game 
    for (let i = 0; i < difficulty; i++) {
        let temp = document.createElement("div");
        temp.className = "cell";
        temp.id = 'cell' + i;
        temp.i = i; // keeps track of the position of the div relative to array 
        temp.marked = false;
        temp.onclick = click;
        divArray.push(temp);
        container.appendChild(temp);
        document.oncontextmenu = (event) => {//disables the regular context menu in favor of using the right click to mark mines 
            event.preventDefault();
        }
        document.getElementById("cell" + i).oncontextmenu = function () {//setting a mine marking function to context menu - on right click
            redMine(i);
            return false;
        }
    }
}
function fillArray() {
    //fills the main array with zeros in favor of placing mine randomly withinn array.
    for (let i = 0; i < difficulty; i++) {
        array.push(0);
    }
}
function placeMines() {
    //selects pre-set(user controled with "mines") amount of indexes withinn the array to place mines in.
    for (let i = 0; i < mines; i++) {
        let tempI = Math.floor(Math.random() * difficulty);
        if (array[tempI] == -1)
            i--;
        else
            array[tempI] = -1;
    }
}
function fillNumbers() {
    //the funciton runs over all the array indexes and decides how many mines surround a certain index and then changes the value of the index to the amount of mines it decided upon.
    for (let i = 0; i < difficulty; i++) {
        if (array[i] != -1) {
            let count = 0;
            if (canDown(i)) {
                if (array[i + squareRoot] == -1)
                    count++;
                if (canRight(i)) {
                    if (array[i + squareRoot + 1] == -1)
                        count++;
                }
                if (canLeft(i)) {
                    if (array[i + squareRoot - 1] == -1)
                        count++;
                }
            }
            if (canUp(i)) {
                if (array[i - squareRoot] == -1)
                    count++;
                if (canRight(i)) {
                    if (array[i - squareRoot + 1] == -1)
                        count++;
                }
                if (canLeft(i)) {
                    if (array[i - squareRoot - 1] == -1)
                        count++;
                }
            }
            if (canLeft(i)) {
                if (array[i - 1] == -1)
                    count++;
            }
            if (canRight(i)) {
                if (array[i + 1] == -1)
                    count++;
            }
            array[i] = count;
        }
    }
}


//approved moves - sets of rules regarding the display of the divs, tells you if a given index is suppose to be placed on the right/top/bottom/right border so that the function know to count the mines according to their display.
function canLeft(i) {
    if (i % squareRoot == 0)
        return false;
    return true;
}
function canRight(i) {
    if ((i + 1) % squareRoot == 0)
        return false;
    return true;
}
function canUp(i) {
    if (i >= 0 && i < squareRoot)
        return false;
    return true;
}
function canDown(i) {
    if (difficulty > i && i >= (difficulty - squareRoot))
        return false;
    return true;
}

//controller - responsible to change the modle and update the view accordingly 
function click(event) {
    //clicked div - checks to see if you blow up a mine or not and initiates proper functions accordignly.
    if (gameOn && !divArray[event.target.i].marked) {
        if (array[event.target.i] == -1) {
            gameOn = false; // it is there so you can not continue playing while is animation is playing 
            let mineArray = createMineArray();
            markMines(0,mineArray); 
        }
        else {
            look(event.target.i); 
        }
        checkWin(); 
    }
}

function look(i) {
    // revealing all valid (either its zero and then it goes on to this zero to keep looking for more zeros, or it is a number and then it just reveals the number) indexes around the clicked index
    divArray[i].classList.add("white");
    let booleanVal = [false, false, false, false, false, false, false, false];

    if (!beenThere.includes(i) && array[i] == 0) {
        if (canRight(i)) {
            if (array[i + 1] != -1 && !divArray[i + 1].marked) {
                divArray[i + 1].classList.add("white");
                if (array[i + 1] == 0) {
                    booleanVal[0] = true;
                }
                else {
                    divArray[i + 1].innerHTML = array[i + 1];
                }
            }
        }
        if (canLeft(i)) {
            if (array[i - 1] != -1 && !divArray[i - 1].marked) {
                divArray[i - 1].classList.add("white");
                if (array[i - 1] == 0) {
                    booleanVal[1] = true;
                }
                else {
                    divArray[i - 1].innerHTML = array[i - 1];
                }
            }
        }
        if (canUp(i)) {
            if (array[i - squareRoot] != -1 && !divArray[i - squareRoot].marked) {
                divArray[i - squareRoot].classList.add("white");
                if (array[i - squareRoot] == 0) {
                    booleanVal[2] = true;
                }
                else {
                    divArray[i - squareRoot].innerHTML = array[i - squareRoot];
                }
            }
        }
        if (canDown(i)) {
            if (array[i + squareRoot] != -1 && !divArray[i + squareRoot].marked) {
                divArray[i + squareRoot].classList.add("white");
                if (array[i + squareRoot] == 0) {
                    booleanVal[3] = true;
                }
                else {
                    divArray[i + squareRoot].innerHTML = array[i + squareRoot];
                }
            }
        }
        if (canDown(i) && canRight(i)) {
            if (array[i + squareRoot + 1] != -1 && !divArray[i + squareRoot + 1].marked) {
                divArray[i + squareRoot + 1].classList.add("white");
                if (array[i + squareRoot + 1] == 0) {
                    booleanVal[4] = true;
                }
                else {
                    divArray[i + squareRoot + 1].innerHTML = array[i + squareRoot + 1];
                }
            }
        }
        if (canDown(i) && canLeft(i)) {
            if (array[i + squareRoot - 1] != -1 && !divArray[i + squareRoot - 1].marked) {
                divArray[i + squareRoot - 1].classList.add("white");
                if (array[i + squareRoot - 1] == 0) {
                    booleanVal[5] = true;
                }
                else {
                    divArray[i + squareRoot - 1].innerHTML = array[i + squareRoot - 1];
                }
            }
        }
        if (canUp(i) && canRight(i)) {
            if (array[i - squareRoot + 1] != -1 && !divArray[i - squareRoot + 1].marked) {
                divArray[i - squareRoot + 1].classList.add("white");
                if (array[i - squareRoot + 1] == 0) {
                    booleanVal[6] = true;
                }
                else {
                    divArray[i - squareRoot + 1].innerHTML = array[i - squareRoot + 1];
                }
            }
        }
        if (canUp(i) && canLeft(i)) {
            if (array[i - squareRoot - 1] != -1 && !divArray[i - squareRoot - 1].marked) {
                divArray[i - squareRoot - 1].classList.add("white");
                if (array[i - squareRoot - 1] == 0) {
                    booleanVal[7] = true;
                }
                else {
                    divArray[i - squareRoot - 1].innerHTML = array[i - squareRoot - 1];
                }
            }
        }
        beenThere.push(i);
        for (let j = 0; j < 4; j++) {
            if (booleanVal[j]) {
                switch (j) {
                    case 0:
                        look(i + 1);
                        break;
                    case 1:
                        look(i - 1);
                        break;
                    case 2:
                        look(i - squareRoot);
                        break;
                    case 3:
                        look(i + squareRoot);
                        break;
                    case 4:
                        look(i + squareRoot + 1);
                        break;
                    case 5:
                        look(i + squareRoot - 1);
                        break;
                    case 6:
                        look(i - squareRoot + 1);
                        break;
                    case 7:
                        look(i - squareRoot - 1);
                        break;
                }
            }
        }
    }
    else {
        if (array[i] != 0) {
            divArray[i].innerHTML = array[i];
        }
        divArray[i].classList.add("white");
    }
}

function redMine(i) {
    //after you right clicked an index then function either colors it red of turns it back to the original color (using classes) as well as adding and removing selected indexes from the "markedMineArray" in favor of keeping track of those whho were marked 
    if (gameOn && !divArray[i].classList.contains("white")) {
        if (divArray[i].marked) {//unmarking a mine
            divArray[i].classList.remove("mine");
            mines++;
            divArray[i].marked = false;
            moveToEnd(MarkedMineArray.indexOf(i), MarkedMineArray);
            MarkedMineArray.pop();
        }
        else {
            //marking a mine
            divArray[i].classList.add("mine");
            mines--;
            divArray[i].marked = true;
            MarkedMineArray.push(i);
        }
        mineCount.innerHTML = mines;
        checkWin();
    }
}

//assisting functions regarding the decision making of ending the game, ending amination, changing the difficuly of the game etc.
function moveToEnd(i, arr) {
    //simple function that switches a given index with the last index in a given array
    if (arr.length == 1) {
        return;
    } else {
        let temp = arr[i];
        arr[i] = arr[arr.length - 1];
        arr[arr.length - 1] = temp;
    }
}

function checkWin() {
    //checks to see if you reached the end of the game after you clicked
    if (mines == 0 && allCovered(0)) {
        gameOn = false;
        colorGreen(0);
    }
}

function colorGreen(i) {
    //final winning animation
    if (i == MarkedMineArray.length) {
        winNote.style.visibility = "visible";
        return;
    }
    if (array[MarkedMineArray[i]] == -1) {
        divArray[MarkedMineArray[i]].classList.remove("mine");
        divArray[MarkedMineArray[i]].classList.add("correct");
    }
    setTimeout(function () {
        colorGreen(i + 1);
    }, "150");
}

function allCovered(i) {
    //checks to see if all the cells are revealed
    for (let i = 0; i < divArray.length; i++) {

        let white = divArray[i].classList.contains("white");
        let mineClass = divArray[i].classList.contains("mine");
        if (!(white || mineClass)) {
            return false;
        }
    }
    return true;
}

function changeMinesAmountInput(d) {
    //changes the mines amont using the range input - controls the difficulty  
    mines = Math.floor((d.value / 100) * difficulty);
    replay();
}
function changeMinesAmount(d) {
    //changes the mines amont using a given integer - controls the difficulty 
    mines = d;
    replay();
}

function markMines(i, arr){
    // marks all mines as well as marking black the incorrectsly marked mines and marking green those mines who were marked correctly
    if (i == arr.length) {
        loseNote.style.visibility = "visible";
        return;
    }
    if(MarkedMineArray.includes(arr[i])){
        if(array[arr[i]]==-1){
            divArray[arr[i]].classList.remove("mine");
            divArray[arr[i]].classList.add("correct");
        }
        else{
            divArray[arr[i]].classList.remove("mine");
            divArray[arr[i]].classList.add("worng");
        }
    }
    else{
        divArray[arr[i]].classList.add("mine");
    }
    setTimeout(function () {
        markMines(i + 1,arr);
    }, "150");
}

function createMineArray(){
    //forms an array of both marked and unmarked mines 
    let arr = [];
    for(let i = 0;i<array.length;i++){
        if(array[i]==-1){
            arr.push(i);
        }
        else{
            if(divArray[i].classList.contains("mine"))
                arr.push(i);
        }
    }
    return arr;
}
