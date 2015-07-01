Battleships.Collections.Board = Backbone.Collection.extend({
  model: Battleships.Models.Square,
  localStorage: new Backbone.LocalStorage('board'),
  initialize: function() {},
  triggers: {
    'click .new-game': 'newGame:clicked'
  }
})
