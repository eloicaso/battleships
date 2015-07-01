Battleships.Views.Board = Marionette.CompositeView.extend({
  template: '#tpl-board',
  className: 'board-div',
  itemView: Battleships.Views.Square,
  itemViewContainer: '.board-container',
  triggers: {
    'click .new-game': 'newGame:clicked'
  }
})
