/**
 * Created by assid on 11-Nov-15.
 */

'use strict'

//var gBoard=[[0,0,0],[0,0,1],[1,0,0]];
var gBoard = [];
var gSize = 7;
var gCountFind = 0;
var gMinesNumber=2;
var gBestTime = Number.MAX_VALUE;
var gIsGameOn=false;
var gStartTime =null;
var gTimeInterval=null;


initGame();


function createBoard(){
    for (var i=0; i < gSize; i++) {
        gBoard.push([])
        for (var j=0; j < gSize; j++) {
            gBoard[i].push(0);
         }
     }
    console.log(gBoard);
    createMines()
}


function createMines(){  // change name to - writeboard - or maybe delete the first for->for
    var mines=[];
    var mineLocation=0;
    var count=0;

    count=0;
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

        var j=Math.floor(mineLocation/gSize);
        var k=mineLocation % gSize;
        console.log('mine in '+j+','+k);
        gBoard[j][k]=1;

    }

    console.log(mines);
}



function initGame(winTime){

    if (typeof winTime !== 'undefined') {
        initTimes(winTime);
    }
    gIsGameOn = false;
    gBoard = [];
    createBoard();

    renderBoard();
    gCountFind = 0;
    gStartTime = null;
    clearInterval(gTimeInterval);
    var elClock = document.querySelector(".clock");
    elClock.classList.add("hidden");
}


function initTimes(winTime){
    var currentTime = winTime-gStartTime;

    if (gBestTime > currentTime) {
        gBestTime = currentTime;
        var elTimes = document.querySelector('.bestTime');
        elTimes.classList.remove("hidden");
        elTimes.innerHTML = 'best time is: ' + gBestTime;
    }

    gStartTime = null;
    //elTimes = document.querySelector('.time');
    //elTimes.innerHTML = '';
}



function renderBoard(){
    var elBoard=document.querySelector(".board")
    elBoard.innerHTML = '';
    var strHTML='';
    for (var i = 0; i< gSize; i++){
        strHTML += '<tr>'
        for (var j = 0; j< gSize; j++){
            if (gBoard[i][j] === 0){
                strHTML +='<td class="squares" oncontextmenu="maybeBomb('+i+','+j+',this, false)" id="l'+i+'_'+j+'" ' +
                            'onclick="clicked_I_J('+i+','+j+',this, false)"></td>';
            }else{
                strHTML +='<td class="squares" ' +
                            'oncontextmenu="maybeBomb('+i+','+j+',this, false)" id="l'+i+'_'+j+'" ' +
                            'onclick="clicked_I_J('+i+','+j+',this, false)">' +
                            '<img class="bomb" src="mine.jpg">' +
                    '</td>';
            }

        }
        strHTML+='</tr>'

    }
    elBoard.innerHTML += strHTML;
}

function maybeBomb(i,j){
    var strQuery='#l'+i+'_'+j;
    var elBox = document.querySelector(strQuery);

    if (elBox.innerHTML === '?') {
        elBox.innerHTML = '';
    }else{
    elBox.innerHTML += '?';
    }

    event.preventDefault();
}


function showBombs(){
    var elBombs = document.querySelectorAll("td >.bomb");
    for (var i = 0; i< elBombs.length; i++){
        elBombs[i].style.display = "inherit";
        if(elBombs[i].innerHTML === '<img class="bomb" src="mine.jpg">?'){
            elBombs[i].innerHTML ='<img class="bomb" src="mine.jpg">';
        }
    }
}


function clicked_I_J( i, j , elBox, flag){

    if (gStartTime && !gIsGameOn) return;

    if(!gStartTime){
        gStartTime = (new Date()).getTime()
        runClock();
        gIsGameOn = true;
    }
    var strQuery='#l'+i+'_'+j;
    var elNeg=document.querySelector(strQuery);
    if (elNeg.classList.contains("shown")) return;


    //if (elbox === 'undefined')
    //console.log(elBox);
    if (gBoard[i][j] === 1 ){
        showBombs();
        gIsGameOn = false; // can not get clicked
        if (confirm('ooohhh Game Over-play again?')){
            clearInterval(gTimeInterval);
            initGame(winTime);
        }

        return;
    }

    var negsCount = 0;
    for (var ii=-1; ii<=1; ii++) {
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

    elBox.innerHTML= negsCount;
    elBox.classList.remove("squares");
    elBox.classList.add("shown");
    gCountFind++;

    if (gCountFind >= gSize*gSize-gMinesNumber) {
        var winTime = (new Date()).getTime();
        showBombs();
        if (confirm('very good-play again?')){
            clearInterval(gTimeInterval);
            initGame(winTime);
        }

    }

    if (negsCount === 0 && flag === false) clickNeigboors_I_J_req(i,j);
}

//function clickNeigboors_I_J(i,j){
//    var elNeg = null;
//    var negsCount=0;
//    //var flag=true;
//    for (var ii = -1; ii <= 1; ii++) {
//        var currI = i + ii;
//        if (currI < 0 || currI >= gSize) continue;
//        for (var jj = -1; jj <= 1; jj++) {
//            var currJ = j + jj;
//            if (ii === 0 && jj === 0) continue;
//            if (currJ < 0 || currJ >= gSize) continue;
//
//
//            negsCount=0;
//            for (var iii = -1; iii <= 1; iii++) {
//                var currI2 = currI + iii;
//                if (currI2 < 0 || currI2 >= gSize) continue;
//                for (var jjj = -1; jjj <= 1; jjj++) {
//                    var currJ2 = currJ + jjj;
//                    if (iii === 0 && jjj === 0) continue;
//                    if (currJ2 < 0 || currJ2 >= gSize) continue;
//
//                    if (gBoard[currI2][currJ2] === 1) {
//                        negsCount++;
//                    }
//
//                    var strQuery = '#l' + currI2 + '_' + currJ2;
//                    elNeg = document.querySelector(strQuery);
//                    elNeg.innerHTML = negsCount; // works but recomaded to do differently
//                    elNeg.classList.remove("hidden");
//                    elNeg.classList.add("shown");
//                    gCountFind++;
//                    if (gCountFind === gSize*gSize-gMinesNumber) {
//                        var winTime = (new Date()).getTime();
//                        //initGame(winTime);
//                        alert('very good')
//                    }
//
//                }
//            }
//
//        }
//    }
//}
//



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

            var strQuery='#l'+currI+'_'+currJ;
            elNeg=document.querySelector(strQuery);
            if (elNeg.classList.contains("squares") ) {
                clicked_I_J(currI, currJ, elNeg, flag)
            }
        }
    }

}

function runClock(){
    var count = 0;
    var elClock = null;
    gTimeInterval = setInterval(function(){
        count++;
        elClock = document.querySelector(".clock");
        elClock.classList.remove("hidden");
        elClock.innerHTML= 'your time is:'+count;
    },1000)

}


function collectDataFromForm(form) {
    var details = document.getElementById('addBookForm');
    addBook(form.bookTitle.value, form.bookPrice.value, form.bookDescription.value, form.bookRate.value);
    return false;
}

function readAndAddNewBook() {
    var bookAdd = document.querySelector('#addBook');
    var bookAddBtn = document.querySelector('#btnAddBook')
    bookAddBtn.style.visibility = 'hidden';

    var str = '<form id="addBookForm" onsubmit="return collectDataFromForm(this)">' +
        'Book Title: <input type="text" name="bookTitle"><br>' +
        'Book Price: <input type="number" step="any" min="0" name="bookPrice"><br>' +
        'Book Description: <BR></B><textarea rows="4" cols="50" name="bookDescription" form="addBookForm"></textarea><br>' +
        'Book Rate: 0 <input type="range" name="bookRate" min="0" max="10" value="0">10<br>' +
        '<input type="submit" class="btnRead" value="Submit">' +
        '<input type="reset" class="btnUpdate" value="Reset">' +
        '<input type="button" class="btnDelete" value="Cancel" onclick="doneAddBook()">' +

        '</form>';


    bookAdd.innerHTML = str;
    bookAdd.style.visibility = 'visible';



}
