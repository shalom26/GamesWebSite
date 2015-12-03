/**
 * Created by Shalom on 12/2/2015.
 */




function getStat(){
    var gamesStat = {};


    $.getJSON('api/stat',function(stats) {
        console.log(stats);
        stats.forEach(function (stat) {
            if (gamesStat[stat.name] === undefined) gamesStat[stat.name] = 1;
            else gamesStat[stat.name]++;
                });
        for(var i = 0 ; i < 5 ; i++) {
            var elStst;
            elStst = document.querySelector('.stst-'+i);
            elStst.classList.add('percentage-' + gamesStat[i]);
            //console.log(elStst);
        }
        //console.log(gamesStat);
        });

}





