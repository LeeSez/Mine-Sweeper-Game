let difficulty = 225;
let squareRoot = Math.sqrt(difficulty);
let mines = Math.floor(0.15*difficulty);
let array = [];
let divArray = [];
let mineArray = [];
let container, mineCount, winNote, loseNote;
let beenThere = [];
let gameOn = true;

function init(){
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

function replay(){
    //restating all variables 
    for(let i = 0; i<divArray.length; i++){
        //deleting all existing divs
        document.getElementById("cell"+i).remove();
    }
    
    winNote.style.visibility = "hidden";
    loseNote.style.visibility = "hidden";
    gameOn = true;
    beenThere = [];
    array = [];
    divArray = [];
    mineArray = [];

    init();
}

function createInstances(){
    for(let i=0;i<difficulty;i++){
        let temp = document.createElement("div");
        temp.className = "cell";
        temp.id = 'cell'+i;
        temp.i = i;
        temp.marked = false;
        temp.onclick = click;
        divArray.push(temp);
        container.appendChild(temp);
        document.oncontextmenu = (event) => {
            event.preventDefault();
        }
        document.getElementById("cell"+i).oncontextmenu = function(){
            redMine(i);
            return false;
        }
    }
}
function fillArray(){
    for(let i=0;i<difficulty;i++){
        array.push(0);
    }
}
function placeMines(){
    for(let i=0;i<mines;i++){
        let tempI = Math.floor(Math.random()*difficulty);
        if(array[tempI]==-1)
            i--;
        else
            array[tempI]=-1;
    }
}
function fillNumbers(){
    for(let i = 0;i<difficulty;i++){
        //alert(i + " left:"+canLeft(i)+" right:"+canRight(i)+" up:"+canUp(i)+" down:"+canDown(i));
        if(array[i]!=-1){
            let count = 0;
            if(canDown(i)){
                if(array[i+squareRoot]==-1)
                    count++;
                if(canRight(i)){
                    if(array[i+squareRoot+1]==-1)
                        count ++;
                }
                if(canLeft(i)){
                    if(array[i+squareRoot-1]==-1)
                        count ++;
                }
            }
            if(canUp(i)){
                if(array[i-squareRoot]==-1)
                    count++;
                if(canRight(i)){
                    if(array[i-squareRoot+1]==-1)
                        count ++;
                }
                if(canLeft(i)){
                    if(array[i-squareRoot-1]==-1)
                        count ++;
                }
            }
            if(canLeft(i)){
                if(array[i-1]==-1)
                    count++;
            }
            if(canRight(i)){
                if(array[i+1]==-1)
                    count++;
            }
            array[i] = count;
        }
    }
}

//approved moves
function canLeft(i){
    if(i%squareRoot==0)
        return false;
    return true;
}
function canRight(i){
    if((i+1)%squareRoot==0)
        return false;
    return true;
}
function canUp(i){
    if(i>=0 && i<squareRoot)
        return false;
    return true;
}
function canDown(i){
    if(difficulty>i && i>=(difficulty-squareRoot))
        return false;
    return true;
}

//clicked div
function click(event){
    if(gameOn && !divArray[event.target.i].marked){
        if(array[event.target.i]==-1){
            loseNote.style.visibility = "visible";
            gameOn = false;
        }
        else{
            look(event.target.i);
        }
        checkWin();
    }
}

function look(i){
    divArray[i].classList.add("white");
    let booleanVal = [false,false,false,false,false,false,false,false];
    
    if(!beenThere.includes(i) && array[i]==0){
        if(canRight(i)){
            if(array[i+1]!=-1 && !divArray[i+1].marked){
                divArray[i+1].classList.add("white");
                if(array[i+1]==0){
                    booleanVal[0] = true;
                }
                else{
                    divArray[i+1].innerHTML = array[i+1];
                }
            }
        }
        if(canLeft(i)){
            if(array[i-1]!=-1 && !divArray[i-1].marked){
                divArray[i-1].classList.add("white");
                if(array[i-1]==0){
                    booleanVal[1] = true;
                }
                else{
                    divArray[i-1].innerHTML = array[i-1];
                }
            }
        }
        if(canUp(i)){
            if(array[i-squareRoot]!=-1 && !divArray[i-squareRoot].marked){
                divArray[i-squareRoot].classList.add("white");
                if(array[i-squareRoot]==0){
                    booleanVal[2] = true;
                }
                else{
                    divArray[i-squareRoot].innerHTML = array[i-squareRoot];
                }
            }
        }
        if(canDown(i)){
            if(array[i+squareRoot]!=-1 && !divArray[i+squareRoot].marked){
                divArray[i+squareRoot].classList.add("white");
                if(array[i+squareRoot]==0){
                    booleanVal[3] = true;
                }
                else{
                    divArray[i+squareRoot].innerHTML = array[i+squareRoot];
                }
            }
        }
        if(canDown(i) && canRight(i)){
            if(array[i+squareRoot+1]!=-1 && !divArray[i+squareRoot+1].marked){
                divArray[i+squareRoot+1].classList.add("white");
                if(array[i+squareRoot+1]==0){
                    booleanVal[4] = true;
                }
                else{
                    divArray[i+squareRoot+1].innerHTML = array[i+squareRoot+1];
                }
            }
        }
        if(canDown(i) && canLeft(i)){
            if(array[i+squareRoot-1]!=-1 && !divArray[i+squareRoot-1].marked){
                divArray[i+squareRoot-1].classList.add("white");
                if(array[i+squareRoot-1]==0){
                    booleanVal[5] = true;
                }
                else{
                    divArray[i+squareRoot-1].innerHTML = array[i+squareRoot-1];
                }
            }
        }
        if(canUp(i) && canRight(i)){
            if(array[i-squareRoot+1]!=-1 && !divArray[i-squareRoot+1].marked){
                divArray[i-squareRoot+1].classList.add("white");
                if(array[i-squareRoot+1]==0){
                    booleanVal[6] = true;
                }
                else{
                    divArray[i-squareRoot+1].innerHTML = array[i-squareRoot+1];
                }
            }
        }
        if(canUp(i) && canLeft(i)){
            if(array[i-squareRoot-1]!=-1 && !divArray[i-squareRoot-1].marked){
                divArray[i-squareRoot-1].classList.add("white");
                if(array[i-squareRoot-1]==0){
                    booleanVal[7] = true;
                }
                else{
                    divArray[i-squareRoot-1].innerHTML = array[i-squareRoot-1];
                }
            }
        }
        beenThere.push(i);
        for(let j = 0; j<4; j++){
            if(booleanVal[j]){
                switch (j){
                    case 0:
                        look(i+1);
                        break;
                    case 1:
                        look(i-1);
                        break;
                    case 2:
                        look(i-squareRoot);
                        break;
                    case 3: 
                        look(i+squareRoot);
                        break;
                    case 4:
                        look(i+squareRoot+1);
                        break;
                    case 5:
                        look(i+squareRoot-1);
                        break;
                    case 6:
                        look(i-squareRoot+1);
                        break;
                    case 7:
                        look(i-squareRoot-1);
                        break;
                }
            }
        }
    }
    else{
        if(array[i]!=0){
            divArray[i].innerHTML = array[i];
        }
        divArray[i].classList.add("white");
    }
}

function redMine(i){
    if(gameOn){
        if(divArray[i].marked)
        {//unmarking a mine
            divArray[i].classList.remove("mine");
            mines++;
            divArray[i].marked = false;
            moveToEnd(mineArray.indexOf(i), mineArray);
            mineArray.pop();
        }
        else{
            //marking a mine
            divArray[i].classList.add("mine");
            mines--;
            divArray[i].marked = true;
            mineArray.push(i);
        }
        mineCount.innerHTML = mines;
        checkWin();
    }
}

function moveToEnd(i, arr){
    if(arr.length==1){
        return;
    }else{
        let temp = arr[i];
        arr[i] = arr[arr.length-1];
        arr[arr.length-1] = temp;
    }
}

function checkWin(){
    if(mines==0 && allCovered(0)){
        colorGreen(0);
    }
}

function colorGreen(i){
    if(i==mineArray.length){
        winNote.style.visibility = "visible";
        return;
    }
    if(array[mineArray[i]]==-1){
        divArray[mineArray[i]].classList.remove("mine");
        divArray[mineArray[i]].classList.add("correct");
    }
    setTimeout(function(){
        colorGreen(i+1);
    }, 150);
}

function allCovered(i){
    for(let i = 0; i<divArray.length; i++){

        let white = divArray[i].classList.contains("white");
        let mineClass = divArray[i].classList.contains("mine");
        if(!(white || mineClass)){
            return false;
        }
    }
    return true;
}

function changeMinesAmountInput(d){
    mines = Math.floor((d.value/100)*difficulty);
    replay();
}
function changeMinesAmount(d){
    mines = d;
    replay();
}