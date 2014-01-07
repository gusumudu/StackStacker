class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.string :desctription
      t.integer :position
      t.integer :stack_id

      t.timestamps
    end
    add_index :cards, :stack_id
  end
end
