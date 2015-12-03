/**
 * Created by assid on 04-Nov-15.
 */
// Global Variables
var gBalloons;
var gTimeOfInterval=100;
//var gIsRaceOn;
//var gIntervalCars = null;

var SCREEN_END = 600;


initGame();


// create the balloons as objects
function createBalloons() {
    gBalloons = [];  // empty the array - other wise will add each time to previous vector(by push)
    var Balloon1 = {color: 'blue', left: 200, bottom: 20, opacity:1, speed: 0.05};
    var Balloon2 = {color: '#2c704c', left:500, bottom: 20, opacity:1, speed: 0.08};
    var Balloon3 = {color: 'yellow', left: 800, bottom: 20, opacity:1, speed: 0.02};
    var Balloon4 = {color: 'red', left: 1100, bottom: 20, opacity:1, speed: 0.04};
    gBalloons.push(Balloon1);
    gBalloons.push(Balloon2);
    gBalloons.push(Balloon3);
    gBalloons.push(Balloon4);
}


// initiate the game
function initGame() {
    //pauseRace();
    createBalloons();

    var screen = document.querySelector('.screen');
    screen.innerHTML = ''; // empty the screnn (div)- other wise will add Balloons to existing array

    // defining the div of all cars and  and later put it in the road.
    var foo=function (balloon, index) {
        var strHtml =   '<div class="balloon" ' +
            'style="background-color:' + balloon.color + '; left:'+balloon.left+'px' +
            '; bottom:'+balloon.bottom+'px"' +
            'onclick="balloonClicked('+index+')"' +
            '></div>';
        //console.log('strHtml', strHtml);
        screen.innerHTML += strHtml;
    };
    gBalloons.forEach(foo)

}


function startGame(){
    var elBalloons = document.querySelectorAll('.balloon');

    gIntervalCars = setInterval(function () {
        // move all cars
        for (var i=0; i < elBalloons.length; i++) {
            var elBalloon   = elBalloons[i];
            var balloon     = gBalloons[i];
            balloon.bottom += Math.round(balloon.speed*gTimeOfInterval);
            elBalloon.style.bottom = balloon.bottom + 'px';

            //if (balloon.bottom >= ROAD_END) {
            //    //pauseRace();
            //    console.log('Winner: ', car);
            //}

        }

    }  , gTimeOfInterval);
}



function balloonClicked(index){
    var elBalloons = document.querySelectorAll('.balloon');

    gIntervalCars = setInterval(function () {
        // move all cars
            var elBalloon   = elBalloons[index];
            var balloon     = gBalloons[index];
            balloon.opacity -=0.1 ;
            elBalloon.style.opacity = balloon.opacity ;

            if (balloon.bottom <= 0) {
               return
            }



    }  , gTimeOfInterval/3);

}