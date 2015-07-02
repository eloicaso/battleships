/*
*   Battleship Game JS logic
*   Eloi Carbo 2015 - MIT License
*/

// Specify game CONSTANTS
ROWS_NUMBER = 10
COLUMNS_NUMBER = 10
BATTLESHIP = 5 // length squares
DESTROYER = 4 // length squares
SHIPS = {
  Battleship: 1,
  Destroyer: 2
}
WATER_SQ = '0'
SHIP_SQ = '1'
HIT_SQ = 'X'
MISS_SQ = 'M'
SUNK_SQ = 'S'
LOOPS_MAX = 5000

/* Begining of hint values */
// 'sugar' to avoid repetitive .length calls in initialization functions
var row_length = ROWS_NUMBER - 1
var column_length = COLUMNS_NUMBER - 1
// # of: ship squares destroyed, pending or missed. Number of shoots made
var destroyedSq, aliveSq, missedSq, totalShoots
/*
* Array of each Ship position. Ex: ship1 {type: BATTLESHIP, alivePos: 1, position: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 4}]}
* This example means that we have a vertical positioned ship starting in 0,0 and finishing in 0,4 that has already been hit 3 times.
*/
var shipsPosition = []
/* End of hint Values */


/*
* initializeHintValues ( number destroyed, number alive, number missed )
* This function initializes to 0 the hint values and also sets the number
* of existing alive ship squares.
*/
function initializeHintValues() {
  destroyedSq = 0
  missedSq = 0
  totalShoots = 0
  // Returns the total # of ship squares
  aliveSq = (SHIPS.Battleship * BATTLESHIP) + (SHIPS.Destroyer * DESTROYER)
}


/*
* getDestroyedSq ( )
* This function returns the total of ship squares hit
* Return the totalSh value
*/
function getDestroyedSq() {
  return destroyedSq
}


/*
* getMissedSq ( )
* This function returns the total of missed shoots
* Return the totalSh value
*/
function getMissedSq() {
  return missedSq
}


/*
* getTotalShoots ( )
* This function returns the total (CORRECT) shoots made by the user
* Return the totalSh value
*/
function getTotalShoots() {
  return totalShoots
}


/*
* getAliveSq ( )
* This function returns the total SHIP squares that are not yet hit by the user
* Return the aliveSq value
*/
function getAliveSq() {
  return aliveSq
}


/*
* getAccuracy ( )
* This function returns the % of accuracy achieved in this game by the user.
* Return the calculated accuracy value
*/
function getAccuracy() {
  return Math.floor((getDestroyedSq() / getTotalShoots())  * 100)
}


/* Create the game and shadow boards:
* gameBoard will contain all hits/misses from user's interaction
* shadowBoard will contain the randomized distribution of ships
*/
var gameBoard = []
var shadowBoard = []


/*
* initializeBoard ( array[][] board )
* Initialize the (ROWS_NUMBER * COLUMNS_NUMBER) Board to water/empty value
*/
function initializeBoard(board) {
  for (var x = 0; x < ROWS_NUMBER; x++) {
    board[x] = []
    for (var y = 0; y < COLUMNS_NUMBER; y++) {
      board[x][y] = WATER_SQ
    }
  }
}

/*
* initBoards ( )
* This function sets to WATER_SQ value all the game/shadow GRIDs
*/
function initBoards() {
  initializeBoard(gameBoard)
  initializeBoard(shadowBoard)
}


/*
* randomCoords ( )
* This function returns a randomized object with a position (x,y) and a boolean orientation(0 horizontal, 1 vertical)
* Return - {number x, number y, boolean o}
*/
function randomCoords() {
  var orientation = Math.floor(Math.random() < 0.5)
  var xPos = Math.floor(Math.random() * 10)
  var yPos = Math.floor(Math.random() * 10)
  return {
    x: xPos,
    y: yPos,
    o: orientation
  }
}


/*
* setShipPosition ( {number xCoord, number yCoord, boolean orientation},
* number size )
* This function fixes ship's position in the board after all checks.
* It also adds a ship in the shipsPosition variable
* Return - Nothing
*/
function setShipPosition(shPos, size) {
  var ship = {}
  var xy = {}
  var coordinates = []
  var x = shPos.x
  var y = shPos.y
  var type
  for (var i = 0; i < size; i++) {
    shadowBoard[x][y] = SHIP_SQ
    xy = {
      x: x,
      y: y
    }
    coordinates.push(xy)
    if (shPos.o === 0) {
      x++
    } else {
      y++
    }
  }

  if (size === SHIPS.Battleship) type = 'Battleship'
  else type = 'Destroyer'

  ship = {
    type: type,
    alivePos: size,
    position: coordinates,
    isPrinted: false
  }
  shipsPosition.push(ship)
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
  if (((size + x) > row_length) && !vertical) return false
  if (((size + y) > column_length) && vertical) return false

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
  while (!match && (loops <= LOOPS_MAX)) {
    match = checkAndSetShipPosition(randomCoords(), size)
    loops++
  }
  if (loops > LOOPS_MAX) return false
  else return true
}


/*
* printDistribution ( )
* This functions shows the created board in a log style. Debuggin purpose only
* Return -
*/
function printShadow() {
  console.log(shadowBoard)
}
function printGame() {
  console.log(gameBoard)
}


/*
* randomDistribution ( {number Battleship, number Destroyer} )
* This function is the responsible to distribute all the SHIPS in the shadowBoard
* Return - Boolean
*/
function randomDistribution () {
  var battleType = SHIPS.Battleship
  var destrType = SHIPS.Destroyer

  // Set first biggest ship
  if (battleType > 0) {
    for (var i = 0; i < battleType; i++) {
      if (!setShip(BATTLESHIP)) return false
    }
  }

  if (destrType > 0) {
    for (var i = 0; i < destrType; i++) {
      if (!setShip(DESTROYER)) return false
    }
  }
  return true
}


/*
* getContent( number x, number y )
* This function returns the content of the GameBoard in the x,y position
* Returns a value (WATER_SQ, MISS_SQ or HIT_SQ)
*/
function getContent(x, y) {
  return gameBoard[x][y]
}


/*
* sinkShip ( object ship )
* This function sets the content of the gameBoard[x][y] positions of the given
* ship to the SUNK_SQ value.
* Return -
*/
function sinkShip(ship) {
  for (var i = 0; i < ship.position.length; i++) {
    gameBoard[ship.position[i].x][ship.position[i].y] = SUNK_SQ
  }
}


/*
* hitShip ( number x, number y )
* This function checks which of the ships has been hit and applies it to
* ship's information. This function assumes that there is no possibility to
* hit a ship more than its length variable.
* Returns true if the ship that was hit has sunked. Returns false if not.
*/
function hitShip(x, y) {
  for (var i = 0; i < shipsPosition.length; i++) {
    for (var j = 0; j < shipsPosition[i].position.length; j++) {
      if ((x === shipsPosition[i].position[j].x) &&
        (y === shipsPosition[i].position[j].y)) {
        shipsPosition[i].alivePos -= 1
        if (shipsPosition[i].alivePos === 0){
          // Print SUNK_SQ on the gameBoard
           sinkShip(shipsPosition[i])
           return true
         }
      }
    }
  }
  return false
}


/*
* checkAndHit ( number x, number y)
* This function uses x and y values to check shadowBoard contents in that
* position and print it in the gameBoard
*/
function checkAndHit(x, y) {
  var result
  if (gameBoard[x][y] !== WATER_SQ) result = 0
  else {
    result = 1
    if (shadowBoard[x][y] === WATER_SQ) {
     gameBoard[x][y] = MISS_SQ
     missedSq++
    } else {
    gameBoard[x][y] = HIT_SQ
    destroyedSq++
    aliveSq--
    // Applies the shoot to the ship and checks if it sunked
    if (hitShip(x, y)) result = 2
    }
    totalShoots++
  }
  return result
}


/*
* hitSquare ( number x, number y)
* This function uses x and y values to check shadowBoard contents in that
* position and print it in the gameBoard
* Returns true if the position is inside the grid AND not previously
* hit by another hitSquare function call
*/
function hitSquare(x, y) {
  if ((x > 9) || (y > 9)) return 0
  return checkAndHit(x, y)
}


/*
* initializeGame ( )
* This function starts a Battleship game by initializing values to 0/water * and then creating the randomized ships distribution
* Returns true if the game has been successfully created
*/
function initializeGame() {
  initializeHintValues()
  initBoards()
  randomDistribution()
  return true
}


/*
* gameBoardToJSON( )
* This function returns an array of Square initialized items.
* return data - Array of square items.
*/
function gameBoardToJSON() {
  var data = []
  for (var x = 0; x < ROWS_NUMBER; x++) {
    for (var y = 0; y < COLUMNS_NUMBER; y++) {
      data.push({
        id: x + '' + y,
        x: x,
        y: y,
        clicked: false,
        content: WATER_SQ
      })
    }
  }
  return data
}
