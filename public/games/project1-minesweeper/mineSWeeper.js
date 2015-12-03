/**
 * Created by assid on 11-Nov-15.
 */
'use strict'

//var gBoard=[[0,0,0],[0,0,1],[1,0,0]];
var gBoard = [[0,0,1],[0,0,0],[0,1,0]];
var gSize = 3;
var gCountFind = 0;
var gMinesNumber=2;


//function createBoard(){
//
//    for (var i = 0; i< gMinesNumber; i++){
//        random....
//    }
//}


//<tr>
//<td></td>
//<td></td>
//<td></td>
//</tr>

renderBoard();


function initGame(){

    renderBoard();
    //time
    gCountFind=0;
}




function renderBoard(){
    var elBoard=document.querySelector(".board")
    elBoard.innerHTML = '';
    var strHTML='';
    for (var i = 0; i< gSize; i++){
        strHTML += '<tr>'
        for (var j = 0; j< gSize; j++){
            strHTML +='<td class="hidden" onclick="clicked_I_J('+i+','+j+',this)"></td>';

        }
        strHTML+='</tr>'

    }
    elBoard.innerHTML += strHTML;
}


function clicked_I_J( i, j , elBox){

    console.log(elBox);
    if (gBoard[i][j] === 1 ){
        initGame();
        alert('ooohhh Game Over- please try again');
        return;
    }

    var negsCount = 0;
    for (var ii=-1; ii<=1; ii++) {
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
    //console.log('Puk at ' + i + " " + j + " has " + negsCount + " negs" );
    // elBox.outerHTML= '<td class="shown">'+negsCount+'</td>'; // works but recomaded to do differently
    elBox.innerHTML= negsCount; // works but recomaded to do differently
    elBox.classList.remove("hidden");
    elBox.classList.add("shown");
    gCountFind++;
    if (gCountFind === gSize*gSize-gMinesNumber) {
        alert('very good')
        initGame();
    }

}


