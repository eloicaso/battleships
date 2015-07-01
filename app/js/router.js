Battleships.Router = Marionette.AppRouter.extend({
  routes: {
    '': 'home'
  },

  home: function() {
    this.navigate('play', {
      trigger: true,
      replace: true
    })
  }
})
