/*
* Board View. This CompositeView will contain all the necessary elements to
* represent a list of Square ItemViews. It will fullfil the js-board-container
* with squares with class 'js-board-div'
*/
Battleships.Views.Board = Marionette.CompositeView.extend({
  template: '#tpl-board',
  className: 'js-board-div',
  itemView: Battleships.Views.Square,
  itemViewContainer: '.js-board-container',
  triggers: {
    'click .js-new-game': 'newGame:clicked'
  }
})
