Stackstacker.Views.CardsShow = Backbone.View.extend({

  template: JST['cards/show'],

  tagName: 'li',
  className: 'stackCard',
  id: function(id) {
    id
    return "card-" + this.model.get('id');
  },

  events: {
    // click text
    'dblclick .description': 'bring_to_focus',
    // click and hold
    // 'click .card' : 'card_movable',
    // enter/ sumit
    'keypress' : 'updateOnEnterKeyPress',
    // blur
    'blur .description' : 'leaveFocus',
    // drop card
    "drop" : "drop"


  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.removeCard);

    this.render();
  },

  render: function() {
    // console.log("rendering card");
    this.$el.html( this.template( this.model.toJSON() ) )
    return this;
  },

  removeCard: function() {
    this.$el.remove();
  },

  // show that the card has been brought to focus
  bring_to_focus: function() {
    // debugger;
    // remove sortable so we can access card if it is not already removed
    if (!this.$el.closest(".card-list").hasClass("ui-sortable-disabled")) {
      this.$el.closest(".card-list").trigger("removeSortable");
    }
    console.log("bringing to focus");
    this.$el.animate({boxShadow:"10px 10px 5px #888888"}, 'fast');
    // console.log(this.$el.find(".description").is(":focus"));
  },

  // remove focus from card
  leaveFocus: function() {
    console.log("leaving focus");
    this.$el.animate({boxShadow:"0px 0px 0px"});
    this.close();
  },

  // when a user presses enter then remove focus from card and submit new text
  updateOnEnterKeyPress: function(event) {
    // console.log("key pressed");
    if (event.which === 13 ) {
      this.$el.find(".description").blur();
      // console.log("enter pressed");
      this.$el.blur();
      event.preventDefault();
    }
  },

  // Close the `"editing"` mode, saving changes to the todo.
  close: function() {
    console.log("closing element");
    // find text inside span, update model to this new text
    var value = this.$el.find("span").text().trim();

    // reapply sortable for card-list
    if (this.$el.closest(".card-list").hasClass("ui-sortable-disabled")) {
      this.$el.closest(".card-list").trigger("update");
    }

    // if you clicked into the description but didnt change anything then don't submit to server
    if ( value && value !== this.model.get('description') ) {
      this.model.save({ description: value });
    } else if (value === "") {
      // if you have removed all text, then delete the model
      this.clearCard();
    }
    //need to remove click from description



  },
  // Remove the item, destroy the model from *localStorage* and delete its view.
  clearCard: function() {
    this.model.destroy();
    // this.trigger(this.removeCard);
  },

  drop: function(event, item) {
    // debugger;
    var dom_stack_el = this.$el.closest(".stack");
    var model_stack_id = this.model.get("stack_id");
    var dom_stack_id_name = dom_stack_el.attr("id");
    var dom_stack_id_number = parseInt(dom_stack_id_name.split("-")[1]);

    // this.model.set({stack_id: dom_stack_id_number});
    // this.model.save();
    // if we have moved the card to a new stack
    if (dom_stack_id_number !== model_stack_id) {
      // have stack model change, sending card model and new stack id
      this.model.get("stack").changeCardStack(this.model, dom_stack_id_number);
      // $("#stack-" + model_stack_id).trigger("refreshCards");
    } else {
      // refresh cards in current stack
      dom_stack_el.trigger("refreshCards");
    }
    // console.log("dropped card from card show");
  }

});
