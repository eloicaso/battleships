Battleships.Router = Marionette.AppRouter.extend({
  routes: {
    '': 'home'
  },

  /*
  * home ( )
  * This function will be in charge to change the region that is being
  * rerendered.
  */
  home: function() {
    this.navigate('play', {
      trigger: true,
      replace: true
    })
  }
})
