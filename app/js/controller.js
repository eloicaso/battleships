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
    if(square.checkSquare(square.get('x'), square.get('y'))) {
    } else {
      window.alert('You already clicked this square. Please, check a different one.')
    }
    if(getAliveSq() === 0) window.alert('Congratulations! You won! \nNow press the New Game button to start a new game!')
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
