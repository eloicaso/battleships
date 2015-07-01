Battleships.Views.Square = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'js-board-el',
  template: '#tpl-square',
  triggers: {
    'click .js-square': 'checkPosition:clicked'
  },
  modelEvents: {
    'change': 'render'
  },
  templateHelpers: {
    getBackground: function() {
      if (this.content === MISS_SQ) return 'js-miss-square'
      if (this.content === HIT_SQ) return 'js-hit-square'
      if (this.content === SUNK_SQ) return 'js-sunk-square'
    }
  }
})
