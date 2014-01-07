Stackstacker.Views.BoardsShow = Backbone.View.extend({

  template: JST['boards/show'],

  el: "#board",

  events: {
    "click #new-card" : "sendCardToStack"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    // add board header template to board div
    this.$el.append( this.template(this.model.toJSON()) );
    // debugger;
    // add each stack to board div
    _.each(this.model.get('stacks').models, function(stack) {
      var stack_view = new Stackstacker.Views.StacksShow({ model: stack });
      this.$el.append( stack_view.$el );
    }, this);
    return this;
  },

  sendCardToStack: function() {
    // console.log("got click event on button");
    this.$el.find(".stack").first().trigger("boardSendCardToStack");
  }


});


