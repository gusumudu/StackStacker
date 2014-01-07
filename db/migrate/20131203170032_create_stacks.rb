class CreateStacks < ActiveRecord::Migration
  def change
    create_table :stacks do |t|
      t.string :name
      t.integer :postion
      t.integer :board_id

      t.timestamps
    end
    add_index :stacks, :board_id
  end
end
