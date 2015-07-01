Battleships.Controller = Marionette.Controller.extend({
  initialize: function(options) {
    this._router = options.router
    this._mainRegion = options.mainRegion
    this._board = options.board

    if (this._board.isEmpty()) {
      this._createSampleData()
    }
  },

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
      // this is a FAIL. Means that the user already hit that square and should be alerted by a window.alert
      message = 'You already clicked this square. Please, check a different one.'
    }
    if(getAliveSq() === 0){
      var accuracy = Math.floor((getDestroyedSq() / getTotalShoots())  * 100)
      message = 'Congratulations! You won!\nYour scores are:\nTotal shoots: ' + getTotalShoots() + '\nTotal misses: ' + getMissedSq() + '\nAccuracy: ' + accuracy + '%\nPress the New Game button restart!'
    }

    if(message) window.alert(message)
  },

  newGame: function() {
    //INITIALIZE EVERYTHING
    if(getTotalShoots() > 0) {
      this._board.reset()
      this._createSampleData()
      initializeGame()
    }
  },
  // HERE WE SET ALL THE CONTENTS OF THE GRID 10X10
  _createSampleData: function() {
    var data = gameBoardToJSON()
    initializeGame()
    _.each(data, function(square) {
        this._board.create(square)
      }, this)
  }
})
