Battleships.Controller = Marionette.Controller.extend({

  /*
  * initialize ( object options )
  * This function will attach a router, controller and each necessary View into
  * our Application as well as to fullfil its content if necessary.
  */
  initialize: function(options) {
    this._router = options.router
    this._mainRegion = options.mainRegion
    this._board = options.board

    if (this._board.isEmpty()) {
      this._createSampleData()
    }
  },

  /*
  * showBoard( )
  * This function is the one in charge to create the boardView and fill it with
  * the list of SquareViews necessary to fullfil the 10x10 GRID. It also handles
  * the possible events available and routes the browser to our 'play' route.
  */
  showBoard: function() {
    var boardView = new Battleships.Views.Board({
      collection: this._board
    })

    this.listenTo(boardView, 'newGame:clicked', this.newGame)
    this.listenTo(boardView, 'itemview:checkPosition:clicked', function(squareView) {
      this.checkPosition(squareView.model.id)
    })

    Battleships.mainRegion.show(boardView)

    this._router.navigate('play')
  },

  /*
  * checkPosition( number id )
  * This function will check the shadowBoard and check if the user made a hit, miss
  * or if he/she repeated a square. Depending on that result, the controller will
  * give a proper feedback to the user: change the square/s background or bring him
  * a message.
  */
  checkPosition: function(id) {
    var square = this._board.get(id)
    var x = square.get('x')
    var y = square.get('y')
    var result = square.checkSquare(x, y)
    var message = ''
    if(result === 1) {
      //this is a hit/miss that should be automatically re-rendered by the onChange event. Nothing needs to be done.
      square.modifySquare(getContent(x, y))
    } else if (result === 2) {
      // this is a sunked ship that should be alerted by a window.alert. The onChange event will rerender it again.
      square.modifySquare(getContent(x, y))
      var shipType
      for (var i = 0; i < shipsPosition.length; i++) {
          if((shipsPosition[i].alivePos === 0) && (shipsPosition[i].isPrinted == false)) {
            shipType = shipsPosition[i].type
            // rerender all its squares
            for(var j = 0; j < shipsPosition[i].position.length; j++) {
              var r = shipsPosition[i].position[j].x
              var c = shipsPosition[i].position[j].y
              this._board.get(r + '' + c).modifySquare(getContent(r, c))
            }
            shipsPosition[i].isPrinted = true
          }
      }

      message = 'Congratulations!\nYou sunk enemy\'s '+ shipType + '!.'
    } else {
      /* this case means that it is a FAIL. Means that the user already hit
      *  that square and should be alerted by a window.alert
      */
      message = 'You already clicked this square. Please, check a different one.'
    }
    if(getAliveSq() === 0){
      message = 'Congratulations! You won!\nYour scores are:\nTotal shoots: '
      + getTotalShoots() + '\nTotal misses: ' + getMissedSq() + '\nAccuracy: '
      + getAccuracy() + '%\nPress the New Game button to restart!'
    }

    if(message) window.alert(message)
  },

  /*
  * newGame ( )
  * This function will reset board's information to initial state as well as
  * to call the _createSampleData function, which will reset all the boards and
  * values to the original state and fullfil the board with them.
  */
  newGame: function() {
    //INITIALIZE EVERYTHING
    if(getTotalShoots() > 0) {
      this._board.reset()
      this._createSampleData()
    }
  },

  /*
  * _createSampleData ( )
  * This function will set all board's squares to an initial state creating a
  * 10x10 grid of Squares and fetching the Board with them. It will also
  * initialize the boards and variables to their original state.
  */
  _createSampleData: function() {
    var data = gameBoardToJSON()
    initializeGame()
    _.each(data, function(square) {
        this._board.create(square)
      }, this)
  }
})
