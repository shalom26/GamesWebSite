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
                $.ajax({
                    url: 'api/stat',
                    type: 'POST',
                    data: {name:game.name}
                });
                gameForPop=game;
                $("#gameName").text(gameForPop.name);
                $("#gameBy").text(gameForPop.by);
                $("#gameLiveSince").text(gameForPop.publishedAt);
                $(".gamePhoto").attr("src",game.img);
                    console.log(gameForPop);
                $("#aboutTheGame").text(gameForPop.about);
                $("#ratersNumber").text('rate us? '+gameForPop.raters+' already did');
                //$("#ratersNumber").html("<p><span style='blue'>rate us?<span> +gameForPop.raters+ already did<p>");
                $("#rateValue").text(gameForPop.rate);
                $("#tryButton").attr("onclick","location.href='"+game.link+"';")
            }

        });
        console.log(gameForPop);
    });

    $("#allScreenBlanket").fadeIn();

}

function getRate(){

}

var options = {
    max_value: 5,
    step_size: 0.5,
    initial_value: 0,
    selected_symbol_type: 'utf8_star', // Must be a key from symbols
    cursor: 'default',
    readonly: false,
    change_once: false, // Determines if the rating can only be set once
    ajax_method: 'POST',
    url: 'api/rating',
    additional_data: {} // Additional data to send to the server
};

$(".rating").rate(options);





