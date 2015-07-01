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
    if(hitSquare(x, y)){
      this.set('content', getContent(x, y))
      this.set('clicked', true)
      return true
    } else {
      return false
    }
  }

})
