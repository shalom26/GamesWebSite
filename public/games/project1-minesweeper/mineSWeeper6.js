/**
 * Created by assid on 11-Nov-15.
 */

'use strict'

// thing to improve:

// add right click on open one to open his neg
// and more...



//**********************************8

// submit only relevant files.
// put photos in img file
//

var gBoard = [];
var gSize = 7;
var gCountFind = 0;
var gMinesNumber=5;
var gMinesClicked=0;
var gBestTime = Number.MAX_VALUE;
var gIsGameOn=false;
var gStartTime =null;
var gTimeInterval=null;
var gLives=4;
var gIntervalwarning = null;
initGame();

// user custom the game
function getCustomLevel(){
    clearInterval(gTimeInterval);
    gSize = document.querySelector("#numSize");
    gSize =parseInt(gSize.value);
    gMinesNumber=document.querySelector("#numMines");
    gMinesNumber=parseInt(gMinesNumber.value);

    // verification of nums

    if (gSize > 0 && gSize < 14 ) {
        if (gMinesNumber < gSize*gSize && gMinesNumber > 0) {
            initGame();
            var elCustom = document.querySelector(".getCustom");
            elCustom.style.visibility = 'hidden';
        }else alert('Plaese change the amount of mines')
    } else {
        alert('size of board need to be in the range [0,10] and mines need to be ')
    }
}

// user custom the game
function customGame(){
    var elCustom=document.querySelector(".getCustom");
    if(elCustom.style.visibility === 'inherit'){
        elCustom.style.visibility = 'hidden';
    }else {

        elCustom.style.visibility = 'inherit'
    }
}


function initGameExpert() {
    gSize = 12;
    gMinesNumber=15;
    initGame();
}

function initGameMedium() {
    gSize = 10;
    gMinesNumber = 12;
    initGame();

}

function initGameBeginners() {
    gSize = 8;
    gMinesNumber=9;
    initGame();

}


function createBoard(){
    for (var i=0; i < gSize; i++) {
        gBoard.push([])
        for (var j=0; j < gSize; j++) {
            gBoard[i].push(0);
         }
     }
    //console.log(gBoard);
    createMines()
}


function createMines(){
    var mines=[];
    var mineLocation=0;
    var count=0;

    while (count < gMinesNumber) {

        mineLocation=Math.floor(Math.random()*gSize*gSize);

         //making sure we did choose the same one before
        var isMineLocationExists=false;
        mines.forEach(function (mineLoc) {
            if (mineLoc === mineLocation) isMineLocationExists=true;
        });

        if (!isMineLocationExists) {
            mines.push(mineLocation);
            count++
        }

        // put one in rows and culom by the size and dividing
        var j=Math.floor(mineLocation/gSize);
        var k=mineLocation % gSize;
        //console.log('mine in '+j+','+k);
        gBoard[j][k]=1;

    }
}



function initGame(winTime){

    if (typeof winTime !== 'undefined') {
        initWinTimes(winTime);

        // goes up a level and check if win
        if (gSize < 14){
            gSize++;
            gMinesNumber+=2 ;
        }else if(gMinesNumber < gSize*gSize/3){
        gMinesNumber+=2 ;
        }else {
            if (confirm('OMG!!!-you finished the game - play again')){
                initGame(winTime);
            }
            return;
        }

    }

    var timeStr = '00'+':'+'00';
    var elClock = document.querySelector(".clock");
    elClock.innerHTML = 'Time: <span style="font-size: 2em">'+timeStr+'</span>' ;

    gMinesClicked=0;
    var elMines = document.querySelector(".minesLeft");
    elMines.innerHTML = gMinesNumber+ '  <img  src="mine3.jpg" />';

    gIsGameOn = false;
    gBoard = [];
    createBoard();
    renderBoard();
    gCountFind = 0;
    gStartTime = null;
    clearInterval(gTimeInterval);
    if (gIntervalwarning) clearInterval(gIntervalwarning);
    var elWarnings = document.querySelector('.looseMessage');
    elWarnings.style.opacity =0;
}

// check if improved best time
function initWinTimes(winTime){
    var currentTime = (winTime-gStartTime)/1000;

    if (gBestTime > currentTime) {
        gBestTime = currentTime;
        var elTimes = document.querySelector('.bestTime');
        elTimes.classList.remove("hidden");
        elTimes.innerHTML ='Best Time: <span style="font-size: 2em">'+gBestTime+'</span>' ;
    }
}


function renderBoard(){
    var elBoard=document.querySelector(".board")
    elBoard.innerHTML = '';
    var strHTML = '';
    var classStr = null;

    for (var i = 0; i< gSize; i++){
        strHTML += '<tr>'

        for (var j = 0; j< gSize; j++){
            if (gBoard[i][j] === 0){
                classStr="squares";
            }else {
                classStr = "bomb";
            }
            strHTML +='<td class='+classStr+' oncontextmenu="maybeBomb('+i+','+j+')"' +
                        'id="l'+i+'_'+j+'" ' +
                        'onclick="clicked_I_J('+i+','+j+')">' +

                        '</td>';
        }
        strHTML+='</tr>'

    }
    elBoard.innerHTML += strHTML;
}


// user can put simble of bombs
function maybeBomb(i,j){
    var strQuery='#l'+i+'_'+j;
    var elBox = document.querySelector(strQuery);
    if (elBox.classList.contains("shown") ) {
        event.preventDefault();
        return;
    }

    if (elBox.innerHTML === '?') {
        elBox.innerHTML = '';
        gMinesClicked--;
    }else{
    elBox.innerHTML += '?';
        gMinesClicked++;
    }
    var minesNumberToShow=gMinesNumber-gMinesClicked;

    // if statement just creates funny warning
    if (minesNumberToShow < 0){
     var minesNumberToShow =":/ "+ minesNumberToShow;
    }

    var elMines = document.querySelector(".minesLeft");
    elMines.innerHTML = minesNumberToShow+ ' <img  src="mine3.jpg" />';
    event.preventDefault();

}


function showBombs(){
    var elBombs = document.querySelectorAll(".bomb");
    for (var i = 0; i< elBombs.length; i++){
        elBombs[i].style.background= "url('mine3.jpg')";

    }
}


function looseMessageFunc(){

    if (gLives === 0){
        if (confirm('you ran out of free live?-want to buy?')) {
            initGame();
        }
    }
    else{
        var elwarnings = document.querySelector('.looseMessage');
        var countIntervals = 0;
        var opacityDecresingAmount;
        gIntervalwarning = setInterval(function () {
                // create ocilations in opacity- dividing sin by 2 -  so it ranges [-0.5,0.5]
                // adding 0.5 so it ranges [0,1]
                opacityDecresingAmount =0.5+ Math.sin((countIntervals+4)/16)/2;
                elwarnings.style.opacity = opacityDecresingAmount;

                countIntervals++;
                //if (gStartTime && !gIsGameOn) clearInterval(intervalwarning);
            }
            ,20);
    }
}




function clicked_I_J(i, j){
    // checks if game finished but didnt start a new one - dont react to click
    if (gStartTime && !gIsGameOn) return;
    // if the game is not on yet  start the game
    if(!gStartTime){
        gStartTime = (new Date()).getTime()
        runClock();
        gIsGameOn = true;
    }

    // make sure it is not clicked already
    var strQuery='#l'+i+'_'+j;
    var elBox=document.querySelector(strQuery);
    if (elBox.classList.contains("shown")) return;


    if (gBoard[i][j] === 1 ){
        gIsGameOn = false; // can not get clicked
        showBombs();
        elBox.style.background= "url('mineWrong.jpg')";
        clearInterval(gTimeInterval);
        gLives--;
        looseMessageFunc();
        return;


    }


    // if no game over start checking neighbors and show items
    var negsCount = 0;
    for (var ii=-1; ii<=1; ii++) {
        // check inside rows -if not legal dont try colums
        var currI = i + ii;
        if (currI < 0 || currI >= gSize) continue;

        for (var jj=-1; jj<=1; jj++) {

            var currI = i + ii;
            var currJ = j + jj;

            if (ii === 0 && jj === 0) continue;
            if (currI < 0 || currI >= gSize) continue;
            if (currJ < 0 || currJ >= gSize) continue;

            if (gBoard[currI][currJ] === 1) {
                negsCount++;
            }
        }
    }

    // show them
    elBox.innerHTML= negsCount;
    switch (negsCount){
        case 1:elBox.style.color='blue';
            break;
        case 2:elBox.style.color='brown';
            break;
        case 3 :
        case 4 :
        case 5 :
        case 7 :
        case 6 :
        case 8 :
            elBox.style.color='red';
            break;
    }

    elBox.classList.remove("squares");
    elBox.classList.add("shown");
    gCountFind++;

    // checks amount of flipped
    if (gCountFind >= gSize*gSize-gMinesNumber) {
        var winTime = (new Date()).getTime();
        showBombs();
        clearInterval(gTimeInterval);
        gIsGameOn = false;
        if (confirm('very good-play again?')){

            initGame(winTime);
        }

    }

    if (negsCount === 0) clickNeigboors_I_J_req(i,j);
}




function clickNeigboors_I_J_req(i,j){
    var elNeg = null;
    var flag = false;

    for (var ii=-1; ii<=1; ii++) {
        var currI = i + ii;
        if (currI < 0 || currI >= gSize) continue;

        for (var jj=-1; jj<=1; jj++) {
            var currJ = j + jj;

            if (ii === 0 && jj === 0) continue;
            if (currJ < 0 || currJ >= gSize) continue;
            if (!gIsGameOn) return;

            var strQuery='#l'+currI+'_'+currJ;
            elNeg=document.querySelector(strQuery);
            if (elNeg.classList.contains("squares") ) {
                clicked_I_J(currI, currJ)
            }
        }
    }

}

// runs and show the clock
function runClock(){
    var count = 0, elClock = null;
    var secondsAssi = 0;
    var minutesAssi = 0;

    gTimeInterval = setInterval(function(){
        count++;
        elClock = document.querySelector(".clock");
        //elClock.classList.remove("hidden");

        // creating minutes and second by dividing
        secondsAssi = (count % 60);
        minutesAssi = parseInt(count / 60);

        // create a stable xx:xx shape for clock
        if (minutesAssi < 10) minutesAssi='0'+minutesAssi;
        if (secondsAssi < 10) secondsAssi='0'+secondsAssi;
        var timeStr = minutesAssi+':'+secondsAssi
        elClock.innerHTML = 'Time: <span style="font-size: 2em">'+timeStr+'</span>' ;



    },1000)
}

