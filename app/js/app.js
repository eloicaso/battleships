/*
* Battleships MarionetteApp. Battleships will contain and work as the Marionette
* Backbone application and will be in charge of responding user petitions and
* gather the rest of the components.
*/
var Battleships = new Marionette.Application({
  Models: {},
  Collections: {},
  Views: {}
})

Battleships.addRegions({
  mainRegion: '.js-main-container'
})

Battleships.addInitializer(function(data) {
  var board = new Battleships.Collections.Board(),
      router = new Battleships.Router(),
      controller = new Battleships.Controller({
        board: board,
        router: router,
        mainRegion: this.mainRegion
      })

  router.processAppRoutes(controller, {
    'play': 'showBoard'
  })
})

Battleships.on('initialize:after', function(options){
  if (Backbone.history){
    Backbone.history.start()
  }
})
