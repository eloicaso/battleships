Battleships.Views.Board = Marionette.CompositeView.extend({
  template: '#tpl-board',
  className: 'js-board-div',
  itemView: Battleships.Views.Square,
  itemViewContainer: '.js-board-container',
  triggers: {
    'click .js-new-game': 'newGame:clicked'
  }
})
