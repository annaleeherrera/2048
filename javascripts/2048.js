//TILES
var Tile = function (tile) {
  this.original = tile;
  this.col = tile.attributes["data-col"].value;
  this.row = tile.attributes["data-row"].value;
  this.val = tile.attributes["data-val"].value;
  this.colNum = Number(this.col[1]);
  this.rowNum = Number(this.row[1]);
  this.nextTile = function (direction) {
  }
};

//row and col refer to positions in the board array
//this will add a tile to the board
Tile.prototype.makeNew = function (row, col, value) {

};

Tile.prototype.newRandom = function () {
  //random
};


//BOARD
var Board = function (array) {
  this.contents = array;
};

//board updates itself based on movement of tiles
Board.prototype.update = function (newArray) {
  this.contents = newArray;
};

//board talks to DOM based on what it's storing
Board.prototype.updateDom = function () {
  //makes it so everything in the board is represented by a line of html
  //first remove old tiles
  var game= $("#gameboard");
  var tiles = game.children(".tile");
  tiles.remove();
  //then add updated tiles
  (this.contents).forEach(function (row) {
    row.forEach(function (index) {
      if (index == 0) {
        break;
      } else {
        game.append("<div></div>");
      }

    });
  });
  // game.append()



};

///GAME
var Game = function() {
  var board = new Board([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
};

// Game.prototype.makeTiles = function (tiles) {
//   var tilesArray = [];
//   for (i = 0; i < tiles.length; i++) {
//       var tile = new Tile(tiles[i]);
//       tilesArray.push(tile);
//   };
//   return tilesArray;
// };

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
      // var tilesArray = game.makeTiles(tiles);

      game.moveTiles(tilesArray, event.which);
    };
  });
});
