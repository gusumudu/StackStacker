json.extract! @board, :name, :description, :created_at, :updated_at, :id
json.stacks @board.stacks do |stack|
  json.extract! stack, :name, :position, :board_id, :id
  json.cards stack.cards do |card|
    json.extract! card, :name, :description, :position, :stack_id, :id
  end
end
