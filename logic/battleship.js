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

// Create the user's board
var gameBoard = []

// Initialize the Board to water/empty value
for (var x = 0; x < ROW_NUMBER; x++) {
  gameBoard[x] = []
  for (var y = 0; y<COLUMN_NUMBER; y++) {
    gameBoard[x][y] = WATER_SQ
  }
}

/* Clone the board in order to obtain the shadow board
* (which will include the hidden map with WATER/SHIP values).
* Using slice(0) to improve performance.
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
function checkShipPosition (shPos, size) {
  var x = shPos.x
  var y = shPos.y
  for (var i = 0; i < size; i++) {
    // Check if our ship exceeds table limits
    if(x === 10 || y === 10) return false

    // Check if there is a ship in x-y position
    if (shadowBoard[x][y] != WATRER_SQ) return false

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
* randomDistribution ( {number Battleship, number Destroyer} )
* This function is the responsible to distribute all the SHIPS in the shadowBoard.
* Return - Boolean
*/
function randomDistribution (SHIPS) {
// TODO: if this function returns false means that something went wrong (maybe add a maximum number of tries in case CONSTANT values are not fittable)

return true
}
