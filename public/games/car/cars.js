// Global Variables
var gCars;
var gIsRaceOn;
var gIntervalCars = null;

var ROAD_END = 600;


initGame();


// create the cars as objects
function createCars() {
    gCars = [];  // empty the array - other wise will add each time to previous vector(by push)
    var car1 = {color: 'red', left: 0, speed: 5};
    var car2 = {color: '#2c704c', left: 0, speed: 8};
    var car3 = {color: 'yellow', left: 0, speed: 2};
    gCars.push(car1);
    gCars.push(car2);
    gCars.push(car3);
}


// initiate the game
function initGame() {
    pauseRace();
    createCars();


    var road = document.querySelector('.road');
    road.innerHTML = ''; // empty the road (div)- other wise will add cars to existing array

    // defining the div of all cars and  and later put it in the road.
    var foo=function (car, index) {
        var strHtml =   '<div class="car" ' +
            'style="background-color:' + car.color + '" ' +
            'onclick="carClicked('+index+')"' +
            '></div>';
        //console.log('strHtml', strHtml);
        road.innerHTML += strHtml;
    };

gCars.forEach(foo)

}

// starting the -will use time interval to move the cars. change velocity if clicked
function startRace() {
    if (gIsRaceOn) return;  // if the race is already on - dont run another interval loops

    gIsRaceOn = true;
    var elCars = document.querySelectorAll('.car');

    //         another example :
    //    x=document.querySelector('h1')
    //               => <h1">?Cars inc.?</h1>
    //x.style.background='blue'
    //               => "blue"
    //  x=document.querySelector('h1')
    //               =>  <h1 style=?"background:? blue;?">?Cars inc.?</h1>

    console.log('elcars: '+elCars);

    gIntervalCars = setInterval(function () {
        // move all cars
        for (var i=0; i < elCars.length; i++) {
            var elCar   = elCars[i];
            var car     = gCars[i];
            car.left += car.speed;
            elCar.style.left = car.left + 'px';

            if (car.left >= ROAD_END) {
                pauseRace();
                console.log('Winner: ', car);
            }

        }

    }  , 100);
}


function pauseRace() {
    gIsRaceOn = false;
    if (gIntervalCars) {
        clearInterval(gIntervalCars);
        gIntervalCars = null;
    }
}

function carClicked(index) {
    if (gIsRaceOn) {
        gCars[index].speed += 10;
    }
}