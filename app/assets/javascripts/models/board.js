Stackstacker.Models.Board = Backbone.RelationalModel.extend({
  urlRoot : '/boards',

  relations: [{
    type: Backbone.HasMany,
    key: 'stacks',
    relatedModel: 'Stackstacker.Models.Stack',
    collectionType: 'Stackstacker.Collections.Stacks',
    reverseRelation: {
      key: 'board',
      includeInJSON: 'board_id'
    }
  }]

  // updateCardPositions: function() {
  //   this.get('stacks').models.each(function(stack) {
  //     stack.updateCardPositions();
  //   })
  // }
});
