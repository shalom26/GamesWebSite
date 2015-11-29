// TODO: use ajax to get the file server/games.json
// Create the list

$.getJSON('api/game', function (games) {
    console.log(games);
})

