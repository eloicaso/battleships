Battleships.Views.Square = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'board-el',
  template: '#tpl-square',
  triggers: {
    'click .square': 'checkPosition:clicked'
  },
  modelEvents: {
    'change': 'fieldsChanged'
  },
  fieldsChanged: function() {
    this.render()
  },

  templateHelpers: {
    getBackground: function() {
      if(this.content === MISS_SQ) return 'color-blue'
      if(this.content === HIT_SQ) return 'color-red'
    }
  }
})
