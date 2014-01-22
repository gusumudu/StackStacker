json.array!(@potential_match_sets) do |potential_match_set|
  json.extract! potential_match_set, :id
  json.url potential_match_set_url(potential_match_set, format: :json)
end
