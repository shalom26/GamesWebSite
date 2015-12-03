/**
 * Created by Shalom on 12/2/2015.
 */




function getStat(){
    var gamesStat = {};


    $.getJSON('api/stat',function(stats) {
        console.log(stats);
        gamesNames=[];
        stats.forEach(function (stat) {
            if (gamesStat[stat.name] === undefined) {
                gamesStat[stat.name] = 1;
                gamesNames.push(stat.name);
            }
            else gamesStat[stat.name]++;
                });

        var strHTML = '';
        for(var i = 0 ; i < gamesNames.length ; i++) {
           strHTML += '<dd class="stst-'+i+' percentage percentage-'+
               gamesStat[gamesNames[i]]+
               '"><span class="text">'+gamesNames[i]+
               '</span></dd>';
        }
      var elSataCont = document.querySelector('.statCont');
        elSataCont.innerHTML = strHTML;
        console.log(strHTML);
        });

}





