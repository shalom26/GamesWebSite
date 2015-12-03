/**
 * Created by assid on 04-Nov-15.
 */


//    Global Variables
var gBalloons;
var gTimeOfInterval=20;
var SCREEN_END = 600;
var gIntervalBalloons;
var gIsRaceOn=false;
var balloonScore=0;
var gBestScore=null;
var gPopAudio = new Audio('poppingSound.mp3');
var gLaughAudio = new Audio('evilLaugh.wma');



// create the balloons as objects
function createBalloons() {
    gBalloons = [];  // empty the array - other wise will add each time to previous vector(by push)

    var Balloon1 = {color: 'blue', left: 200, bottom: 20, opacity:1, speed: 0.06};
    var Balloon2 = {color: '#2c704c', left:500, bottom: 20, opacity:1, speed: 0.075};
    var Balloon3 = {color: 'yellow', left: 800, bottom: 20, opacity:1, speed: 0.055};
    var Balloon4 = {color: 'purple', left: 1100, bottom: 20, opacity:1, speed: 0.07};
    gBalloons.push(Balloon1);
    gBalloons.push(Balloon2);
    gBalloons.push(Balloon3);
    gBalloons.push(Balloon4);
}


initGame();



// initiate the game
function initGame() {

    initGameScoresHandling()

    balloonScore = 0;
    gIsRaceOn=false;
    createBalloons();

    var screen = document.querySelector('.screen');
    screen.innerHTML = ''; // empty the screnn (div)- other wise will add Balloons to existing array
    var elwarnings = document.querySelector('.warnings');
    elwarnings.style.opacity = 0;

    // defining the div of all cars and  and later put it in the road.
    var balloonToHtml=function (balloon, index) {
        var strHtml =   '<div class="balloon" ' +
            'style="background-color:' + balloon.color + '; left:'+balloon.left+'px' +
            '; bottom:'+balloon.bottom+'px"' +
            'onclick="balloonClicked('+index+')"' +
            '></div>';
        //console.log('strHtml', strHtml);
        screen.innerHTML += strHtml;
    };
    gBalloons.forEach(balloonToHtml)

}



function initGameScoresHandling(){
    if (gIsRaceOn) {
        clearInterval(gIntervalBalloons);
        if (gBestScore) {   // if not first round
            if (balloonScore > gBestScore){
                gBestScore = balloonScore;
            }

        }else  {
            gBestScore = balloonScore;
        }

        var elscore = document.querySelector('.bestScore');
        elscore.innerHTML = '   best score is: ' + gBestScore;
        elscore = document.querySelector('.score');
        elscore.innerHTML = '' ;

    }
}


function startGame(){
    var isWarningRedOn = false;
    if (gIsRaceOn ){
        return;
    }

    gIsRaceOn=true;

    var elscore = document.querySelector('.score');
    elscore.innerHTML='   number of balloons is: '+balloonScore;
    console.log('elscore '+elscore);


    var elBalloons = document.querySelectorAll('.balloon');

    // raise all balloons
    gIntervalBalloons = setInterval(function () {

        if (balloonScore % 15 === 0){
            elBalloons = document.querySelectorAll('.balloon');
        }

        for (var i=0; i < elBalloons.length; i++) {
            var elBalloon   = elBalloons[i];
            var balloon     = gBalloons[i];

            balloon.bottom += Math.round(balloon.speed*gTimeOfInterval);
            elBalloon.style.bottom = balloon.bottom + 'px';

            // randon-0.5 - to get both sides, multiply by velocity for smoothness
            if (balloon.speed>0 ){
                randomSide = Math.round((Math.random()-0.5)*4*balloon.speed*gTimeOfInterval);
            }else randomSide=0;

            balloon.left += randomSide;
            elBalloon.style.left = balloon.left + 'px';


            //  change back to moving up- when getting to the buttom.
            if (balloon.bottom <= 20 && gBalloons[i].speed < 0){
                gBalloons[i].speed=parseFloat(-(1/3)*gBalloons[i].speed);
                balloon.left=Math.round(Math.random()*900)+200;
            }

            //  got to the end of the screen
            if (balloon.bottom >= SCREEN_END) {
                if (!isWarningRedOn){
                    warningRed();
                    isWarningRedOn = true;
                }

                if (!(elBalloon.style.background === 'red')) {
                    balloon.bottom = 20;
                    elBalloon.style.bottom = balloon.bottom + 'px';
                    elBalloon.style.background = 'red';
                } else {
                    initGame();
                    alert('Game end !! - please try again')
                }
            }
        }

    }  , gTimeOfInterval);
}


function warningRed(){
    var elwarnings = document.querySelector('.warnings');
    var countIntervals=0;
    var intervalwarning = setInterval(function () {
            elwarnings.style.opacity = countIntervals % 2;
            countIntervals++;
            if (!gIsRaceOn) clearInterval(intervalwarning);
        }
        ,250);


}



function balloonClicked(index) {
    if (!gIsRaceOn || gBalloons[index].speed < 0){
        return;
    }
    gBalloons[index].speed = parseFloat(-3 * gBalloons[index].speed);
    balloonScore++;
    gPopAudio.play();
    var elscore = document.querySelector('.score');
    elscore.innerHTML='   number of balloons is: '+balloonScore;


    if (balloonScore % 10 === 0 ){
        gBalloons.forEach(function(balloon){
            balloon.speed*=1.2;
        })

    }


    if (balloonScore % 15 === 0){
        gLaughAudio.play();
        var balloon = {color: 'green', left: 700, bottom: 20, opacity:1, speed: 0.07};
        gBalloons.push(balloon);

        strHtml =   '<div class="balloon" ' +
            'style="background-color:' + balloon.color + '; left:'+balloon.left+'px' +
            '; bottom:'+balloon.bottom+'px"' +
            'onclick="balloonClicked('+(gBalloons.length-1)+')"' +
            '></div>';
        //console.log('strHtml', strHtml);
        var screen = document.querySelector('.screen');
        screen.innerHTML += strHtml;
    }

}

//function balloonClicked(index){
//    var elBalloons = document.querySelectorAll('.balloon');
//
//    gIntervalCars = setInterval(function () {
//        //
//            var elBalloon   = elBalloons[index];
//            var balloon     = gBalloons[index];
//            balloon.opacity -=0.1 ;
//            elBalloon.style.opacity = balloon.opacity ;
//            elBalloon.bottom=20;
//            if (balloon.opacity <= 0) {
//               return
//            }
//
//    }  , gTimeOfInterval/3);
//
//}