// TODO: use ajax to get the file server/games.json
// Create the list

$.getJSON('api/games', function (games) {
    var elGamesContainer = $('.container');
    var strHTML = '';
    games.forEach(function(game){
        console.log(game);

        strHTML +=  ' <div class="game ">' +
            ' <p>'+game.name+'</p>' +
            ' <img src="'+game.img+'" alt=""/>' +
            ' </div>'
    });
    elGamesContainer.html(strHTML);
});