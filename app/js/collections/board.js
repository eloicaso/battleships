/*
* Board Collection. This collection contents a list of Squares that will
* be represented in its CompositeView.
* This Collection only allocates the squares, so it does not need any trigger
* or function.
*/
Battleships.Collections.Board = Backbone.Collection.extend({
  model: Battleships.Models.Square,
  localStorage: new Backbone.LocalStorage('board'),
  initialize: function() {}
})
