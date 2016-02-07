//HELPER- add array method to get random elements from arrays
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

//TILES
//arguments to be passed in to create tiles are numbers
var Tile = function (row, col, val, id) {
  this.id = id;
  this.colNum = col;
  this.rowNum = row;
  this.valNum = val;
  this.col = "c" + (this.colNum).toString(); //ie "c1"
  this.row = "r" + (this.rowNum).toString();  //ie "r1"
  this.val = (this.valNum).toString(); //ie "4"
};

Tile.prototype.nextSpot = function (direction, board) {

  //edge is 0 or 3
  var lookAtSpot = function (rowOrCol, edge, value, currRow, currCol, board) {
    var response = { status: null, tile: null, row: null, col: null};
    if (rowOrCol == edge) {
      response.status = "wallOrDiff";
      return response;
    } else if (board.contents[currRow][currCol] == 0) {
      response.status = "empty";
      response.row = "r" + Number(currRow);
      response.col = "c" + Number(currCol);
      return response;
    } else {
      nextTile = board.contents[currRow][currCol];
      if (nextTile.valNum == value) {
        response.status = "match";
        response.tile = nextTile;
        response.row = nextTile.row;
        response.col = nextTile.col;
        return response;
      } else {
        response.status = "wallOrDiff";
        response.tile = nextTile;
        response.row = nextTile.row;
        response.col = nextTile.col;
        return response;
      };
    };
  }

  switch(direction) {
    case 38: //up
      return lookAtSpot(this.rowNum, 0, this.valNum, this.rowNum-1, this.colNum, board);
      break;
    case 40: //down
      return lookAtSpot(this.rowNum, 3, this.valNum, (this.rowNum)+1, this.colNum, board);
      break;
    case 37: //left
      return lookAtSpot(this.colNum, 0, this.valNum, this.rowNum, (this.colNum)-1, board);
      break;
    case 39: //right
      return lookAtSpot(this.colNum, 3, this.valNum, this.rowNum,(this.colNum)+1, board);
      break;
    };
  };

  Tile.prototype.updateTileDiv = function () {
    tileDiv = $(".tile[data-id=" + this.id + "]");
    tileDiv.attr({
      "data-row": this.row,
      "data-col": this.col,
      "data-val": this.val
    });
    tileDiv[0].innerHTML = this.val;
  };

  Tile.prototype.deleteTileDiv = function () {
    tileDiv = $(".tile[data-id=" + this.id + "]");
    tileDiv.remove();
  };

//BOARD
var Board = function (array) {
  this.tileCounter = 1;
  this.contents = array;
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
      tile = new Tile(randRow, randCol, Number(randVal), this.tileCounter);
      this.tileCounter += 1;
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
//don't immediately show the new tile- do fadein
Board.prototype.placeTile = function (tile) {
  this.contents[tile.rowNum][tile.colNum]= tile;
  var gameboard= $("#gameboard");
  var newTile = $('<div class="tile" data-row="' + tile.row + '",' + ' data-col="' + tile.col + '" data-val=' + tile.val + ' data-id=' + tile.id + ' >'+ tile.valNum + '</div>').hide().fadeIn(100);
  gameboard.append(newTile);
};

Board.prototype.moveTiles = function (direction) {
  //iterate over board differently for different directions
  //left or up vs right or down
  if (direction == 37 || direction == 38) {
    this.loopTilesForward(direction);
  } else if (direction == 39 || direction == 40) {
    this.loopTilesBackward(direction);
  };
};


Board.prototype.loopTilesForward = function (direction) {
  for (var i = 0; i < this.contents.length; i++) {
    for (var j = 0; j < this.contents[i].length; j++) {
      this.processOneTile(direction, i, j);
    };
  };
};

Board.prototype.loopTilesBackward = function (direction) {
  for (var i = (this.contents.length-1); i >= 0; i--) {
    for (var j = (this.contents[i].length-1); j >= 0; j--) {
      this.processOneTile(direction, i, j);
    };
  };
};

Board.prototype.processOneTile = function (direction, i, j){
  var current = this.contents[i][j];
  //only work on spots on board that contain tiles
  if (current != 0) {
    var next = current.nextSpot(direction, this);
    //keep moving a tile until it hits a wall or different value
    while (next.status != "wallOrDiff") {
      if (next.status == "empty") {
        //when next is empty, ok to keep going
        this.shiftTile(current, next, current.val);
        next = current.nextSpot(direction, this);
      } else if (next.status == "match") {
        //if it's a match, do combine but then break.
        //only allowed to collide once
        var value = (current.val * 2);
        this.shiftTile(current, next, value);
        break;
      };
    };
  };
};

Board.prototype.shiftTile = function (tile, next, value) {
  //updates the tile, the div and the board
    this.contents[tile.rowNum][tile.colNum] = 0;
    tile.row = next.row;
    tile.col = next.col;
    tile.colNum = Number(next.col[1]);
    tile.rowNum = Number(next.row[1]);
    tile.val = value;
    tile.valNum = Number(value);

    //if there is an adjacent tile, can keep tile object around but need to
    //get rid of the div
    if (next.tile) {
      next.tile.deleteTileDiv();
    };
    this.contents[tile.rowNum][tile.colNum] = tile;
    tile.updateTileDiv();
};

///GAME
var Game = function() {
  this.board = new Board([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  this.board.placeRandomTile();
  this.board.placeRandomTile();
};

$(document).ready(function() {
  console.log("ready to go!");
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      game.board.moveTiles(event.which);
      game.board.placeRandomTile();
    }
  });
});
