//HELPER- add array method to get random elements from arrays
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)]
};

//TILES
//arguments to be passed in to create tiles are strings
var Tile = function (row, col, val) {
  this.colNum = col;
  this.rowNum = row;
  this.valNum = val;
  this.col = col.toString; //ie "c1"
  this.row = row.toString;  //ie "r1"
  this.val = val.toString; //ie "4"
};


//BOARD
var Board = function (array) {
  this.contents = array;
};

//board updates itself based on movement of tiles
Board.prototype.update = function (newArray) {
  this.contents = newArray;
};

Board.prototype.isFull = function () {
  (this.contents).forEach(function (row) {
    row.forEach(function (tile) {
      if (tile == 0) {
        break;
      } else {
        return true;
      };
    });
  });
};

//add a new tile in a random unoccupied spot
Board.prototype.newRandomTile = function () {
  //if the board is full, don't add another tile.
  if this.isFull() {
    break;
  } else {
    var findEmptyLocation = function () {
      var columns = [0, 1, 2, 3];
      var rows = [0, 1, 2, 3];
      var randRow = rows.randomElement();
      var randCol = columns.randomElement();
      var randVal = ['2','4'][Math.round(Math.random())];
      //check at that spot to see if there is a tile already
      if ((this.contents[randRow][randCol]) !== 0) {
        var tile = new Tile(randRow, randCol, randVal);
        return tile;
      } else {
        findEmptyLocation();
      };
    };
  };
};

//places a tile onto the board
//takes tile object as parameter
Board.prototype.placeTile = function (tile) {
  this[tile.rowNum][tile.colNum] = tile;
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
