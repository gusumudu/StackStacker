# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Board.create(name:" Example Board", description: "This is an example board for my trello clone project. I have focused on the drag an drop capabilities of trello for this project.")

(1..3).to_a.each do |num|
  Stack.create(name: "Stack " + num.to_s, position: num, board_id: 1)
end

(1..6).to_a.each do |num|
  stack_num = (num + 1) / 2
  Card.create(name: "Card " + num.to_s, description: "This is card " + num.to_s + " for stack " + stack_num.to_s,
    position: num % 2 + 1, stack_id: stack_num)
end
