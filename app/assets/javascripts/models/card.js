Stackstacker.Models.Card = Backbone.RelationalModel.extend({
  urlRoot : '/cards',

  defaults: {
    name: 'New Card',
    description: 'This is a new card',
    position: null,
    stack_id: null
  },

  initialize: function() {
    // debugger;
    // this.get("stack").get("cards").add(this);
  }
});
