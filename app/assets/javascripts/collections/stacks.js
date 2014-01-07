Stackstacker.Collections.Stacks = Backbone.Collection.extend({

  model: Stackstacker.Models.Stack,

  // sortByPosition: function() {
  //   var self = this;
  //   _.sortBy(self, )
  // }

  comparator: 'position',

  find_by_id: function(id) {
    return this.get(id);
  }

});
