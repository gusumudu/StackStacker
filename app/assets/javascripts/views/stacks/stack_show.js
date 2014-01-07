Stackstacker.Views.StacksShow = Backbone.View.extend({

  template: JST['stacks/show'],

  tagName: "div",
  className: "stack",
  id: function() {
    return "stack-" + this.model.get('id');
  },

  events: {
    "update .card-list" : "enableSortable",
    "removeSortable .card-list" : "disableSortable",
    // listen for card to be dropped then update postion of cards in stacks
    // "drop" : "drop"
    "refreshCards" : "resetCardPositions",
    "boardSendCardToStack" : "createNewCard"
  },

  initialize: function() {

    this.card_model = Stackstacker.Models.Card;
    this.cards = this.model.get("cards");

    this.listenTo(this.model, 'update', this.render);
    // this.listenTo(this.cards, 'add', this.resetCardPositions);
    this.listenTo(this.cards, 'add', this.addOneCard);
    // this.model.bind('add:cards', this.addOneCard);
    this.listenTo(this.cards, 'remove', this.resetCardPositions);
    // this.listenTo(this.cards, "change:stack_id", this.resetCardPositions);
    // this.listenTo(this.card_model, 'create', this.addOneCard);
    // this.listenTo($(".stack"), "refreshCards", this.resetCardPositions);
    this.render();
  },

  render: function() {
    // console.log("rendering stack");
    // add template inside view element
    this.$el.html(this.template(this.model.toJSON()));

    this.setSortable();
    // var stack = this;
    // this.$el.find(".card-list").sortable();
    // create new card view for each card and add to stack unordered list
    // debugger;
    _.each(this.model.get("cards").models, function(card) {
      // var card_view = new Stackstacker.Views.CardsShow({ model: card });
      // // find stack unordered list
      // this.$el.find("#stack-" + this.model.get('id') + "-list").append( card_view.$el );
      this.addOneCard(card);
    }, this);
    return this;
  },

  setSortable: function() {
    var self = this;
    this.$el.find(".card-list").sortable({
      connectWith: ".card-list",
      cursor: "move",
      opacity: 0.7,
      update: function(event, ui ) {
        ui.item.trigger('drop', ui.item);
      }
    });
  },

  disableSortable: function() {
    // console.log("removing sortable");
    this.$el.find(".card-list").sortable('disable');
  },

  // re-add sortable after we are done editing text
  enableSortable: function() {
    // console.log("reenabling sort");
    this.$el.find(".card-list").sortable('enable');
  },

  resetCardPositions: function() {
    // console.log("stack name: " + this.model.get("name"));
    // my complex way of getting the cards collection
    console.log("resetting card positions");
    var stackCards;
    _.each(this.model.getRelations(), function(relation) {
      if (relation.key === "cards") {
        stackCards = relation.relatedCollection;
      }
    });
    // debugger;
    this.$el.find(".stackCard").each(function(index, card_el) {
      var card_id = parseInt($(card_el).attr("id").split("-")[1]);
      var card = stackCards.get(card_id);
      if (card && card.get("position") !== index ) {
        card.save({position: index });
      }
    });
  },

  addOneCard: function(card) {
    console.log("adding card: " + card.get("name"));
    var cardView = new Stackstacker.Views.CardsShow({ model: card });
    // start card in first stack
    this.$el.find("#stack-" + card.get("stack_id") + "-list").append(cardView.$el);
  },

  createNewCard: function() {
    // console.log("sent card to stack");
    // debugger;
    var stack = this;
    var new_card = new Stackstacker.Models.Card(stack.cardAttributes());
    new_card.save();
    $("#card-title").val('');
  },

  cardAttributes: function() {
    var first_stack = this.model.get("board").get("stacks").find(function(stack) { return stack.get("position") === 1});
    return {
      name: $("#card-title").val(),
      stack_id: first_stack.get("id"),
      position: first_stack.get("cards").length
    };
  }



  // // a card has been dropped
  // drop: function(event, item) {
  //   debugger;
  //   // 'this' is the stack view that the time
  //   console.log("dropped card from stack show");
  //   // this.model.board.updatePositions();
  // }
});
