class StackPositionNameCHange < ActiveRecord::Migration
  def change
    rename_column(:stacks, :postion, :position)
  end
end
