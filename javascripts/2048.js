//TILES
var Tile = function (tile) {
  this.col = tile.attributes["data-col"].value;
  this.row = tile.attributes["data-row"].value;
  this.val = tile.attributes["data-val"].value;
  this.original = tile;
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

Game.prototype.moveTiles = function(tilesArray, direction) {

  switch(direction) {
    case 38: //up
    tilesArray.forEach(function (tile) {
      tile.original.setAttribute("data-row", "r0");
    });
      break;
    case 40: //down
    tilesArray.forEach(function (tile) {
      tile.original.setAttribute("data-row", "r3");
    });
      break;
    case 37: //left
      tilesArray.forEach(function (tile) {
        tile.original.setAttribute("data-col", "c0");
      });
      break;
    case 39: //right
    tilesArray.forEach(function (tile) {
      tile.original.setAttribute("data-col", "c3");
    });
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
