// TODO: use ajax to get the file server/games.json
// Create the list

$.getJSON('api/games', function (games) {
    var elGamesContainer = $('.container');
    var strHTML = '';
    games.forEach(function(game){
        strHTML +=  ' <div  id="'+game.id+'" onclick="showPopGame(this)" class="game ">' +
            ' <p>'+game.name+'</p>' +
            ' <img src="'+game.img+'" alt=""/>' +
            ' </div>'
    });
    elGamesContainer.html(strHTML);
});


function showPopGame(elGame){
    var gameId = $(elGame).attr('id');
    var gameForPop = null;

    $.getJSON('api/games', function (games) {
        var elGamesContainer = $('.container');
        games.forEach(function(game){
            if (game.id === elGame.id) {
                gameForPop=game;
                $("#gameName").text(gameForPop.name);
                $("#gameBy").text(gameForPop.by);
                $("#gameLiveSince").text(gameForPop.publishedAt);
                $(".gamePhoto").attr("src",game.img);
                    console.log(gameForPop);
                $("#aboutTheGame").text(gameForPop.about);
                $("#ratersNumber").text(gameForPop.raters);
                $("#rateValue").text(gameForPop.rate);


            }

        });
        console.log(gameForPop);
    });

    $("#allScreenBlanket").fadeIn();

}







