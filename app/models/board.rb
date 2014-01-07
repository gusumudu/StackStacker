class Board < ActiveRecord::Base
  has_many :stacks
  has_many :cards, through: :stacks
end
