var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTiles = function(tiles, direction) {

  var get_col = function (tile) {

  };

  switch(direction) {
    case 38: //up
      tiles.attr("data-row", "r0");
      break;
    case 40: //down
      tiles.attr("data-row", "r3");
      break;
    case 37: //left
      tiles.attr("data-col", "c0");
      break;
    case 39: //right
      for (var i = 0; i < tiles.length; i++) {
        var position = tiles[i].attributes["data-col"].value[1];
        if (position == 3) {
          break;
        } else if{
          tiles[]
        }
        tiles[i].attr("data-col", "c3");
      }
      break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile');

      game.moveTiles(tiles, event.which);
    }
  });
});
