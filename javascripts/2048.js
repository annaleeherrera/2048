//TILES
var Tile = function (tile) {
  this.col = tile.attributes["data-col"].value;
  this.row = tile.attributes["data-row"].value;
  this.val = tile.attributes["data-val"].value;
};


///GAME
var Game = function() {
  // Game logic and initialization here
};

Game.prototype.makeTiles = function (tiles) {
  var tilesArray = [];
  for (i = 0; i < tiles.length; i++) {
      var tile = new Tile(tiles[i]);
      tilesArray.push(tile);
  };
  return tilesArray;
};

Game.prototype.moveTiles = function(tiles, direction) {

  switch(direction) {
    case 38: //up
      tiles.attr("data-row", "r0");
      break;
    case 40: //down
      tiles.attr("data-row", "r3");
      break;
    case 37: //left
      // tiles.attr("data-col", "c0");
      for (var i = 0; i < tiles.length; i++) {
        console.log(tileToLeft(tiles[i]));
      }

      break;
    case 39: //right
      for (var i = 0; i < tiles.length; i++) {
        console.log(tileToRight(tiles[i]));
      }
    break;
  };
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile');
      var tilesArray = game.makeTiles(tiles);
      game.moveTiles(tilesArray, event.which);
    };
  });
});
