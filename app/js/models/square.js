/*
* This model contains the information regarding each square represented in the
* Game Board. Initially it is filled with "non-clicked Water" information.
* During the game, it will be modified by user's clicks 'checkSquare' event.
*/
Battleships.Models.Square = Backbone.Model.extend({
  defaults: {
    id: '',
    x: 0,
    y: 0,
    clicked: false,
    content: WATER_SQ
  },

  initialize: function() {},

  checkSquare: function(x, y) {
    return hitSquare(x, y)
  },

  modifySquare: function(content) {
    this.set('content', content)
    this.set('clicked', true)
  }

})
