/*
*   Battleship plain JS logic
*/

// Specify game CONSTANTS
ROW_NUMBER = 10
COLUMN_NUMBER = 10
BATTLESHIP = 5 // squares
DESTROYER = 4 // squares
SHIPS = {"Battleship": 1, "Destroyer": 2}
WATER_SQ = '0'
SHIP_SQ = '1'
HIT_SQ = 'X'
MISS_SQ = 'M'
LOOPS_MAX = 5000

//Hint values ('sugar' to avoid .length calls)
var row_length = ROW_NUMBER - 1
var column_length = COLUMN_NUMBER - 1

// Create the user's board
var gameBoard = []


// Initialize the (ROW_NUMBER * COLUMN_NUMBER) Board to water/empty value
for (var x = 0; x < ROW_NUMBER; x++) {
  gameBoard[x] = []
  for (var y = 0; y<COLUMN_NUMBER; y++) {
    gameBoard[x][y] = WATER_SQ
  }
}

/* Clone the water/empty board in order to obtain the shadow board
* (which will include the random WATER/SHIP information values).
* Using slice(0) to improve performance [TODO: Check this].
 */
var shadowBoard = gameBoard.slice(0)


/*
* randomCoords ( )
* This function returns a randomized object with a position (x,y) and a boolean orientation(0 horizontal, 1 vertical)
* Return - {number x, number y, boolean o}
*/
function randomCoords() {
  var orientation = Math.floor(Math.random() < 0.5)
  var xPos = Math.floor(Math.random() * 10)
  var yPos = Math.floor(Math.random() * 10)
  return {x: xPos, y: yPos, o: orientation}
}


/*
* setShipPosition ( {number xCoord, number yCoord, boolean orientation},
* number size )
* This function fixes ship's position in the board after all checks
* Return - Nothing
*/
function setShipPosition(shPos, size) {
  var x = shPos.x
  var y = shPos.y
  for (var i = 0; i < size; i++) {
    shadowBoard[x][y] = SHIP_SQ
    if (shPos.o === 0) {
      x++
    } else {
      y++
    }
  }
}


/*
* checkShipPosition ( {number xCoord, number yCoord, boolean orientation},
* number size )
* This function checks if the given randomized ship fits in the board and
* does not collide with other ships
* Return - Boolean
*/
function checkAndSetShipPosition (shPos, size) {
  var x = shPos.x
  var y = shPos.y
  var vertical = shPos.o

  // Check if the coordinates + its orientation does not fit to the GRID size.
  if ((size + x) > row_length && !vertical) return false
  if ((size + y) > column_length && vertical) return false

  // Check the shadowBoard contents
  for (var i = 0; i < size; i++) {
    // Check if there is a ship in x-y position
    if (shadowBoard[x][y] != WATER_SQ) return false

    // Add 1 square according to orientation
    if (shPos.o === 0) {
      x++
    } else {
      y++
    }
  }
  setShipPosition(shPos, size)
  return true
}


/*
* setShip ( number size )
* This function loops until it finds a matching position for the ship, or returns false after a fixed number of tries, where its supposed not to fit in the GRID
*/
function setShip(size) {
  var match = false
  var loops = 0
  while (!match && loops <= LOOPS_MAX) {
    match = checkAndSetShipPosition(randomCoords(), size)
    loops++
  }
  if(loops > LOOPS_MAX) return false
  else return true
}


/*
* printDistribution ( )
* This function only shows the created map in a log style. Debuggin purpose only
* Return -
*/
function printDistribution() {
  console.log(shadowBoard)
}


/*
* randomDistribution ( {number Battleship, number Destroyer} )
* This function is the responsible to distribute all the SHIPS in the shadowBoard.
* Return - Boolean
*/
function randomDistribution () {
/* TODO: if this function returns false means that something went wrong (maybe add a maximum number of tries in case CONSTANT values are not fittable) */
  var battleType = SHIPS.Battleship
  var destrType = SHIPS.Destroyer

  // Set first biggest ship
  if(battleType > 0) {
    for (var i = 0; i < battleType; i++) {
      if(!setShip(BATTLESHIP)) return false
    }
  }

  if(destrType > 0) {
    for (var i = 0; i < destrType; i++) {
      if(!setShip(DESTROYER)) return false
    }
  }
  printDistribution()
  return true
}
