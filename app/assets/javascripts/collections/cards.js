Stackstacker.Collections.Cards = Backbone.Collection.extend({

  model: Stackstacker.Models.Card,

  url: '/cards',

  comparator: 'position',

  updateStackAndPosition: function() {
    _.each(this.models, function(card) {
      card.updateStackAndPosition();
    })
  }

});

