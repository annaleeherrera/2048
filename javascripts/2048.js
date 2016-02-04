//HELPER- add array method to get random elements from arrays
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

//TILES
//arguments to be passed in to create tiles are numbers
var Tile = function (row, col, val) {
  this.colNum = col;
  this.rowNum = row;
  this.valNum = val;
  this.col = "c" + (this.colNum).toString(); //ie "c1"
  this.row = "r" + (this.rowNum).toString();  //ie "r1"
  this.val = (this.valNum).toString(); //ie "4"
};

Tile.prototype.nextSpot = function (direction, board) {

  //rowOrCol is either this.rowNum or this.colNum
  //edge is 0 or 3
  //cordinates are something like [this.rowNum-1][this.colNum]
  var lookAtSpot = function (rowOrCol, edge, value, coordinates) {
    var response = { status: null, tile: null, row: null, column: null};
    if (rowOrCol == edge) {
      response.status = "wallOrDiff";
      return response;
    } else if (board.contents[coordinates[0]][coordinates[1]] == 0) {
      response.status = "empty";
      response.row = coordinates[0];
      response.column = coordinates[1];
      return response;
    } else {
      nextTile = board.contents[coordinates[0]][coordinates[1]];
      if (nextTile.valNum == value) {
        response.status = "match";
        response.tile = nextTile;
        response.row = nextTile.rowNum;
        response.column = nextTile.colNum;
        return response;
      } else {
        response.status = "wallOrDiff";
        response.tile = nextTile;
        response.row = nextTile.rowNum;
        response.column = nextTile.colNum;
        return response;
      };
    };
  }

  switch(direction) {
    case 38: //up
      return lookAtSpot(this.rowNum, 0, this.valNum, [[this.rowNum-1],[this.colNum]]);
      break;
    case 40: //down
      return lookAtSpot(this.rowNum, 3, this.valNum,  [[this.rowNum+1],[this.colNum]]);
      break;
    case 37: //left
      return lookAtSpot(this.colNum, 0, this.valNum, [[this.rowNum],[this.colNum-1]]);
      break;
    case 39: //right
      return lookAtSpot(this.colNum, 3, this.valNum, [[this.rowNum],[this.colNum+1]]);
      break;
    };
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
  var full = true;
  var boardArray = this.contents;
  for (var i = 0; i < boardArray.length; i++) {
    for (var j = 0; j < boardArray[i].length; j++) {
      if (boardArray[i][j] == 0) {
        full = false;
        return full;
      };
    };
  };
  return full;
};


Board.prototype.findEmptyLocation = function () {
  var columns = [0, 1, 2, 3], rows = [0, 1, 2, 3];
  var tile = null, randRow = null, randCol = null, randVal = null;
  while (tile == null) {
    randRow = rows.randomElement();
    randCol = columns.randomElement();
    randVal = ['2','4'][Math.round(Math.random())];
    if ((this.contents[randRow][randCol]) === 0) {
      tile = new Tile(randRow, randCol, Number(randVal));
    };
  };
  return tile;
};


//add a new tile in a random unoccupied spot
Board.prototype.placeRandomTile = function () {
  //if the board is full, don't add another tile.
  if (this.isFull()) {
  } else {
    newTile = this.findEmptyLocation();
    this.placeTile(newTile);
  };
};

//places a tile onto the board
//takes tile object as parameter
Board.prototype.placeTile = function (tile) {
  this.contents[tile.rowNum][tile.colNum] = tile;
  this.updateDom();
};

Board.prototype.removeTile = function (tile) {
  this.contents[tile.rowNum][tile.colNum] = 0;
  this.updateDom();
};

//board talks to DOM based on what it's storing
Board.prototype.updateDom = function () {
  //makes it so everything in the board is represented by a line of html
  //first remove old tiles
  var gameboard= $("#gameboard");
  var tiles = $(".tile");
  tiles.remove();
  //then add updated tiles
  (this.contents).forEach(function (row) {
    row.forEach(function (tile) {
      if (tile === 0) {
      } else {
        gameboard.append('<div class="tile" data-row="' + tile.row + '",' + ' data-col="' + tile.col + '" data-val="' + tile.val +'">'+ tile.valNum + '</div>');
      };
    });
  });
};


///GAME
var Game = function() {
  this.board = new Board([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  this.board.placeRandomTile();
  this.board.placeRandomTile();
};

Game.prototype.moveTiles = function(direction) {
  var board = this.board;
  var boardArray = board.contents;

  var chooseAction = function (current, direction, board) {
    var boardArray = board.contents;
    if (current != 0) {
      var next = current.nextSpot(direction, board);
      if (next.status == "empty") {
        movedTile = new Tile(next.row, next.column, current.valNum);
        board.removeTile(current);
        board.placeTile(movedTile);
      } else if (next.status == "match") {
         var newVal = next.tile.valNum + current.valNum;
         mergedTile = new Tile(next.tile.rowNum, next.tile.colNum, newVal);
         board.removeTile(current);
         board.placeTile(mergedTile);
      };
    };
    return board.contents;
  };

  var updatedBoardArray = null;
  while (boardArray !== updatedBoardArray) {
    for (var i = 0; i < boardArray.length; i++) {
      for (var j = 0; j < boardArray[i].length; j++) {
        var current = boardArray[i][j];
        updatedBoardArray = chooseAction(current, direction, board);
        board.contents = updatedBoardArray;
      };
    };
  };
  this.board.contents = updatedBoardArray;
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile');
      game.moveTiles(event.which);
      game.board.placeRandomTile();
    }
  });
});
