//TILES
var Tile = function (tile) {
  this.original = tile;
  this.col = tile.attributes["data-col"].value; //ie "c1"
  this.row = tile.attributes["data-row"].value; //ie "r1"
  this.val = tile.attributes["data-val"].value; //ie "4"
  this.colNum = Number(this.col[1]);
  this.rowNum = Number(this.row[1]);
  this.valNum = Number(this.val);
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
  var gameboard= $("#gameboard");
  var tiles = gameboard.children(".tile");
  tiles.remove();
  //then add updated tiles
  (this.contents).forEach(function (row) {
    row.forEach(function (tile) {
      if (tile == 0) {
        break;
      } else {
        gameboard.append('<div class="tile" data-row=' + tile.row + ', data-col=' + tile.col + ' data-val=' + tile.val +'>'+ tile.valNum + '</div>');
      };
      });
    });
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
      game.moveTiles(tilesArray, event.which);
    };
  });
});
