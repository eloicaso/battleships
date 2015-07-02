/*
* Square Model. This model contains the information regarding each square represented in the
* Game Board. Initially it is filled with "non-clicked Water" information as its default value.
* During the game, it will be modified by user's clicks 'checkSquare' event and
* Modified and rerendered by the View using the modifySquare function.
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

  /*
  * checkSquare ( number x, number y )
  * This function calls the hitSquare(x,y) logic call and gets the result of
  * hitting the given Square.
  * Returns a number: 0 if the user repeated a Square, 1 if the user made a miss or hit
  * and 2 if the user made a hit and also sunk a ship.
  */
  checkSquare: function(x, y) {
    return hitSquare(x, y)
  },

  /*
  * modifySquare ( string content )
  * This function modifies the content an clicked values of the given Square
  * and this causes the View to handle the "onChange" event in order to render
  * the Square with its new values.
  */
  modifySquare: function(content) {
    this.set('content', content)
    this.set('clicked', true)
  }

})
