Stackstacker.Models.Stack = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'cards',
    relatedModel: 'Stackstacker.Models.Card',
    collectionType: 'Stackstacker.Collections.Cards',
    // parse: true,
    reverseRelation: {
      key: 'stack',
      includeInJSON: 'id'
    }
  }],

  // this.card_model: this.get("cards").model,

  initialize : function() {
    // debugger;
    // this.listenTo(this.get("cards"), "change:stack_id", this.changeCardStack);
  },
  addOneCard: function() {
    debugger;
  },


  changeCardStack: function(card, new_stack_id) {
    // debugger;
    // card.change(stack_id: this.id);
    card.save({stack_id: this.get("id")});
    this.get("cards").remove(card);
    this.collection.get(new_stack_id).get("cards").add(card, { silent: true });
    this.trigger('refreshCards');
    // card
  }
});
