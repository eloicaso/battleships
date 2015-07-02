/*
* Square View. This ItemView will contain the data for each Square in the Board
* View. It also will handle with the onClick events made by the user, and also
* fullfil the squares with the correct background in order to give visual feedback
*/
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
