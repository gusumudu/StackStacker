json.array!(@stacks) do |stack|
  json.extract! stack, :name, :postion, :board_id
  json.url stack_url(stack, format: :json)
end
